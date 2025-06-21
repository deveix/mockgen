import { z } from "zod"

import { fontWeightSchema } from "@/lib/fonts"

export const textSchema = z.object({
  text: z.string(),
  fontFamily: z.string(),
  fontWeight: fontWeightSchema,
  fontSize: z.number(),
  color: z.string(),
})
export type Text = z.infer<typeof textSchema>
