import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const hangedUpTemplateSchema = z.object({
  name: z.literal("apple:hanged-up"),
  params: z.object({
    title: textSchema,
    screenshot: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type HangedUpTemplate = z.infer<typeof hangedUpTemplateSchema>

export const hangedUpTemplateDefault: HangedUpTemplate = {
  name: "apple:hanged-up",
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
    noise: 0.1,
    gridOverlay: undefined,
  },
  canvas: {
    width: 1320,
    height: 2868,
  },
}
