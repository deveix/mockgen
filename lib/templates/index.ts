import { z } from "zod"

import * as android from "./android"
import * as apple from "./apple"
import * as og from "./open-graph"
import * as x from "./x"

export type TemplateName =
  // Open Graph
  | "og:image-right"
  | "og:basic"
  | "og:hero"
  | "og:notice"
  | "og:logos"
  | "og:app-screenshot"

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
  | "android:hanged-up";

export const templateSchema = z.discriminatedUnion("name", [
  // Open Graph
  og.imageRightTemplateSchema,
  og.basicTemplateSchema,
  og.heroTemplateSchema,
  og.noticeTemplateSchema,
  og.logosTemplateSchema,
  og.appScreenshotTemplateSchema,

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
  // Open Graph
  "og:image-right": og.imageRightTemplateDefault,
  "og:basic": og.basicTemplateDefault,
  "og:hero": og.heroTemplateDefault,
  "og:notice": og.noticeTemplateDefault,
  "og:logos": og.logosTemplateDefault,
  "og:app-screenshot": og.appScreenshotTemplateDefault,

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

export * from "./android"
