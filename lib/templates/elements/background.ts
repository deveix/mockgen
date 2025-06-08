import { z } from "zod"

const gridOverlaySchema = z.object({
  pattern: z.enum(["grid", "graph-paper", "dots"]),
  color: z.string(),
  opacity: z.number().default(0.5),
  blurRadius: z.number().default(20),
})
export type GridOverlayParams = z.infer<typeof gridOverlaySchema>

const colorBackgroundSchema = z.object({
  type: z.literal("color"),
  color: z.string(),
  noise: z.number().default(0.1),
  gridOverlay: gridOverlaySchema.optional(),
})
export type ColorBackgroundParams = z.infer<typeof colorBackgroundSchema>

const gradientDirectionSchema = z.enum([
  "to top",
  "to top right",
  "to right",
  "to bottom right",
  "to bottom",
  "to bottom left",
  "to left",
  "to top left",
])
export type GradientDirection = z.infer<typeof gradientDirectionSchema>

export const linearGradientBackgroundSchema = z.object({
  type: z.literal("linear-gradient"),
  direction: gradientDirectionSchema,
  colorStops: z.array(z.string()),
  noise: z.number().default(0.15),
  gridOverlay: gridOverlaySchema.optional(),
})
export type LinearGradientBackgroundParams = z.infer<
  typeof linearGradientBackgroundSchema
>

export const backgroundSchema = z.discriminatedUnion("type", [
  colorBackgroundSchema,
  linearGradientBackgroundSchema,
])
export type BackgroundParams = z.infer<typeof backgroundSchema>

export function toBackgroundShorthand(
  background:
    | Pick<LinearGradientBackgroundParams, "type" | "direction" | "colorStops">
    | Pick<ColorBackgroundParams, "type" | "color">
) {
  if (background.type === "color") {
    return background.color
  } else if (background.type === "linear-gradient") {
    return `linear-gradient(${background.direction}, ${background.colorStops.join(", ")})`
  }
}
