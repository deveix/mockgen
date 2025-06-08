import { z } from "zod"

import { fontFamilySchema, fontWeightSchema } from "@/lib/fonts"

export const textSchema = z.object({
  text: z.string(),
  fontFamily: fontFamilySchema,
  fontWeight: fontWeightSchema,
  fontSize: z.number(),
  color: z.string(),
})
export type Text = z.infer<typeof textSchema>
