import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { BackgroundParams } from "@/lib/templates/elements/background"

export function PreviewBackground({ background, width, height }: { background: BackgroundParams, width: number, height: number }) {
    // On ne gère ici que le fond principal (pas de bruit ni d'overlay)
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                width: width,
                height: height,
                background: toBackgroundShorthand(background),
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    )
}
