
import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"
import { BackgroundParams as Background } from "@/lib/templates/elements/background"
import { CanvasParams as Canvas } from "@/lib/templates/elements/canvas"
import React from "react"

interface BackgroundContainerProps {
  canvas: Canvas
  background: Background
  children: React.ReactNode
  style?: React.CSSProperties
}

export function BackgroundContainer({
  canvas,
  background,
  children,
  style,
}: BackgroundContainerProps) {
  return (
    <div
      style={{
        width: canvas.width,
        height: canvas.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: toBackgroundShorthand(background),
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
          filter: "brightness(100%) contrast(150%)",
          opacity: background.noise,
          backgroundImage: `url('/noise.svg')`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      {background.gridOverlay && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundImage: `url('${patterns[background.gridOverlay.pattern as keyof typeof patterns].svg({ color: background.gridOverlay.color, opacity: background.gridOverlay.opacity })}')`,
            maskImage:
              background.gridOverlay.blurRadius > 0
                ? `radial-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) ${100 - background.gridOverlay.blurRadius}%)`
                : "none",
          }}
        ></div>
      )}
      {children}
    </div>
  )
}
