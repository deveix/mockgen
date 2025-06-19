import * as generic from "./generic"
import * as x from "./x"

export const templates = {

  // X Header templates
  "x:header-basic": x.header.basic,
  "x:header-minimalist": x.header.minimalist,
  "x:header-logo": x.header.logo,

  // Apple
  "apple:app-screenshot": generic.appScreenshot,
  "apple:tilted-left": generic.tiltedLeft,
  "apple:tilted-right": generic.tiltedRight,
  "apple:hanged-up": generic.hangedUp,
  "apple:rotated": generic.rotated,

  // Android
  "android:app-screenshot": generic.appScreenshot,
  "android:hanged-up": generic.hangedUp,
}