import { z } from "zod"

import type { Template } from "./templates"

const DEFAULT_WEIGHT = 400
const DEFAULT_FONT_FAMILY = "inter"

export const fontWeightSchema = z
  .union([
    z.literal(100),
    z.literal(200),
    z.literal(300),
    z.literal(400),
    z.literal(500),
    z.literal(600),
    z.literal(700),
    z.literal(800),
    z.literal(900),
  ])
  .default(DEFAULT_WEIGHT)
export type FontWeight = z.infer<typeof fontWeightSchema>

export const fontFamilySchema = z
  .enum([
    "inter",
    "open-sans",
    "noto-sans",
    "noto-sans-jp",
    "noto-sans-tc",
    "noto-sans-sc",
    "roboto",
    "poppins",
    "montserrat",
    "lato",
    "manrope",
    "ubuntu",
    "figtree",
    "fira-sans",
    "fira-code",
    "fira-mono",
    "source-code-pro",
    "ibm-plex-mono",
    "jetbrains-mono",
  ])
  .default(DEFAULT_FONT_FAMILY)
export type FontFamily = z.infer<typeof fontFamilySchema>

export const fontWeights = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
} as const

export const supportedFonts: {
  value: FontFamily
  label: string
  weights: FontWeight[]
  subset: "latin" | "japanese" | "chinese-traditional" | "chinese-simplified"
}[] = [
  {
    value: "inter",
    label: "Inter",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "open-sans",
    label: "Open Sans",
    weights: [300, 400, 500, 600, 700, 800],
    subset: "latin",
  },
  {
    value: "noto-sans",
    label: "Noto Sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "noto-sans-jp",
    label: "Noto Sans (Japanese)",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "japanese",
  },
  {
    value: "noto-sans-tc",
    label: "Noto Sans (Traditional Chinese)",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "chinese-traditional",
  },
  {
    value: "noto-sans-sc",
    label: "Noto Sans (Simplified Chinese)",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "chinese-simplified",
  },
  {
    value: "roboto",
    label: "Roboto",
    weights: [100, 300, 400, 500, 700, 900],
    subset: "latin",
  },
  {
    value: "poppins",
    label: "Poppins",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "montserrat",
    label: "Montserrat",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "lato",
    label: "Lato",
    weights: [100, 300, 400, 700, 900],
    subset: "latin",
  },
  {
    value: "manrope",
    label: "Manrope",
    weights: [200, 300, 400, 500, 600, 700, 800],
    subset: "latin",
  },
  {
    value: "ubuntu",
    label: "Ubuntu",
    weights: [300, 400, 500, 700],
    subset: "latin",
  },
  {
    value: "figtree",
    label: "Figtree",
    weights: [300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "fira-sans",
    label: "Fira Sans",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "fira-code",
    label: "Fira Code",
    weights: [300, 400, 500, 600, 700],
    subset: "latin",
  },
  {
    value: "fira-mono",
    label: "Fira Mono",
    weights: [400, 500, 700],
    subset: "latin",
  },
  {
    value: "source-code-pro",
    label: "Source Code Pro",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    subset: "latin",
  },
  {
    value: "ibm-plex-mono",
    label: "IBM Plex Mono",
    weights: [100, 200, 300, 400, 500, 600, 700],
    subset: "latin",
  },
  {
    value: "jetbrains-mono",
    label: "JetBrains Mono",
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
    subset: "latin",
  },
] as const

export function getFontUrl({
  family,
  weight,
}: {
  family: FontFamily
  weight: FontWeight
}) {
  const subset =
    supportedFonts.find((f) => f.value === family)?.subset ?? "latin"

  return `https://cdn.jsdelivr.net/fontsource/fonts/${family}@latest/${subset}-${weight}-normal.woff`
}

// getFontsFromTemplate returns a list of fonts used in a template
export function getFontsFromTemplate(template: Template["params"]) {
  let fonts: { family: FontFamily; weight: FontWeight }[] = []

  for (const [_key, value] of Object.entries(template)) {
    if (
      value && // ensure the value is non-null
      typeof value === "object" &&
      "fontFamily" in value &&
      "fontWeight" in value
    ) {
      // dedupe based on font weight and family
      if (
        fonts.find(
          (font) =>
            font.family === value.fontFamily && font.weight === value.fontWeight
        )
      ) {
        continue
      }

      fonts.push({
        family: value.fontFamily,
        weight: value.fontWeight,
      })
    }
  }

  return fonts
}
