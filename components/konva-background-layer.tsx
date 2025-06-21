import { Layer, Rect } from "react-konva"
import { BackgroundParams } from "@/lib/templates/elements/background"

export function KonvaBackgroundLayer({ background, width, height }: { background: BackgroundParams, width: number, height: number }) {
    let fill = undefined
    let fillLinearGradientStartPoint = undefined
    let fillLinearGradientEndPoint = undefined
    let fillLinearGradientColorStops = undefined

    if (background.type === "color") {
        fill = background.color
    } else if (background.type === "linear-gradient") {
        let stops = background.colorStops.filter(c => typeof c === "string" && c)
        if (stops.length === 1) {
            fillLinearGradientColorStops = [0, stops[0], 1, stops[0]]
        } else if (stops.length === 2) {
            fillLinearGradientColorStops = [0, stops[0], 1, stops[1]]
        } else if (stops.length > 2) {
            fillLinearGradientColorStops = []
            for (let i = 0; i < stops.length; i++) {
                const offset = stops.length === 1 ? 0 : i / (stops.length - 1)
                fillLinearGradientColorStops.push(Number(offset.toFixed(2)), stops[i])
            }
        } else {
            fillLinearGradientColorStops = undefined
        }
        switch (background.direction) {
            case "to right":
                fillLinearGradientStartPoint = { x: 0, y: 0 }
                fillLinearGradientEndPoint = { x: width, y: 0 }
                break
            case "to left":
                fillLinearGradientStartPoint = { x: width, y: 0 }
                fillLinearGradientEndPoint = { x: 0, y: 0 }
                break
            case "to bottom":
                fillLinearGradientStartPoint = { x: 0, y: 0 }
                fillLinearGradientEndPoint = { x: 0, y: height }
                break
            case "to top":
                fillLinearGradientStartPoint = { x: 0, y: height }
                fillLinearGradientEndPoint = { x: 0, y: 0 }
                break
            case "to top right":
                fillLinearGradientStartPoint = { x: 0, y: height }
                fillLinearGradientEndPoint = { x: width, y: 0 }
                break
            case "to bottom right":
                fillLinearGradientStartPoint = { x: 0, y: 0 }
                fillLinearGradientEndPoint = { x: width, y: height }
                break
            case "to bottom left":
                fillLinearGradientStartPoint = { x: width, y: 0 }
                fillLinearGradientEndPoint = { x: 0, y: height }
                break
            case "to top left":
                fillLinearGradientStartPoint = { x: width, y: height }
                fillLinearGradientEndPoint = { x: 0, y: 0 }
                break
            default:
                fillLinearGradientStartPoint = { x: 0, y: 0 }
                fillLinearGradientEndPoint = { x: width, y: 0 }
        }
    }
    const conf = {
        fill
    }
    return (
        <Layer listening={false}>
            <Rect
                x={0}
                y={0}
                width={width}
                height={height}
                {...(fill ? conf : {})}
                fillLinearGradientStartPoint={fillLinearGradientStartPoint}
                fillLinearGradientEndPoint={fillLinearGradientEndPoint}
                fillLinearGradientColorStops={fillLinearGradientColorStops}
                listening={false}
            />
        </Layer>
    )
}
