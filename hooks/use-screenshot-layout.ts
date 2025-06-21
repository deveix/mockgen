import { useMemo } from "react"

export function useScreenshotLayout(screenshot: any, containerWidth: number) {
    // Calcule les dimensions réelles et le ratio
    const { trueWidth, trueHeight, ratio } = useMemo(() => {
        const w = screenshot?.template.canvas.width ?? 400
        const h = screenshot?.template.canvas.height ?? 800
        return { trueWidth: w, trueHeight: h, ratio: w / h }
    }, [screenshot?.template.canvas])

    const stageWidth = containerWidth
    const stageHeight = containerWidth / ratio

    // Calcule la config du mock (placement image device)
    const mockConfig = useMemo(() => {
        if (screenshot?.template.name === "android:app-screenshot") {
            const width = trueWidth * 0.7
            const height = trueHeight * 0.7
            return { x: 0, y: 0, width, height, borderRadius: 80 }
        }
        return {
            x: 50,
            y: 150,
            width: stageWidth * 0.8,
            height: stageHeight * 0.8,
            borderRadius: 0,
        }
    }, [screenshot?.template.name, trueWidth, trueHeight, stageWidth, stageHeight])

    return { trueWidth, trueHeight, ratio, stageWidth, stageHeight, mockConfig }
}
