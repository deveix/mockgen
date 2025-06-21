import { useCallback } from "react"
import satori from "satori"
import { getFontsFromTemplate, getFontUrl } from "@/lib/fonts"
import { getIconCode, loadEmoji } from "@/lib/twemoji"
import { templates } from "@/components/templates"

interface Screenshot {
    id: number
    template: any
    previewSvg?: string
}

type UpdatePreviewSvg = (id: number, svg: string) => void

export function useSatoriPreview(
    screenshot: Screenshot | undefined,
    updatePreviewSvg: UpdatePreviewSvg
) {
    const renderSvg = useCallback(async () => {
        if (!screenshot) return

        const templateFonts = getFontsFromTemplate(screenshot.template.params)
        const fontResponses = await Promise.all(
            templateFonts.map(async f => {
                try {
                    const url = await getFontUrl({ family: f.family, weight: f.weight })
                    if (!url) return null
                    const res = await fetch(url)
                    return res.ok ? { ...f, data: await res.arrayBuffer() } : null
                } catch {
                    return null
                }
            })
        )
        const validFonts = fontResponses.filter(Boolean)

        const templateName = screenshot.template.name as keyof typeof templates
        const templateEntry = templates[templateName]
        const TemplateComp = templateEntry?.Template
        if (!TemplateComp) return

        const templateWithoutText = JSON.parse(JSON.stringify(screenshot.template))
        const textFieldKey = Object.keys(templateWithoutText.params).find(key => {
            const val = templateWithoutText.params[key] as Record<string, unknown>
            return val && typeof val === "object" && "text" in val
        })

        if (textFieldKey) {
            templateWithoutText.params[textFieldKey].text = ""
        }
        if (templateWithoutText.params.logo) {
            templateWithoutText.params.logo.url = ""
        }

        templateWithoutText.background = {
            type: "color",
            color: "transparent",
            noise: 0,
        }

        const svg = await satori(
            <TemplateComp template={templateWithoutText} />,
            {
                width: screenshot.template.canvas.width,
                height: screenshot.template.canvas.height,
                fonts: (validFonts as any[]).map(f => ({
                    name: f.family,
                    weight: f.weight,
                    data: f.data,
                    style: "normal",
                })),
                loadAdditionalAsset: async (languageCode: string, segment: string) => {
                    if (languageCode === "emoji") {
                        return `data:image/svg+xml;base64,${btoa(await loadEmoji(getIconCode(segment)))}`
                    }
                    return ""
                },
            }
        )

        updatePreviewSvg(screenshot.id, svg)
    }, [screenshot, updatePreviewSvg, templates])

    return { renderSvg }
}
