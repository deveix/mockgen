"use client"

import { useMemo, useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"

import { TemplateName } from "@/lib/templates"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { skeletons } from "@/components/template-skeletons"

import {
  AppleLogo,
  BlogLogo,
  FacebookLogo,
  LinkedInLogo,
  OpenGraphLogo,
  ProductHunt,
  TwitterLogo,
} from "./icons"

type Platform =
  | "open-graph"
  | "apple"
  | "blog"
  | "facebook"
  | "x"
  | "linkedin"
  | "product-hunt"

interface PlatformProps {
  label: string
  icon: (props: React.ComponentProps<"svg">) => React.JSX.Element
}

interface TemplateFilter {
  platform: Platform
  label: string
  width: number
  height: number
}

const templateFilters: TemplateFilter[] = [
  {
    platform: "apple",
    label: "App Screenshot",
    width: 1320,
    height: 2868,
  },
  //   {
  //     platform: "open-graph",
  //     label: "Open Graph Protocol",
  //     width: 1200,
  //     height: 630,
  //   },
  //   {
  //     platform: "x",
  //     label: "Twitter/X Header",
  //     width: 1500,
  //     height: 500,
  //   },
]

const platforms: Partial<Record<Platform, PlatformProps>> = {
  apple: {
    label: "Apple",
    icon: AppleLogo,
  },
  //   "open-graph": {
  //     label: "Open Graph",
  //     icon: OpenGraphLogo,
  //   },
  //   blog: {
  //     label: "Blog",
  //     icon: BlogLogo,
  //   },
  //   facebook: {
  //     label: "Facebook",
  //     icon: FacebookLogo,
  //   },
  //   x: {
  //     label: "Twitter/X",
  //     icon: TwitterLogo,
  //   },
  //   linkedin: {
  //     label: "LinkedIn",
  //     icon: LinkedInLogo,
  //   },
  //   "product-hunt": {
  //     label: "Product Hunt",
  //     icon: ProductHunt,
  //   },
}

const templateFiltersByPlatform = templateFilters.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.platform]: [...(acc[filter.platform] || []), filter],
  }),
  {} as Record<Platform, TemplateFilter[]>
)

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
]

interface ScreenshotTemplateSelectorProps {
  screenshotId: number
}

export default function ScreenshotTemplateSelector({
  screenshotId,
}: ScreenshotTemplateSelectorProps) {
  const { screenshots, updateTemplate } = useMultiTemplateStore(
    (state) => state
  )
  const screenshot = useMemo(
    () => screenshots.find((s) => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  const [selectedFilter, setSelectedFilter] = useState(templateFilters[0])

  if (!screenshot) return null

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">
          Choose template for Screenshot {screenshotId}
        </h3>
        <div className="flex gap-2">
          {Object.entries(templateFiltersByPlatform).map(
            ([platform, filters]) => {
              const PlatformLogo = platforms[platform as Platform]?.icon

              return (
                <DropdownMenu key={platform}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={
                        platform === selectedFilter.platform
                          ? "secondary"
                          : "outline"
                      }
                      size="sm"
                    >
                      {PlatformLogo && <PlatformLogo className="mr-1 size-3" />}
                      {platforms[platform as Platform]?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[220px]">
                    {filters.map((filter) => (
                      <DropdownMenuItem
                        key={filter.label}
                        onSelect={() => setSelectedFilter(filter)}
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{filter.label}</div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {filter.width}x{filter.height}
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }
          )}
        </div>
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
          <CarouselContent className="overflow-hidden">
            {templates
              .filter(
                (t) =>
                  t.platform === selectedFilter.platform &&
                  t.width === selectedFilter.width &&
                  t.height === selectedFilter.height
              )
              .map((t) => (
                <CarouselItem key={t.name} className="flex-shrink-0 basis-24">
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
