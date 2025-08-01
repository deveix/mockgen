"use client"

import { useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import {
  ArrowBottomLeftIcon,
  ArrowBottomRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopLeftIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
  BorderAllIcon,
  DotsHorizontalIcon,
  GridIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons"

import { patterns } from "@/lib/patterns"
import {
  BackgroundParams,
  GradientDirection,
  GridOverlayParams,
  toBackgroundShorthand,
} from "@/lib/templates/elements/background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ResponsivePopover } from "./responsive-popover"

const solidColors = [
  "#D14D72",
  "#FF8080",
  "#FF9B9B",
  "#FFABAB",
  "#E8A0BF",
  "#FEBBCC",
  "#FCC8D1",
  "#FFC5C5",
  "#D3756B",
  "#F0997D",
  "#FEBE8C",
  "#FFC3A1",
  "#FFD966",
  "#F2D388",
  "#FCE38A",
  "#FFF6BD",
  "#67729D",
  "#7C93C3",
  "#8EA7E9",
  "#95BDFF",
  "#A084DC",
  "#B2A4FF",
  "#DBC4F0",
  "#E5D1FA",
  "#61876E",
  "#609966",
  "#A6BB8D",
  "#ABC4AA",
  "#967E76",
  "#D7C0AE",
  "#EEE3CB",
  "#FFF3E2",
  "#525E75",
  "#545B77",
  "#7B8FA1",
  "#9E9FA5",
  "#000000",
  "#FFFFFF",
]

const linearGradients = [
  { colorStops: ["rgb(236, 72, 153)", "rgb(239, 68, 68)", "rgb(234, 179, 8)"] },
  { colorStops: ["rgb(202, 138, 4)", "rgb(220, 38, 38)"] },
  {
    colorStops: ["rgb(244, 63, 94)", "rgb(248, 113, 113)", "rgb(239, 68, 68)"],
  },
  { colorStops: ["rgb(253, 164, 175)", "rgb(244, 63, 94)"] },
  { colorStops: ["rgb(251, 146, 60)", "rgb(251, 113, 133)"] },
  { colorStops: ["rgb(251, 113, 133)", "rgb(253, 186, 116)"] },
  {
    colorStops: [
      "rgb(254, 202, 202)",
      "rgb(252, 165, 165)",
      "rgb(254, 240, 138)",
    ],
  },
  {
    colorStops: [
      "rgb(199, 210, 254)",
      "rgb(254, 202, 202)",
      "rgb(254, 249, 195)",
    ],
  },
  {
    colorStops: [
      "rgb(134, 239, 172)",
      "rgb(59, 130, 246)",
      "rgb(147, 51, 234)",
    ],
  },
  { colorStops: ["rgb(134, 239, 172)", "rgb(192, 132, 252)"] },
  { colorStops: ["rgb(192, 132, 252)", "rgb(250, 204, 21)"] },
  { colorStops: ["rgb(165, 180, 252)", "rgb(192, 132, 252)"] },
  {
    colorStops: [
      "rgb(249, 168, 212)",
      "rgb(216, 180, 254)",
      "rgb(129, 140, 248)",
    ],
  },
  {
    colorStops: [
      "rgb(233, 213, 255)",
      "rgb(192, 132, 252)",
      "rgb(107, 33, 168)",
    ],
  },
  {
    colorStops: [
      "rgb(219, 234, 254)",
      "rgb(147, 197, 253)",
      "rgb(59, 130, 246)",
    ],
  },
  { colorStops: ["rgb(165, 243, 252)", "rgb(34, 211, 238)"] },
  { colorStops: ["rgb(34, 197, 94)", "rgb(21, 128, 61)"] },
  { colorStops: ["rgb(16, 185, 129)", "rgb(101, 163, 13)"] },
  { colorStops: ["rgb(96, 165, 250)", "rgb(52, 211, 153)"] },
  {
    colorStops: ["rgb(187, 247, 208)", "rgb(74, 222, 128)", "rgb(34, 197, 94)"],
  },
  { colorStops: ["rgb(187, 247, 208)", "rgb(34, 197, 94)"] },
  {
    colorStops: [
      "rgb(187, 247, 208)",
      "rgb(134, 239, 172)",
      "rgb(59, 130, 246)",
    ],
  },
  { colorStops: ["rgb(153, 246, 228)", "rgb(217, 249, 157)"] },
  {
    colorStops: [
      "rgb(254, 240, 138)",
      "rgb(187, 247, 208)",
      "rgb(134, 239, 172)",
    ],
  },
  { colorStops: ["#434343 0%", "black 100%"] },
  { colorStops: ["rgb(17, 24, 39)", "rgb(75, 85, 99)"] },
  { colorStops: ["#868f96 0%", "#596164 100%"] },
  { colorStops: ["#d7d2cc 0%", "#304352 100%"] },
  { colorStops: ["#8baaaa 0%", "#ae8b9c 100%"] },
  {
    colorStops: ["rgb(229, 231, 235)", "rgb(156, 163, 175)", "rgb(75, 85, 99)"],
  },
  { colorStops: ["#f5f7fa 0%", "#c3cfe2 100%"] },
  {
    colorStops: [
      "#d5d4d0 0%",
      "#d5d4d0 1%",
      "#eeeeec 31%",
      "#efeeec 75%",
      "#e9e9e7 100%",
    ],
  },
]

const DEFAULT_LINEAR_GRADIENT_DIRECTION: GradientDirection = "to top right"
const gridOverlayColors = ["#030712", "#6b7280", "#f9fafb"]
const gridOverlayDefault: Omit<GridOverlayParams, "pattern"> = {
  color: gridOverlayColors[0],
  opacity: 0.5,
  blurRadius: 20,
}

export function GlobalBackgroundForm() {
  const { screenshots, updateAllBackgrounds } = useMultiTemplateStore(
    (state) => state
  )

  // Get the background from the first screenshot as the current value, or use default
  const currentBackground: BackgroundParams =
    screenshots.length > 0
      ? (screenshots[0].template.background as BackgroundParams)
      : {
          type: "color",
          color: "#f3f4f6",
          noise: 0.1,
        }

  const [background, setBackground] =
    useState<BackgroundParams>(currentBackground)

  const updateBackground = (newBackground: BackgroundParams) => {
    setBackground(newBackground)
    updateAllBackgrounds(newBackground)
  }

  if (screenshots.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Background</CardTitle>
        <CardDescription>
          Set a background for all screenshot templates at once.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Tabs defaultValue="linear-gradient" className="w-full">
            <TabsList>
              <TabsTrigger value="linear-gradient">Gradient</TabsTrigger>
              <TabsTrigger value="color">Solid Color</TabsTrigger>
            </TabsList>

            <TabsContent value="linear-gradient" className="space-y-4">
              <Card className="p-2">
                <RadioGroup
                  value={
                    background.type === "linear-gradient"
                      ? JSON.stringify(background.colorStops)
                      : undefined
                  }
                  onValueChange={(v) => {
                    updateBackground({
                      type: "linear-gradient",
                      colorStops: JSON.parse(v),
                      direction:
                        background.type === "linear-gradient"
                          ? background.direction
                          : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                      noise: background.noise || 0.15,
                      gridOverlay: background.gridOverlay,
                    })
                  }}
                >
                  <div className="flex flex-wrap gap-1">
                    {linearGradients.map(({ colorStops }) => (
                      <div
                        key={JSON.stringify(colorStops)}
                        className="size-9 min-h-9 min-w-9"
                      >
                        <RadioGroupItem
                          value={JSON.stringify(colorStops)}
                          id={JSON.stringify(colorStops)}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={JSON.stringify(colorStops)}
                          className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{
                            background: toBackgroundShorthand({
                              type: "linear-gradient",
                              direction:
                                background.type === "linear-gradient"
                                  ? background.direction
                                  : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                              colorStops,
                            }),
                          }}
                        ></Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>

              <div className="space-y-2">
                <div className="text-sm font-medium">Custom Gradient</div>
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">
                      Create a custom gradient with two colors
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <Label
                          htmlFor="global-gradient-color-1"
                          className="text-xs"
                        >
                          Color 1
                        </Label>
                        <input
                          id="global-gradient-color-1"
                          type="color"
                          defaultValue="#000000"
                          className="size-8 cursor-pointer rounded border-2 border-muted hover:border-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <div
                          className="h-8 rounded border-2 border-muted"
                          style={{
                            background: `linear-gradient(${
                              background.type === "linear-gradient"
                                ? background.direction
                                : DEFAULT_LINEAR_GRADIENT_DIRECTION
                            }, var(--global-gradient-color-1, #000000), var(--global-gradient-color-2, #ffffff))`,
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Label
                          htmlFor="global-gradient-color-2"
                          className="text-xs"
                        >
                          Color 2
                        </Label>
                        <input
                          id="global-gradient-color-2"
                          type="color"
                          defaultValue="#ffffff"
                          className="size-8 cursor-pointer rounded border-2 border-muted hover:border-primary"
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const color1 =
                          (
                            document.getElementById(
                              "global-gradient-color-1"
                            ) as HTMLInputElement
                          )?.value || "#000000"
                        const color2 =
                          (
                            document.getElementById(
                              "global-gradient-color-2"
                            ) as HTMLInputElement
                          )?.value || "#ffffff"
                        updateBackground({
                          type: "linear-gradient",
                          colorStops: [color1, color2],
                          direction:
                            background.type === "linear-gradient"
                              ? background.direction
                              : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                          noise: background.noise || 0.15,
                          gridOverlay: background.gridOverlay,
                        })
                      }}
                    >
                      Apply Custom Gradient
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Gradient Direction</div>
                <Card className="p-2">
                  <RadioGroup
                    defaultValue="to top right"
                    value={
                      background.type === "linear-gradient"
                        ? background.direction
                        : "to top right"
                    }
                    onValueChange={(v) => {
                      if (background.type === "linear-gradient") {
                        updateBackground({
                          ...background,
                          direction: v as GradientDirection,
                        })
                      }
                    }}
                  >
                    <div className="grid grid-cols-8 gap-2">
                      <div>
                        <RadioGroupItem
                          value="to top"
                          id="global-to-top"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-top"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowUpIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to top right"
                          id="global-to-top-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-top-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowTopRightIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to right"
                          id="global-to-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowRightIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom right"
                          id="global-to-bottom-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-bottom-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowBottomRightIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom"
                          id="global-to-bottom"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-bottom"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowDownIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom left"
                          id="global-to-bottom-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-bottom-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowBottomLeftIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to left"
                          id="global-to-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowLeftIcon className="size-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to top left"
                          id="global-to-top-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-to-top-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowTopLeftIcon className="size-4" />
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="color">
              <Card className="p-2">
                <RadioGroup
                  value={
                    background.type === "color" ? background.color : undefined
                  }
                  onValueChange={(v) => {
                    updateBackground({
                      type: "color",
                      color: v,
                      noise: background.noise || 0.1,
                    })
                  }}
                >
                  <div className="flex flex-wrap gap-1">
                    {solidColors.map((color) => (
                      <div key={color} className="size-9 min-h-9 min-w-9">
                        <RadioGroupItem
                          value={color}
                          id={`global-${color}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`global-${color}`}
                          className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{
                            background: color,
                          }}
                        ></Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>

              <div className="space-y-2">
                <div className="text-sm font-medium">Custom Color</div>
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">
                      Choose any custom color
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <Label
                          htmlFor="global-custom-color"
                          className="text-xs"
                        >
                          Color
                        </Label>
                        <input
                          id="global-custom-color"
                          type="color"
                          defaultValue="#000000"
                          className="size-8 cursor-pointer rounded border-2 border-muted hover:border-primary"
                          onInput={(e) => {
                            const preview = document.getElementById(
                              "custom-color-preview"
                            )
                            if (preview) {
                              preview.style.backgroundColor = (
                                e.target as HTMLInputElement
                              ).value
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div
                          id="custom-color-preview"
                          className="h-8 rounded border-2 border-muted bg-black"
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const color =
                          (
                            document.getElementById(
                              "global-custom-color"
                            ) as HTMLInputElement
                          )?.value || "#000000"
                        updateBackground({
                          type: "color",
                          color: color,
                          noise: background.noise || 0.1,
                        })
                      }}
                    >
                      Apply Custom Color
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid gap-2 pt-2">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Grid Overlay</div>
              <Badge>New</Badge>
            </div>
            <ResponsivePopover
              title="Grid Overlay"
              description="Apply a grid overlay to the background."
              trigger={
                <Button variant="outline" className="justify-start">
                  {(background.gridOverlay?.pattern &&
                    patterns[background.gridOverlay?.pattern].label) ||
                    "Select a pattern"}
                </Button>
              }
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Pattern</Label>
                  <RadioGroup
                    defaultValue="none"
                    value={
                      background.gridOverlay
                        ? background.gridOverlay.pattern
                        : "none"
                    }
                    onValueChange={(v) => {
                      if (v === "none") {
                        updateBackground({
                          ...background,
                          gridOverlay: undefined,
                        })
                      } else {
                        updateBackground({
                          ...background,
                          gridOverlay: {
                            pattern: v as GridOverlayParams["pattern"],
                            color:
                              background.gridOverlay?.color ||
                              gridOverlayDefault.color,
                            opacity:
                              background.gridOverlay?.opacity ||
                              gridOverlayDefault.opacity,
                            blurRadius:
                              background.gridOverlay?.blurRadius ||
                              gridOverlayDefault.blurRadius,
                          },
                        })
                      }
                    }}
                  >
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <RadioGroupItem
                          value="none"
                          id="global-none"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-none"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ValueNoneIcon className="size-5" />
                          <span className="mt-1 text-xs">None</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="grid"
                          id="global-grid"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-grid"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <GridIcon className="size-5" />
                          <span className="mt-1 text-xs">Grid</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="graph-paper"
                          id="global-graph-paper"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-graph-paper"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <BorderAllIcon className="size-5" />
                          <span className="mt-1 text-xs">Graph</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="dots"
                          id="global-dots"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="global-dots"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <DotsHorizontalIcon className="size-5" />
                          <span className="mt-1 text-xs">Dots</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text-color">Color</Label>
                  <RadioGroup
                    id="text-color"
                    disabled={!background.gridOverlay}
                    value={
                      background.gridOverlay
                        ? background.gridOverlay.color
                        : undefined
                    }
                    onValueChange={(v) => {
                      updateBackground({
                        ...background,
                        gridOverlay: {
                          ...background.gridOverlay,
                          color: v,
                        } as GridOverlayParams,
                      })
                    }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {gridOverlayColors.map((color) => (
                        <div key={color} className="size-9 min-h-9 min-w-9">
                          <RadioGroupItem
                            value={color}
                            id={`global-overlay-${color}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`global-overlay-${color}`}
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="opacity">Opacity</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {background.gridOverlay?.opacity || 0}
                    </span>
                  </div>
                  <Slider
                    id="opacity"
                    max={1}
                    defaultValue={[background.noise || 0]}
                    step={0.05}
                    disabled={!background.gridOverlay}
                    value={
                      background.gridOverlay
                        ? [background.gridOverlay.opacity]
                        : [0]
                    }
                    onValueChange={(v) => {
                      updateBackground({
                        ...background,
                        gridOverlay: {
                          ...background.gridOverlay,
                          opacity: v[0],
                        } as GridOverlayParams,
                      })
                    }}
                    className="[&_[role=slider]]:size-4"
                    aria-label="Opacity"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="blur-radius">Blur Radius</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {background.gridOverlay?.blurRadius || 0}%
                    </span>
                  </div>
                  <Slider
                    id="blur-radius"
                    max={100}
                    defaultValue={[background.noise || 0]}
                    step={5}
                    disabled={!background.gridOverlay}
                    value={
                      background.gridOverlay
                        ? [background.gridOverlay.blurRadius]
                        : [0]
                    }
                    onValueChange={(v) => {
                      updateBackground({
                        ...background,
                        gridOverlay: {
                          ...background.gridOverlay,
                          blurRadius: v[0],
                        } as GridOverlayParams,
                      })
                    }}
                    className="[&_[role=slider]]:size-4"
                    aria-label="Blur"
                  />
                </div>
              </div>
            </ResponsivePopover>
          </div>

          <div className="grid gap-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="noise">Noise</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {background.noise || 0}
                    </span>
                  </div>
                  <Slider
                    id="noise"
                    max={1}
                    defaultValue={[background.noise || 0]}
                    step={0.05}
                    value={[background.noise || 0]}
                    onValueChange={(v) =>
                      updateBackground({
                        ...background,
                        noise: v[0],
                      })
                    }
                    className="[&_[role=slider]]:size-4"
                    aria-label="Noise"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                className="w-[260px] text-sm"
                side="top"
              >
                Control the level background noise to add texture. A value
                between 0.1 to 0.25 is recommended.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
