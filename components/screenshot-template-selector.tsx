"use client"

import { useMemo } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"

import { TemplateName } from "@/lib/templates"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { skeletons } from "@/components/template-skeletons"

const templates = [
  {
    platform: "open-graph",
    name: "og:app-screenshot",
    width: 1200,
    height: 630,
    skeleton: skeletons["og:app-screenshot"],
  },
  {
    platform: "x",
    name: "x:header-minimalist",
    width: 1500,
    height: 500,
    skeleton: skeletons["x:header-minimalist"],
  },
  {
    platform: "x",
    name: "x:header-basic",
    width: 1500,
    height: 500,
    skeleton: skeletons["x:header-basic"],
  },
  {
    platform: "x",
    name: "x:header-logo",
    width: 1500,
    height: 500,
    skeleton: skeletons["x:header-logo"],
  },
  {
    platform: "apple",
    name: "apple:app-screenshot",
    width: 1320,
    height: 2868,
    skeleton: skeletons["apple:app-screenshot"],
  },
  {
    platform: "apple",
    name: "apple:tilted-left",
    width: 1320,
    height: 2868,
    skeleton: skeletons["apple:tilted-left"],
  },
  {
    platform: "apple",
    name: "apple:tilted-right",
    width: 1320,
    height: 2868,
    skeleton: skeletons["apple:tilted-right"],
  },
  {
    platform: "apple",
    name: "apple:hanged-up",
    width: 1320,
    height: 2868,
    skeleton: skeletons["apple:hanged-up"],
  },
  {
    platform: "apple",
    name: "apple:rotated",
    width: 1320,
    height: 2868,
    skeleton: skeletons["apple:rotated"],
  },
  // Android
  {
    platform: "android",
    name: "android:app-screenshot",
    width: 1320,
    height: 2868,
    skeleton: skeletons["android:app-screenshot"],
  },
  {
    platform: "android",
    name: "android:hanged-up",
    width: 1320,
    height: 2868,
    skeleton: skeletons["android:hanged-up"],
  },
]

interface ScreenshotTemplateSelectorProps {
  screenshotId: number
  platform: "apple" | "android"
}

export default function ScreenshotTemplateSelector({
  screenshotId,
  platform,
}: ScreenshotTemplateSelectorProps) {
  const { screenshots, updateTemplate } = useMultiTemplateStore(
    (state) => state
  )
  const screenshot = useMemo(
    () => screenshots.find((s) => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  if (!screenshot) return null

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">
          Choose template for Screenshot {screenshotId}
        </h3>
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full overflow-hidden"
      >
        <RadioGroup
          value={screenshot.template.name}
          onValueChange={(v) => updateTemplate(screenshotId, v as TemplateName)}
        >
          <CarouselContent className="-ml-2 pl-2 pr-4">
            {templates
              .filter((t) => t.platform === platform)
              .map((t) => (
                <CarouselItem
                  key={t.name}
                  className="shrink-0 basis-24 pl-2"
                >
                  <RadioGroupItem
                    value={t.name}
                    id={`${screenshotId}-${t.name}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`${screenshotId}-${t.name}`}
                    className="flex aspect-video h-16 w-20 items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <t.skeleton />
                  </Label>
                </CarouselItem>
              ))}
          </CarouselContent>
        </RadioGroup>

        <CarouselPrevious className="left-2" variant="secondary" />
        <CarouselNext className="right-2" variant="secondary" />
      </Carousel>
    </div>
  )
}
