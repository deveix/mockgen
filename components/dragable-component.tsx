import { forwardRef } from "react"
import { Image as ImageKonva } from "react-konva"

interface DraggableComponentProps {
    image: CanvasImageSource
    x: number
    y: number
    width: number
    height: number
    rotation?: number
    cornerRadius?: number
    draggable?: boolean
    onClick?: () => void
    onTap?: () => void
    onDragEnd?: (e: any) => void
    onTransformEnd?: (e: any) => void
    listening?: boolean
}

export const DraggableComponent = forwardRef<any, DraggableComponentProps>(
    (
        {
            image,
            x,
            y,
            width,
            height,
            rotation = 0,
            cornerRadius = 0,
            draggable = true,
            onClick,
            onTap,
            onDragEnd,
            onTransformEnd,
            listening = true,
        },
        ref
    ) => (
        <ImageKonva
            ref={ref}
            image={image}
            x={x}
            y={y}
            width={width}
            height={height}
            rotation={rotation}
            cornerRadius={cornerRadius}
            draggable={draggable}
            onClick={onClick}
            onTap={onTap}
            onDragEnd={onDragEnd}
            onTransformEnd={onTransformEnd}
            listening={listening}
        />
    )
)
DraggableComponent.displayName = "DraggableComponent"
