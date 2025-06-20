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
  const [fonts, setFonts] = useState<any[]>([])
  const [loadingFonts, setLoadingFonts] = useState(false)

  useEffect(() => {
    setLoadingFonts(true)
    getAvailableFontsFromAPI(subset, 100).then((f) => {
      setFonts(f)
      setLoadingFonts(false)
    })
  }, [subset])

  // Charge dynamiquement la font sélectionnée côté client
  useEffect(() => {
    if (!fontFamily || !fontWeight) return
    getFontUrl({ family: fontFamily, weight: fontWeight }).then((fontUrl) => {
      if (!fontUrl) return
      const fontName = fontFamily.replace(/-/g, ' ')
      const styleId = `dynamic-font-${fontFamily}-${fontWeight}`
      // Supprime l'ancien style si déjà injecté
      const oldStyle = document.getElementById(styleId)
      if (oldStyle) oldStyle.remove()
      // Crée la règle @font-face
      const style = document.createElement('style')
      style.id = styleId
      style.innerHTML = `@font-face { font-family: '${fontName}'; src: url('${fontUrl}') format('woff2'); font-weight: ${fontWeight}; font-display: swap; }`
      document.head.appendChild(style)
    })
  }, [fontFamily, fontWeight, subset])

  const weights: number[] = Array.isArray(fonts.find((f) => f.value === fontFamily)?.weights)
    ? Array.from(new Set(fonts.find((f) => f.value === fontFamily)?.weights as number[]))
    : [];

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="subset">Subset</Label>
          <Select value={subset} onValueChange={setSubset}>
            <SelectTrigger id="subset" className="col-span-2 h-8">
              <SelectValue placeholder="Subset" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="latin">Latin</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="font-family">Font family</Label>
          <Select
            value={fontFamily}
            onValueChange={onChangeFontFamily}
            disabled={loadingFonts}
          >
            <SelectTrigger id="font-family" className="col-span-2 h-8">
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
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="font-weight">Font weight</Label>
          <Select
            value={fontWeight.toString()}
            onValueChange={(v) =>
              onChangeFontWeight(parseInt(v as string) as FontWeight)
            }
            disabled={loadingFonts || weights.length === 0}
          >
            <SelectTrigger id="font-weight" className="col-span-2 h-8">
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
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="font-size">Font size</Label>
          <Input
            id="font-size"
            type="number"
            className="col-span-2 h-8"
            value={fontSize.toString()}
            onChange={(e) => onChangeFontSize(parseInt(e.currentTarget.value))}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="text-color">Text Color</Label>
          <RadioGroup
            id="text-color"
            className="col-span-2"
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
        </div>
      </div>
    </div >
  )
}
