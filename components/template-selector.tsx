"use client"

import { useState, type JSX } from "react"
import { useTemplateStore } from "@/providers/template-store-provider"

import type { Template } from "@/lib/templates"
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
  BlogLogo,
  FacebookLogo,
  LinkedInLogo,
  OpenGraphLogo,
  ProductHunt,
  TwitterLogo,
} from "./icons"

type Platform =
  | "open-graph"
  | "blog"
  | "facebook"
  | "x"
  | "linkedin"
  | "product-hunt"
interface PlatformProps {
  label: string
  icon: (props: React.ComponentProps<"svg">) => JSX.Element
}
interface TemplateFilter {
  platform: Platform
  label: string
  width: number
  height: number
}

const templateFilters: TemplateFilter[] = [
  {
    platform: "open-graph",
    label: "Open Graph Protocol",
    width: 1200,
    height: 630,
  },
  // {
  //   platform: "blog",
  //   label: "Wide (16:9)",
  //   width: 1200,
  //   height: 630,
  // },
  // {
  //   platform: "facebook",
  //   label: "Post",
  //   width: 1200,
  //   height: 630,
  // },
  // {
  //   platform: "facebook",
  //   label: "Cover",
  //   width: 820,
  //   height: 360,
  // },
  // {
  //   platform: "x",
  //   label: "Post",
  //   width: 1024,
  //   height: 512,
  // },
  {
    platform: "x",
    label: "Header",
    width: 1500,
    height: 500,
  },
  // {
  //   platform: "linkedin",
  //   label: "Post",
  //   width: 1200,
  //   height: 627,
  // },
  // {
  //   platform: "linkedin",
  //   label: "Header",
  //   width: 1584,
  //   height: 396,
  // },
  // {
  //   platform: "product-hunt",
  //   label: "Post",
  //   width: 1600,
  //   height: 900,
  // },
]

const platforms: Record<Platform, PlatformProps> = {
  "open-graph": {
    label: "Open Graph",
    icon: OpenGraphLogo,
  },
  blog: {
    label: "Blog",
    icon: BlogLogo,
  },
  facebook: {
    label: "Facebook",
    icon: FacebookLogo,
  },
  x: {
    label: "Twitter/X",
    icon: TwitterLogo,
  },
  linkedin: {
    label: "LinkedIn",
    icon: LinkedInLogo,
  },
  "product-hunt": {
    label: "Product Hunt",
    icon: ProductHunt,
  },
}

const templateFiltersByPlatform = templateFilters.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.platform]: [...(acc[filter.platform] || []), filter],
  }),
  {} as Record<Platform, TemplateFilter[]>
)

const templates = [
  // Open Graph
  {
    platform: "open-graph",
    name: "og:image-right",
    width: 1200,
    height: 630,
    skeleton: skeletons["og:image-right"],
  },
  {
    platform: "open-graph",
    name: "og:hero",
    width: 1200,
    height: 630,
    skeleton: skeletons["og:hero"],
  },
  {
    platform: "open-graph",
    name: "og:logos",
    width: 1200,
    height: 630,
    skeleton: skeletons["og:logos"],
  },
  {
    platform: "open-graph",
    name: "og:basic",
    width: 1200,
    height: 630,
    skeleton: skeletons["og:basic"],
  },
  {
    platform: "open-graph",
    name: "og:notice",
    width: 1200,
    height: 630,
    skeleton: skeletons["og:notice"],
  },

  // Twitter/X Header
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
]

export default function TemplateSelector() {
  const template = useTemplateStore((state) => state)
  const [selectedFilter, setSelectedFilter] = useState(templateFilters[0])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="sr-only text-sm font-medium">Choose a template</h2>
        <div className="flex gap-2">
          {Object.entries(templateFiltersByPlatform).map(
            ([platform, filters]) => {
              const PlatformLogo = platforms[platform as Platform].icon

              return (
                <DropdownMenu key={platform}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={
                        platform === selectedFilter.platform
                          ? "secondary"
                          : "outline"
                      }
                    >
                      <PlatformLogo className="mr-1 size-4" />
                      {platforms[platform as Platform].label}
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
                          <div className="font-mono text-muted-foreground">
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
      >
        <RadioGroup
          value={template.name}
          onValueChange={(v) => template.setTemplate(v as Template["name"])}
        >
          <CarouselContent>
            {templates
              .filter(
                (t) =>
                  t.platform === selectedFilter.platform &&
                  t.width === selectedFilter.width &&
                  t.height === selectedFilter.height
              )
              .map((t) => (
                <CarouselItem
                  key={t.name}
                  className="basis-40 md:basis-64 lg:basis-1/5"
                >
                  <RadioGroupItem
                    value={t.name}
                    id={t.name}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={t.name}
                    className="flex aspect-video max-h-24 items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:max-h-32 [&:has([data-state=checked])]:border-primary"
                  >
                    <t.skeleton />
                  </Label>
                </CarouselItem>
              ))}
          </CarouselContent>
        </RadioGroup>

        {/* NOTE: hiding the buttons for large screens for now since we only have 5 templates */}
        <CarouselPrevious className="left-2 lg:hidden" variant="secondary" />
        <CarouselNext className="right-2 lg:hidden" variant="secondary" />
      </Carousel>
    </div>
  )
}
