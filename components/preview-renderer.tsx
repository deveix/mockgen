"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useTemplateStore } from "@/providers/template-store-provider"
import satori from "satori"

import { getFontsFromTemplate, getFontUrl } from "@/lib/fonts"
import { getIconCode, loadEmoji } from "@/lib/twemoji"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { templates } from "./templates"

export default function PreviewRenderer() {
  const template = useTemplateStore((state) => state)

  async function renderSvg() {
    const fonts = getFontsFromTemplate(template.params)
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
    const TemplateComp = templates[template.name].Template

    template.updatePreviewSvg(
      await satori(
        <TemplateComp
          // @ts-ignore
          template={template}
          renderWatermark
        />,
        {
          // debug: process.env.NODE_ENV === "development",
          width: template.canvas.width,
          height: template.canvas.height,
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
    )
  }

  useEffect(() => {
    renderSvg()
  }, [template.params, template.background, template.canvas])

  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        alt="Preview"
        priority
        className="h-full w-full object-contain"
        width={template.canvas.width}
        height={template.canvas.height}
        src={
          template.previewSvg
            ? `data:image/svg+xml;utf8,${encodeURIComponent(template.previewSvg)}`
            : "/loading.svg"
        }
      />
    </AspectRatio>
  )
}
