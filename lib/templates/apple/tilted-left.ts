import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const tiltedLeftTemplateSchema = z.object({
  name: z.literal("apple:tilted-left"),
  params: z.object({
    title: textSchema,
    screenshot: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type TiltedLeftTemplate = z.infer<typeof tiltedLeftTemplateSchema>

export const tiltedLeftTemplateDefault: TiltedLeftTemplate = {
  name: "apple:tilted-left",
  params: {
    title: {
      text: "A super helpful app feature goes here",
      fontFamily: "poppins",
      fontWeight: 700,
      fontSize: 110,
      color: "#222",
    },
    screenshot: {
      url: absoluteUrl("/samples/screenshots/iphone-screenshot.png"),
    },
  },
  background: {
    type: "color",
    color: "#f3f4f6",
    noise: 0,
    gridOverlay: {
      pattern: "grid",
      color: "#030712",
      opacity: 0.5,
      blurRadius: 20,
    },
  },
  canvas: {
    width: 1320,
    height: 2868,
  },
}
