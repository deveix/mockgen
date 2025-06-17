import * as android from "./android"
import * as apple from "./apple"
import * as og from "./open-graph"
import * as x from "./x"

export const skeletons = {
  // Open Graph
  "og:basic": og.Basic,
  "og:notice": og.Notice,
  "og:hero": og.Hero,
  "og:image-right": og.ImageRight,
  "og:logos": og.Logos,
  "og:app-screenshot": og.AppScreenshot,

  // X Header templates
  "x:header-basic": x.header.Basic,
  "x:header-minimalist": x.header.Minimalist,
  "x:header-logo": x.header.Logo,

  // Apple
  "app-screenshot": apple.AppScreenshot,
  "apple:tilted-left": apple.TiltedLeft,
  "apple:tilted-right": apple.TiltedRight,
  "apple:hanged-up": apple.HangedUp,
  "apple:rotated": apple.Rotated,

  // Android
  "app-screenshot": android.AppScreenshot,
  "android:hanged-up": android.HangedUp,
}
