
import { z } from "zod"
import { fontFamilySchema as FontFamilySchema, fontWeightSchema as FontWeightSchema } from "@/lib/fonts"

import { canvasSchema as CanvasSchema } from "@/lib/templates/elements/canvas"
import { backgroundSchema as BackgroundSchema } from "@/lib/templates/elements/background"


export const appScreenshotTemplateSchema = z.object({
  name: z.literal("app-screenshot"),
  canvas: CanvasSchema,
  background: BackgroundSchema,
  params: z.object({
    title: z.object({
      text: z.string().default(""),
      fontFamily: FontFamilySchema,
      fontWeight: FontWeightSchema,
      fontSize: z.number().default(100),
      color: z.string().default("#000000"),
    }),
    screenshot: z.object({
      url: z.string().default(""),
      width: z.number().default(1000),
      height: z.number().default(1000),
    }),
    logo: z.object({
      url: z.string().default(""),
      width: z.number().default(96), // 6rem * 16px/rem = 96px
      height: z.number().default(96), // 6rem * 16px/rem = 96px
    }).optional(),
    bottomPadding: z.number().default(0),
    device: z.enum(["apple", "android"]).default("apple"),
  }),
})

export type AppScreenshotTemplate = z.infer<typeof appScreenshotTemplateSchema>

export const appScreenshotTemplateDefault: AppScreenshotTemplate = {
  name: "app-screenshot",
  canvas: {
    width: 1200,
    height: 675,
  },
  background: {
    type: "color",
    color: "#ffffff",
    noise: 0.1,
    gridOverlay: {
      pattern: "dots",
      color: "#000000",
      opacity: 0.1,
      blurRadius: 0,
    },
  },
  params: {
    title: {
      text: "Your App Title",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 100,
      color: "#000000",
    },
    screenshot: {
      url: "https://placehold.co/500x1000",
      width: 1000,
      height: 1000,
    },
    logo: {
      url: "https://placehold.co/100x100",
      width: 96,
      height: 96,
    },
    bottomPadding: 0,
    device: "apple",
  },
}
