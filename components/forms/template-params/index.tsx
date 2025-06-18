import * as x from "./x"
import * as generic from "./generic"

export const templates = {
  // Apple
  "apple:app-screenshot": generic.AppScreenshot,
  "apple:tilted-left": generic.TiltedLeft,
  "apple:tilted-right": generic.TiltedRight,
  "apple:hanged-up": generic.HangedUp,
  "apple:rotated": generic.Rotated,

  // Android
  "android:app-screenshot": generic.AppScreenshot,
  "android:tilted-left": generic.TiltedLeft,
  "android:tilted-right": generic.TiltedRight,
  "android:hanged-up": generic.HangedUp,
  "android:rotated": generic.Rotated,

  // X Header templates
  "x:header-basic": x.header.basic,
  "x:header-minimalist": x.header.minimalist,
  "x:header-logo": x.header.logo,
}

