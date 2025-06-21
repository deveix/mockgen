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
    if (!GOOGLE_FONTS_API_KEY) throw new Error("Missing GOOGLE_FONTS_API_KEY in .env")
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?family=${encodeURIComponent(family)}&key=${GOOGLE_FONTS_API_KEY}`
    console.log("Fetching font data from URL:", url)
    try {
        const res = await fetch(url)
        if (!res.ok) return null
        const data = await res.json()
        const item = data.items?.find((item: any) => item.family === family)
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

export type GoogleFontsAPIItem = {
    family: string;
    variants: string[];
    subsets: string[];
    files: Record<string, string>;
    [key: string]: any;
};

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
    return (data.items as GoogleFontsAPIItem[])
        .filter((f: GoogleFontsAPIItem) => f.subsets.includes(subset))
        .slice(0, maxFonts)
        .map((f: GoogleFontsAPIItem) => ({
            value: f.family,
            label: f.family,
            weights: (f.variants as string[])
                .map((v: string) => {
                    if (v === "regular" || v === "italic") return 400;
                    const match = v.match(/^(\d+)/);
                    if (match) return parseInt(match[1], 10);
                    return NaN;
                })
                .filter((n: number) => Number.isFinite(n)),
            subset,
        }))
}

export { getAvailableFontsFromAPI }


export function getFontsFromTemplate(template: Template["params"]) {
    const fontMap = new Map<string, FontWeight>()
    for (const value of Object.values(template)) {
        if (
            value &&
            typeof value === "object" &&
            "fontFamily" in value &&
            "fontWeight" in value
        ) {
            const key = `${value.fontFamily}__${value.fontWeight}`
            if (!fontMap.has(key)) {
                fontMap.set(key, value.fontWeight as FontWeight)
            }
        }
    }
    return Array.from(fontMap.entries()).map(([k, weight]) => {
        const family = k.split("__")[0]
        return { family, weight }
    })
}
