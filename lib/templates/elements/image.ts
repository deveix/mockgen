import { z } from "zod"

export const imageSchema = z.object({
  url: z.string().url(),
})
export type Image = z.infer<typeof imageSchema>
