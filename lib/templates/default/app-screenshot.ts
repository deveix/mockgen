import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const appScreenshotTemplateSchema = z.object({
  name: z.literal("og:app-screenshot"),
  params: z.object({
    logo: imageSchema,
    title: textSchema,
    screenshot: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type AppScreenshotTemplate = z.infer<typeof appScreenshotTemplateSchema>

export const appScreenshotTemplateDefault: AppScreenshotTemplate = {
  name: "og:app-screenshot",
  params: {
    title: {
      text: "A super helpful app feature goes here",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 40,
      color: "#222",
    },
    logo: {
      url: absoluteUrl("/logo.svg"),
    },
    screenshot: {
      url: absoluteUrl("/samples/screenshots/iphone-screenshot.png"),
    },
  },
  background: {
    type: "color",
    color: "#c7d2fe",
    noise: 0,
    gridOverlay: undefined,
  },
  canvas: {
    width: 1080,
    height: 1920,
  },
}
