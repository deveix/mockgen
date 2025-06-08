import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

import { getFontsFromTemplate, getFontUrl } from "@/lib/fonts"
import { templateSchema } from "@/lib/templates"
import { templates } from "@/components/templates"

export const runtime = "edge"

export const POST = async (request: NextRequest) => {
  const body = await request.json()

  const template = templateSchema.parse(body)
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

  const { Template } = templates[template.name]

  const response = new ImageResponse(
    (
      <Template
        // @ts-ignore
        template={template}
        renderWatermark
      />
    ),
    {
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
    }
  )

  return response
}
