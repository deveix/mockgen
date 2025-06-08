import * as og from "./open-graph"
import * as x from "./x"

export const skeletons = {
  // Open Graph
  "og:basic": og.Basic,
  "og:notice": og.Notice,
  "og:hero": og.Hero,
  "og:image-right": og.ImageRight,
  "og:logos": og.Logos,

  // X Header templates
  "x:header-basic": x.header.Basic,
  "x:header-minimalist": x.header.Minimalist,
  "x:header-logo": x.header.Logo,
}
