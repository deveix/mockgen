import React, { forwardRef, useEffect } from "react"
import { Text } from "react-konva"

export const DraggableTemplateText = forwardRef<any, {
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
}>(
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
    ) => {
        useEffect(() => {
            console.log("KANVA Loading font:", fontFamily, "Weight:", fontWeight)
        }, [fontFamily, fontWeight])
        return (
            <Text
                ref={ref}
                text={text}
                x={x * 0.75}
                y={y}
                fontSize={fontSize}
                fontFamily={`${fontFamily}`}
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
    }
)
DraggableTemplateText.displayName = "DraggableTemplateText"
