import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import {
  FontWeight,
  fontWeights,
  getAvailableFontsFromAPI,
  getFontUrl,
} from "@/lib/fonts"
import { Skeleton } from "@/components/template-skeletons/skeleton"

interface TextSettingsProps {
  fontFamily: string
  onChangeFontFamily: (fontFamily: string) => void
  fontWeight: FontWeight
  onChangeFontWeight: (fontWeight: FontWeight) => void
  fontSize: number
  onChangeFontSize: (fontSize: number) => void
  color: string
  onChangeColor: (color: string) => void
  className?: string
}

interface FontInfo {
  value: string
  label: string
  weights: number[]
  subset: string
}

// tailwind gray color palette
const textColors = [
  "#030712",
  "#1f2937",
  "#374151",
  "#4b5563",
  "#9ca3af",
  "#d1d5db",
  "#f3f4f6",
  "#f9fafb",
]

export function TextSettings({
  fontFamily,
  onChangeFontFamily,
  fontWeight,
  onChangeFontWeight,
  fontSize,
  onChangeFontSize,
  color,
  onChangeColor,
  className,
}: TextSettingsProps) {
  const [subset, setSubset] = useState<string>("latin")
  const [fonts, setFonts] = useState<FontInfo[]>([])
  const [loadingFonts, setLoadingFonts] = useState(false)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    setLoadingFonts(true)
    getAvailableFontsFromAPI(subset, 100)
      .then((f) => {
        if (!isMounted) return
        setFonts(f)
        setLoadingFonts(false)
        const foundFont = f.find(font => font.value === fontFamily)
        if (!foundFont) {
          if (f.length > 0) {
            onChangeFontFamily(f[0].value)
          }
        } else {
          if (!foundFont.weights.includes(fontWeight)) {
            if (foundFont.weights.length > 0) {
              onChangeFontWeight(foundFont.weights[0] as FontWeight)
            }
          }
        }
      })
      .catch(() => {
        if (!isMounted) return
        setLoadingFonts(false)
      })
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [subset])

  useEffect(() => {
    if (!fontFamily || !fontWeight) return
    let cancelled = false
    getFontUrl({ family: fontFamily, weight: fontWeight }).then((fontUrl) => {
      if (!fontUrl || cancelled) return
      const fontName = fontFamily.replace(/-/g, ' ')
      // Utilisation de FontFace API pour éviter les doublons et avoir un meilleur contrôle
      if (document.fonts) {
        const fontFace = new FontFace(fontName, `url('${fontUrl}')`, {
          weight: fontWeight.toString(),
          display: 'swap',
        })
        // Vérifie si la font est déjà chargée
        const alreadyLoaded = Array.from(document.fonts).some(
          (f) => f.family === fontName && f.weight === fontWeight.toString()
        )
        if (!alreadyLoaded) {
          fontFace.load().then((loadedFace) => {
            document.fonts.add(loadedFace)
          })
        }
      } else {
        // Fallback pour navigateurs sans FontFace API
        const styleId = `dynamic-font-${fontFamily}-${fontWeight}`
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style')
          style.id = styleId
          style.innerHTML = `@font-face { font-family: '${fontName}'; src: url('${fontUrl}') format('woff2'); font-weight: ${fontWeight}; font-display: swap; }`
          document.head.appendChild(style)
        }
      }
    })
    return () => { cancelled = true }
  }, [fontFamily, fontWeight, subset])

  useEffect(() => {
    const foundFont = fonts.find(font => font.value === fontFamily)
    if (foundFont && !foundFont.weights.includes(fontWeight)) {
      if (foundFont.weights.length > 0) {
        onChangeFontWeight(foundFont.weights[0] as FontWeight)
      }
    }
  }, [fontFamily, fonts])

  const weights: number[] = Array.isArray(fonts.find((f) => f.value === fontFamily)?.weights)
    ? Array.from(new Set(fonts.find((f) => f.value === fontFamily)?.weights as number[]))
    : [];

  function SettingRow({ label, htmlFor, children }: { label: string, htmlFor: string, children: React.ReactNode }) {
    return (
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor={htmlFor}>{label}</Label>
        <div className="col-span-2">{children}</div>
      </div>
    )
  }

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <SettingRow label="Subset" htmlFor="subset">
          <Select value={subset} onValueChange={setSubset}>
            <SelectTrigger id="subset" className="h-8">
              <SelectValue placeholder="Subset" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="latin">Latin</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </SettingRow>
        <SettingRow label="Font family" htmlFor="font-family">
          {loadingFonts ? (
            <div className="h-8 flex items-center"><Skeleton className="w-full h-8" /></div>
          ) : (
            <Select
              value={fontFamily}
              onValueChange={onChangeFontFamily}
              disabled={loadingFonts}
            >
              <SelectTrigger id="font-family" className="h-8">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {fonts.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </SettingRow>
        <SettingRow label="Font weight" htmlFor="font-weight">
          {loadingFonts ? (
            <div className="h-8 flex items-center"><Skeleton className="w-full h-8" /></div>
          ) : (
            <Select
              value={fontWeight.toString()}
              onValueChange={(v) =>
                onChangeFontWeight(parseInt(v as string) as FontWeight)
              }
              disabled={loadingFonts || weights.length === 0}
            >
              <SelectTrigger id="font-weight" className="h-8">
                <SelectValue placeholder="Select a weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {weights.length > 0 &&
                    weights.map((weight: number) => (
                      <SelectItem key={weight} value={weight.toString()}>
                        {fontWeights[weight as keyof typeof fontWeights] ?? weight}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </SettingRow>
        <SettingRow label="Font size" htmlFor="font-size">
          <Input
            id="font-size"
            type="number"
            className="h-8"
            value={fontSize.toString()}
            min={8}
            max={200}
            onChange={(e) => {
              const val = parseInt(e.currentTarget.value)
              if (!isNaN(val) && val >= 8 && val <= 200) {
                onChangeFontSize(val)
              }
            }}
          />
        </SettingRow>
        <SettingRow label="Text Color" htmlFor="text-color">
          <RadioGroup
            id="text-color"
            className=""
            value={color}
            onValueChange={onChangeColor}
          >
            <div className="flex flex-wrap gap-1">
              {textColors.map((color) => (
                <div key={color} className="size-9 min-h-9 min-w-9">
                  <RadioGroupItem
                    value={color}
                    id={color}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={color}
                    className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    style={{
                      background: color,
                    }}
                  ></Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </SettingRow>
      </div>
    </div >
  )
}
