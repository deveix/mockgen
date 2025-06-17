"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import satori from "satori"

import { getFontsFromTemplate, getFontUrl } from "@/lib/fonts"
import { getIconCode, loadEmoji } from "@/lib/twemoji"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { templates } from "./templates"

interface ScreenshotPreviewRendererProps {
  screenshotId: number
}

export default function ScreenshotPreviewRenderer({
  screenshotId,
}: ScreenshotPreviewRendererProps) {
  const { screenshots, updatePreviewSvg } = useMultiTemplateStore(
    (state) => state
  )
  const screenshot = useMemo(
    () => screenshots.find((s) => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  async function renderSvg() {
    if (!screenshot) return

    const fonts = getFontsFromTemplate(screenshot.template.params)
    const fontsResponses = await Promise.all(
      fonts.map((f) =>
        // Next.js automatically caches fetch requests
        fetch(getFontUrl({ family: f.family, weight: f.weight }))
      )
    )
    const fontBuffers = await Promise.all(
      fontsResponses.map((res) => res.arrayBuffer())
    )
    // get the template component based on the currently selected template
    const templateEntry = templates[screenshot.template.name] as {
      Template: React.ComponentType<{ template: typeof screenshot.template; renderWatermark: boolean }>
    }
    const TemplateComp = templateEntry.Template
    console.log("Rendering SVG for screenshot:", screenshot)
    const svg = await satori(
      <TemplateComp
        template={screenshot.template}
        renderWatermark={false}
      />,
      {
        // debug: process.env.NODE_ENV === "development",
        width: screenshot.template.canvas.width,
        height: screenshot.template.canvas.height,
        fonts: fonts.map((f, i) => {
          return {
            name: f.family,
            weight: f.weight,
            data: fontBuffers[i],
            style: "normal",
          }
        }),
        async loadAdditionalAsset(languageCode, segment) {
          if (languageCode === "emoji") {
            return (
              `data:image/svg+xml;base64,` +
              btoa(await loadEmoji(getIconCode(segment)))
            )
          }

          return []
        },
      }
    )

    updatePreviewSvg(screenshotId, svg)
  }

  useEffect(() => {
    if (screenshot) {
      renderSvg()
    }
  }, [
    screenshot?.template.params,
    screenshot?.template.background,
    screenshot?.template.canvas,
  ])

  if (!screenshot) return null

  return (
    <AspectRatio
      ratio={
        screenshot.template.canvas.width / screenshot.template.canvas.height
      }
    >
      <img
        alt="Preview"
        className="h-full w-full rounded-md border object-contain"
        width={screenshot.template.canvas.width}
        height={screenshot.template.canvas.height}
        src={
          screenshot.previewSvg
            ? `data:image/svg+xml;utf8,${encodeURIComponent(screenshot.previewSvg)}`
            : "/loading.svg"
        }
      />
    </AspectRatio>
  )
}
