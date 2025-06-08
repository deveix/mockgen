import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../../elements/background"
import { canvasSchema } from "../../elements/canvas"
import { imageSchema } from "../../elements/image"
import { textSchema } from "../../elements/text"

export const logoTemplateSchema = z.object({
  name: z.literal("x:header-logo"),
  params: z.object({
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
export type LogoTemplate = z.infer<typeof logoTemplateSchema>

export const logoTemplateDefault: LogoTemplate = {
  name: "x:header-logo",
  params: {
    description: {
      text: "Deploy app servers close to your users",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 48,
      color: "#030712",
    },
    logo: {
      url: absoluteUrl("/samples/logos/fly.svg"),
    },
  },
  background: {
    type: "linear-gradient",
    direction: "to top right",
    colorStops: [
      "rgb(249, 168, 212)",
      "rgb(216, 180, 254)",
      "rgb(129, 140, 248)",
    ],
    noise: 0.15,
  },
  canvas: {
    width: 1500,
    height: 500,
  },
}
