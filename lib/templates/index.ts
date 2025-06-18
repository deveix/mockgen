import { z } from "zod"

import * as android from "./android"
import * as apple from "./apple"
import * as x from "./x"

export type TemplateName =
  // X Header templates
  | "x:header-basic"
  | "x:header-minimalist"
  | "x:header-logo"

  // Apple
  | "apple:app-screenshot"
  | "apple:tilted-left"
  | "apple:tilted-right"
  | "apple:hanged-up"
  | "apple:rotated"

  // Android
  | "android:app-screenshot"
  | "android:hanged-up"

export const templateSchema = z.discriminatedUnion("name", [

  // X Header templates
  x.header.basicTemplateSchema,
  x.header.minimalistTemplateSchema,
  x.header.logoTemplateSchema,

  // Apple
  apple.appScreenshotTemplateSchema,
  apple.tiltedLeftTemplateSchema,
  apple.tiltedRightTemplateSchema,
  apple.hangedUpTemplateSchema,
  apple.rotatedTemplateSchema,

  // Android
  android.appScreenshotTemplateSchema,
  android.hangedUpTemplateSchema,
])
export type Template = z.infer<typeof templateSchema>

export const templateDefaults: Record<TemplateName, Template> = {
  // X Header templates
  "x:header-basic": x.header.basicTemplateDefault,
  "x:header-minimalist": x.header.minimalistTemplateDefault,
  "x:header-logo": x.header.logoTemplateDefault,

  // Apple
  "apple:app-screenshot": apple.appScreenshotTemplateDefault,
  "apple:tilted-left": apple.tiltedLeftTemplateDefault,
  "apple:tilted-right": apple.tiltedRightTemplateDefault,
  "apple:hanged-up": apple.hangedUpTemplateDefault,
  "apple:rotated": apple.rotatedTemplateDefault,

  // Android
  "android:app-screenshot": android.appScreenshotTemplateDefault,
  "android:hanged-up": android.hangedUpTemplateDefault,
}
