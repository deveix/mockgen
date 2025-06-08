import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const noticeTemplateSchema = z.object({
  name: z.literal("og:notice"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        // apply defaults
        fontWeight: textSchema.shape.fontWeight.default(700),
        fontSize: textSchema.shape.fontSize.default(32),
      })
    ),
    description: textSchema.merge(
      z.object({
        // apply defaults
        fontSize: textSchema.shape.fontSize.default(28),
      })
    ),
    logo: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type NoticeTemplate = z.infer<typeof noticeTemplateSchema>

export const noticeTemplateDefault: NoticeTemplate = {
  name: "og:notice",
  params: {
    title: {
      text: "Changelog #6",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 32,
      color: "#030712",
    },
    description: {
      text: "December 2023",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 28,
      color: "#030712",
    },
    logo: {
      url: absoluteUrl("/samples/logos/bun.svg"),
    },
  },
  background: {
    type: "color",
    color: "#FFC5C5",
    noise: 0.15,
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
