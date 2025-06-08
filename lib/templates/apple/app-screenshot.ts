import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const appScreenshotTemplateSchema = z.object({
  name: z.literal("apple:app-screenshot"),
  params: z.object({
    logo: imageSchema,
    title: textSchema,
    screenshot: imageSchema,
    bottomPadding: z.number(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type AppScreenshotTemplate = z.infer<typeof appScreenshotTemplateSchema>

export const appScreenshotTemplateDefault: AppScreenshotTemplate = {
  name: "apple:app-screenshot",
  params: {
    title: {
      text: "A super helpful app feature goes here",
      fontFamily: "inter",
      fontWeight: 800,
      fontSize: 64,
      color: "#222",
    },
    logo: {
      url: absoluteUrl("/logo.svg"),
      width: 200,
      height: 200,
    },
    screenshot: {
      url: absoluteUrl("/samples/screenshots/iphone-screenshot.png"),
    },
    bottomPadding: -400,
  },
  background: {
    type: "color",
    color: "#c7d2fe",
    noise: 0.1,
    gridOverlay: undefined,
  },
  canvas: {
    width: 1320,
    height: 2868,
  },
}
