import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const appScreenshotTemplateSchema = z.object({
  name: z.literal("android:app-screenshot"),
  params: z.object({
    logo: imageSchema,
    title: textSchema,
    screenshot: imageSchema,
    bottomPadding: z.string(),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type AppScreenshotTemplate = z.infer<typeof appScreenshotTemplateSchema>

export const appScreenshotTemplateDefault: AppScreenshotTemplate = {
  name: "android:app-screenshot",
  params: {
    title: {
      text: "A super helpful app feature goes here",
      fontFamily: "poppins",
      fontWeight: 700,
      fontSize: 100,
      color: "#222",
    },
    logo: {
      url: absoluteUrl("/logo.svg"),
      width: 200,
      height: 200,
    },
    screenshot: {
      url: absoluteUrl("/samples/screenshots/android-screenshot.png"),
    },
    bottomPadding: "-150",
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
