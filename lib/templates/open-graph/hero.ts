import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const heroTemplateSchema = z.object({
  name: z.literal("og:hero"),
  params: z.object({
    tag: textSchema.merge(
      z.object({
        // apply defaults
        fontSize: textSchema.shape.fontSize.default(20),
      })
    ),
    title: textSchema.merge(
      z.object({
        // apply defaults
        fontWeight: textSchema.shape.fontWeight.default(700),
        fontSize: textSchema.shape.fontSize.default(48),
      })
    ),
    image: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type HeroTemplate = z.infer<typeof heroTemplateSchema>

export const heroTemplateDefault: HeroTemplate = {
  name: "og:hero",
  params: {
    tag: {
      text: "Open Source",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 20,
      color: "#f9fafb",
    },
    title: {
      text: "Introducing Supabase Logs",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 48,
      color: "#f9fafb",
    },
    image: {
      url: absoluteUrl("/samples/supabase-logs.png"),
    },
  },
  background: {
    type: "color",
    color: "#000000",
    noise: 0.1,
    gridOverlay: {
      pattern: "graph-paper",
      color: "#f9fafb",
      opacity: 0.55,
      blurRadius: 20,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
