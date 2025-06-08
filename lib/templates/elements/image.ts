import { z } from "zod"

export const imageSchema = z.object({
  url: z.string().url(),
  width: z.number().optional(),
  height: z.number().optional(),
})
export type Image = z.infer<typeof imageSchema>
