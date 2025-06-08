import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const logosTemplateSchema = z.object({
  name: z.literal("og:logos"),
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
        fontSize: textSchema.shape.fontSize.default(44),
      })
    ),
    logos: z.array(imageSchema),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type LogosTemplate = z.infer<typeof logosTemplateSchema>

export const logosTemplateDefault: LogosTemplate = {
  name: "og:logos",
  params: {
    tag: {
      text: "Developer Guide",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 20,
      color: "#030712",
    },
    title: {
      text: "Build a Linear Clone with Supabase and Next.js",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 44,
      color: "#030712",
    },
    logos: [
      {
        url: absoluteUrl("/samples/logos/nextjs.svg"),
      },
      {
        url: absoluteUrl("/samples/logos/supabase.svg"),
      },
      {
        url: absoluteUrl("/samples/logos/linear.svg"),
      },
    ],
  },
  background: {
    type: "linear-gradient",
    direction: "to top right",
    colorStops: [
      "rgb(254, 202, 202)",
      "rgb(252, 165, 165)",
      "rgb(254, 240, 138)",
    ],
    noise: 0.15,
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
