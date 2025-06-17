import React, { useRef, useEffect } from "react"
import { Text } from "react-konva"

export function DraggableTemplateText({
    text,
    x,
    y,
    fontSize,
    fontFamily,
    fontWeight,
    color,
    width,
    onDragEnd,
}: {
    text: string
    x: number
    y: number
    fontSize: number
    fontFamily: string
    fontWeight: number
    color: string
    width: number
    onDragEnd: (pos: { x: number; y: number }) => void
}) {
    return (
        <Text
            text={text}
            x={x}
            y={y}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontStyle={fontWeight >= 700 ? "bold" : "normal"}
            fill={color}
            width={width}
            draggable
            onDragEnd={e => onDragEnd({ x: e.target.x(), y: e.target.y() })}
            align="center"
        />
    )
}
