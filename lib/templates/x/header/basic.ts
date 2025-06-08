import { z } from "zod"

import { backgroundSchema } from "../../elements/background"
import { canvasSchema } from "../../elements/canvas"
import { textSchema } from "../../elements/text"

export const basicTemplateSchema = z.object({
  name: z.literal("x:header-basic"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        // apply defaults
        fontWeight: textSchema.shape.fontWeight.default(600),
        fontSize: textSchema.shape.fontSize.default(48),
      })
    ),
    description: textSchema.merge(
      z.object({
        // apply defaults
        fontSize: textSchema.shape.fontSize.default(36),
      })
    ),
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type BasicTemplate = z.infer<typeof basicTemplateSchema>

export const basicTemplateDefault: BasicTemplate = {
  name: "x:header-basic",
  params: {
    title: {
      text: "Hi, I'm Fady 👋",
      fontFamily: "inter",
      fontWeight: 600,
      fontSize: 48,
      color: "#f9fafb",
    },
    description: {
      text: "I build useful, everyday tools for developers.",
      fontFamily: "inter",
      fontWeight: 500,
      fontSize: 36,
      color: "#f9fafb",
    },
  },
  background: {
    type: "linear-gradient",
    direction: "to top right",
    colorStops: ["rgb(17, 24, 39)", "rgb(75, 85, 99)"],
    noise: 0.1,
    gridOverlay: {
      pattern: "grid",
      color: "#f9fafb",
      opacity: 0.3,
      blurRadius: 20,
    },
  },
  canvas: {
    width: 1500,
    height: 500,
  },
}
