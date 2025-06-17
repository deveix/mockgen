import { z } from "zod"

import * as android from "./android"
import * as apple from "./apple"
import * as og from "./open-graph"
import * as x from "./x"
import * as appScreenshot from "./app-screenshot"

const templateNameSchema = z.union([
  // Open Graph
  z.literal("og:image-right"),
  z.literal("og:basic"),
  z.literal("og:hero"),
  z.literal("og:notice"),
  z.literal("og:logos"),
  z.literal("app-screenshot"),

  // X Header templates
  z.literal("x:header-basic"),
  z.literal("x:header-minimalist"),
  z.literal("x:header-logo"),

  // Apple

  z.literal("apple:tilted-left"),
  z.literal("apple:tilted-right"),
  z.literal("apple:hanged-up"),
  z.literal("apple:rotated"),

  // Android

  z.literal("android:hanged-up"),
  z.literal("app-screenshot"),
])
export type TemplateName = z.infer<typeof templateNameSchema>

export const templateSchema = z.discriminatedUnion("name", [
  // Open Graph
  og.imageRightTemplateSchema,
  og.basicTemplateSchema,
  og.heroTemplateSchema,
  og.noticeTemplateSchema,
  og.logosTemplateSchema,


  // X Header templates
  x.header.basicTemplateSchema,
  x.header.minimalistTemplateSchema,
  x.header.logoTemplateSchema,

  // Apple

  apple.tiltedLeftTemplateSchema,
  apple.tiltedRightTemplateSchema,
  apple.hangedUpTemplateSchema,
  apple.rotatedTemplateSchema,

  // Android


  android.hangedUpTemplateSchema,
  appScreenshot.appScreenshotTemplateSchema,

])
export type Template = z.infer<typeof templateSchema>

export const templateDefaults: Record<TemplateName, Template> = {
  // Open Graph
  "og:image-right": og.imageRightTemplateDefault,
  "og:basic": og.basicTemplateDefault,
  "og:hero": og.heroTemplateDefault,
  "og:notice": og.noticeTemplateDefault,
  "og:logos": og.logosTemplateDefault,


  // X Header templates
  "x:header-basic": x.header.basicTemplateDefault,
  "x:header-minimalist": x.header.minimalistTemplateDefault,
  "x:header-logo": x.header.logoTemplateDefault,

  // Apple

  "apple:tilted-left": apple.tiltedLeftTemplateDefault,
  "apple:tilted-right": apple.tiltedRightTemplateDefault,
  "apple:hanged-up": apple.hangedUpTemplateDefault,
  "apple:rotated": apple.rotatedTemplateDefault,

  // Android



  "android:hanged-up": android.hangedUpTemplateDefault,
  "app-screenshot": appScreenshot.appScreenshotTemplateDefault,


}

export * from "./app-screenshot"
