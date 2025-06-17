import * as android from "./android"
import * as apple from "./apple"
import * as og from "./open-graph"
import * as x from "./x"
import * as appScreenshot from "./AppScreenshotTemplate"

export const templates = {
  // Open Graph
  "og:basic": og.basic,
  "og:notice": og.notice,
  "og:hero": og.hero,
  "og:image-right": og.imageRight,
  "og:logos": og.logos,


  // X Header templates
  "x:header-basic": x.header.basic,
  "x:header-minimalist": x.header.minimalist,
  "x:header-logo": x.header.logo,

  // Apple

  "apple:tilted-left": apple.tiltedLeft,
  "apple:tilted-right": apple.tiltedRight,
  "apple:hanged-up": apple.hangedUp,
  "apple:rotated": apple.rotated,

  // Android

  "android:hanged-up": android.hangedUp,
  "app-screenshot": appScreenshot.AppScreenshotTemplate,
}

export * from "./android"
