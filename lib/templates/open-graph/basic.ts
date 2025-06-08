import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const basicTemplateSchema = z.object({
  name: z.literal("og:basic"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        // apply defaults
        fontWeight: textSchema.shape.fontWeight.default(700),
        fontSize: textSchema.shape.fontSize.default(52),
      })
    ),
    description: textSchema.merge(
      z.object({
        // apply defaults
        fontSize: textSchema.shape.fontSize.default(30),
      })
    ),
    logo: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type BasicTemplate = z.infer<typeof basicTemplateSchema>

export const basicTemplateDefault: BasicTemplate = {
  name: "og:basic",
  params: {
    title: {
      text: "Vercel",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 52,
      color: "#030712",
    },
    description: {
      text: "The Frontend Cloud",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 30,
      color: "#030712",
    },
    logo: {
      url: absoluteUrl("/samples/logos/vercel.svg"),
    },
  },
  background: {
    type: "linear-gradient",
    direction: "to top right",
    colorStops: [
      "#d5d4d0 0%",
      "#d5d4d0 1%",
      "#eeeeec 31%",
      "#efeeec 75%",
      "#e9e9e7 100%",
    ],
    noise: 0.15,
    gridOverlay: {
      pattern: "grid",
      color: "#6b7280",
      opacity: 0.35,
      blurRadius: 20,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
