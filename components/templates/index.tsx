import * as apple from "./apple"
import * as og from "./open-graph"
import * as x from "./x"

export const templates = {
  // Open Graph
  "og:basic": og.basic,
  "og:notice": og.notice,
  "og:hero": og.hero,
  "og:image-right": og.imageRight,
  "og:logos": og.logos,
  "og:app-screenshot": og.appScreenshot,

  // X Header templates
  "x:header-basic": x.header.basic,
  "x:header-minimalist": x.header.minimalist,
  "x:header-logo": x.header.logo,

  // Apple
  "apple:app-screenshot": apple.appScreenshot,
  "apple:tilted-left": apple.tiltedLeft,
  "apple:tilted-right": apple.tiltedRight,
  "apple:hanged-up": apple.hangedUp,
  "apple:rotated": apple.rotated,
}
