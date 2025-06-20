import { z } from "zod"

import type { Template } from "./templates"

const DEFAULT_WEIGHT = 400

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


const GOOGLE_FONTS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY

export async function getFontUrl({
    family,
    weight,
}: {
    family: string
    weight: number
}): Promise<string | null> {
    if (!GOOGLE_FONTS_API_KEY) return null
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?family=${encodeURIComponent(family)}&key=${GOOGLE_FONTS_API_KEY}`
    console.log("Fetching font data from URL:", url)
    try {
        const res = await fetch(url)
        if (!res.ok) return null
        const data = await res.json()
        const item = data.items?.[0]
        if (!item || !item.files) return null
        const variantKey = String(weight)
        let fontUrl = item.files[variantKey]
        if (!fontUrl) {
            fontUrl = item.files['regular']
        }
        return fontUrl || null
    } catch {
        return null
    }
}

type SupportedFont = {
    value: string
    label: string
    weights: number[]
    subset: string
}

async function getAvailableFontsFromAPI(
    subset: string = "latin",
    maxFonts: number = 100
): Promise<SupportedFont[]> {
    if (!GOOGLE_FONTS_API_KEY)
        throw new Error("Missing GOOGLE_FONTS_API_KEY in .env")
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&capability=WOFF2&key=${GOOGLE_FONTS_API_KEY}`
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`Google Fonts API error: ${resp.statusText}`)
    const data: any = await resp.json()
    console.log("Available fonts data:", { data })
    return (data.items as any[])
        .filter((f: any) => f.subsets.includes(subset))
        .slice(0, maxFonts)
        .map((f: any) => ({
            value: f.family,
            label: f.family,
            weights: (f.variants as string[])
                .map((v: string) => parseInt(v.replace(/[^0-9]/g, "")))
                .filter((n: number) => !!n),
            subset,
        }))
}

export { getAvailableFontsFromAPI }


export function getFontsFromTemplate(template: Template["params"]) {
    const fonts: { family: string; weight: FontWeight }[] = []

    for (const [_, value] of Object.entries(template)) {
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
                family: value.fontFamily as string,
                weight: value.fontWeight as FontWeight,
            })
        }
    }

    return fonts
}
