import * as android from "./android"
import { AppleTemplateForm } from "./apple/AppleTemplateForm"
import * as og from "./open-graph"
import * as x from "./x"
import * as appScreenshot from "./app-screenshot"


export const templates = {
  // Open Graph
  "og:basic": og.basic,
  "og:notice": og.notice,
  "og:hero": og.hero,
  "og:image-right": og.imageRight,
  "og:logos": og.logos,
  // Apple
  "apple:tilted-left": AppleTemplateForm,
  "apple:tilted-right": AppleTemplateForm,
  "apple:hanged-up": require("./apple/hanged-up").Form,
  "apple:rotated": AppleTemplateForm,

  // X Header templates
  "x:header-basic": x.header.basic,
  "x:header-minimalist": x.header.minimalist,
  "x:header-logo": x.header.logo,

  // Android

  "app-screenshot": appScreenshot,
  "android:hanged-up": android.hangedUp,

}

export * from "./android"
