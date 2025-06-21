import React, { forwardRef } from "react"
import { Text } from "react-konva"

export type DraggableTemplateTextProps = {
    text: string
    x: number
    y: number
    fontSize: number
    fontFamily: string
    fontWeight: number
    color: string
    width: number
    onDragEnd: (pos: { x: number; y: number }) => void
    draggable?: boolean
    onClick?: () => void
    onTap?: () => void
}

export const DraggableTemplateText = forwardRef<any, DraggableTemplateTextProps>(
    (
        {
            text,
            x,
            y,
            fontSize,
            fontFamily,
            fontWeight,
            color,
            width,
            onDragEnd,
            draggable = false,
            onClick,
            onTap,
        },
        ref
    ) => (
        <Text
            ref={ref}
            text={text}
            x={x * 0.75}
            y={y}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontStyle={fontWeight >= 700 ? "bold" : "normal"}
            fill={color}
            width={width * 2}
            draggable={draggable}
            onDragEnd={e => onDragEnd({ x: e.target.x(), y: e.target.y() })}
            align="center"
            onClick={onClick}
            onTap={onTap}
        />
    )
)

DraggableTemplateText.displayName = "DraggableTemplateText"
