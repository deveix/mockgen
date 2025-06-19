"use client"

import React, { useRef, useState, useLayoutEffect, useMemo, useEffect, useCallback } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import satori from "satori"
import dynamic from "next/dynamic"
import { getFontsFromTemplate, getFontUrl } from "@/lib/fonts"
import { getIconCode, loadEmoji } from "@/lib/twemoji"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { templates } from "./templates"
import { PreviewBackground } from "./preview-background"
import { DraggableTemplateText } from "./draggable-template-text"

const Stage = dynamic(() => import("react-konva").then(mod => mod.Stage), { ssr: false })
import { Layer, Image as ImageKonva, Transformer } from "react-konva"

interface ScreenshotPreviewRendererProps {
  screenshotId: number
}

export default function ScreenshotPreviewRenderer({
  screenshotId,
}: ScreenshotPreviewRendererProps) {
  const { screenshots, updatePreviewSvg } = useMultiTemplateStore(
    (state) => state
  )
  const screenshot = useMemo(
    () => screenshots.find((s) => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  const trueWidth = screenshot?.template.canvas.width ?? 400
  const trueHeight = screenshot?.template.canvas.height ?? 800

  // Responsive width/height calculation
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(400)

  useLayoutEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const ratio = trueWidth / trueHeight
  const stageWidth = containerWidth
  const stageHeight = containerWidth / ratio

  const renderSvg = useCallback(async () => {
    if (!screenshot) return
    const fonts = getFontsFromTemplate(screenshot.template.params)
    const fontsResponses = await Promise.all(
      fonts.map((f) => (

        { family: f.family, weight: f.weight })
      )
    )

    const templateEntry = templates[screenshot.template.name] as {
      Template: React.ComponentType<{ template: typeof screenshot.template; renderWatermark: boolean }>
    }
    const TemplateComp = templateEntry.Template
    const templateSansTexte = { ...screenshot.template, params: { ...screenshot.template.params } }
    // On retire le champ texte principal
    const textFieldKey = Object.keys(templateSansTexte.params).find(key => {
      const val = templateSansTexte.params[key] as Record<string, unknown>
      return (
        val &&
        typeof val === "object" &&
        typeof val.text === "string" &&
        typeof val.fontFamily === "string" &&
        typeof val.fontWeight !== "undefined" &&
        typeof val.fontSize === "number" &&
        typeof val.color === "string"
      )
    })
    if (textFieldKey) {
      // On met le texte et le logo à vide pour ne pas les afficher dans le SVG
      templateSansTexte.params[textFieldKey] = {
        ...templateSansTexte.params[textFieldKey],
        text: ""
      }
      if (templateSansTexte.params.logo) {
        templateSansTexte.params.logo = { ...templateSansTexte.params.logo, url: "" }
      }
    }
    const svg = await satori(
      <TemplateComp
        template={{ ...templateSansTexte, background: { type: "color", color: "transparent", noise: 0 } }}
        renderWatermark={false}
      />, {
      width: screenshot.template.canvas.width,
      height: screenshot.template.canvas.height,
      fonts: fonts.map((f, i) => ({
        name: f.family,
        weight: f.weight,
        fontSize: f.fontSize,
        data: f.data,
        style: "normal",
      })),
      async loadAdditionalAsset(languageCode, segment) {
        if (languageCode === "emoji") {
          return (
            `data:image/svg+xml;base64,` +
            btoa(await loadEmoji(getIconCode(segment)))
          )
        }
        return []
      },
    }
    )
    updatePreviewSvg(screenshotId, svg)
  }, [screenshot, screenshotId, updatePreviewSvg])

  useEffect(() => {
    if (screenshot) {
      renderSvg()
    }
  }, [
    screenshot?.template.params,
    screenshot?.template.background,
    screenshot?.template.canvas,
  ])

  const mockConfig = (() => {
    if (screenshot?.template.name === "android:app-screenshot") {
      const width = (screenshot.template.canvas.width ?? 400) * 0.8
      const height = screenshot.template.canvas.height * 0.8
      return {
        x: 0,
        y: 0,
        width,
        height,
        borderRadius: 80,
      }
    }
    // Ajoute ici d'autres templates si besoin
    return {
      x: 0,
      y: 0,
      width: stageWidth,
      height: stageHeight,
      borderRadius: 0,
    }
  })()
  const [imagePos, setImagePos] = useState({ x: mockConfig.x, y: mockConfig.y })
  useEffect(() => {
    setImagePos({ x: mockConfig.x, y: mockConfig.y })
  }, [mockConfig.x, mockConfig.y, screenshotId])
  const [textPos, setTextPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    setTextPos({ x: 0, y: 0 })
  }, [screenshotId])
  if (!screenshot) return null

  const getMainTextField = (params: Record<string, unknown>) => {

    for (const key of Object.keys(params)) {
      const val = params[key] as Record<string, unknown>
      if (
        val &&
        typeof val === "object" &&
        typeof val.text === "string" &&
        typeof val.fontFamily === "string" &&
        typeof val.fontWeight !== "undefined" &&
        typeof val.fontSize === "number" &&
        typeof val.color === "string"
      ) {
        return val as {
          text: string
          fontFamily: string
          fontWeight: number
          fontSize: number
          color: string
        }
      }
    }
    return null
  }

  let textWidth = mockConfig.width
  let textX = textPos.x
  let textY = textPos.y
  if (screenshot?.template.name === "apple:app-screenshot") {
    textWidth = mockConfig.width - 200
    textX = (mockConfig.width - textWidth) / 2 + textPos.x
    textY = textPos.y
  }

  const [textState, setTextState] = useState({ x: textX, y: textY, rotation: 0, width: textWidth, height: undefined as number | undefined })
  useEffect(() => {
    setTextState({ x: textX, y: textY, rotation: 0, width: textWidth, height: undefined })
  }, [textX, textY, textWidth, screenshotId])

  // State pour l'image mock : position, taille, rotation
  const [imageState, setImageState] = useState({
    x: mockConfig.x,
    y: mockConfig.y,
    width: mockConfig.width,
    height: mockConfig.height,
    rotation: 0,
  })
  const imageRef = useRef<any>(null)
  const trRef = useRef<any>(null)
  useEffect(() => {
    setImageState({
      x: mockConfig.x,
      y: mockConfig.y,
      width: mockConfig.width,
      height: mockConfig.height,
      rotation: 0,
    })
  }, [mockConfig.x, mockConfig.y, mockConfig.width, mockConfig.height, screenshotId])
  useEffect(() => {
    if (imageRef.current && trRef.current) {
      trRef.current.nodes([imageRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [imageRef.current, trRef.current, screenshotId])

  return (
    <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
      {/* Fond immobile */}
      <PreviewBackground background={screenshot.template.background} width={stageWidth} height={stageHeight} />
      <AspectRatio ratio={ratio} style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Stage
          width={stageWidth}
          height={stageHeight}
          style={{ width: "100%", height: "100%" }}
        >
          <Layer>
            {/* Texte draggable */}
            {screenshot && (() => {
              const textField = getMainTextField(screenshot.template.params)
              console.log('Text field:', { textField })
              if (!textField) return null
              return (
                <DraggableTemplateText
                  text={textField.text}
                  x={textState.x}
                  y={textState.y}
                  fontSize={textField.fontSize}
                  fontFamily={textField.fontFamily}
                  fontWeight={textField.fontWeight}
                  color={textField.color}
                  width={textState.width}
                  onDragEnd={s => setTextState(s)}
                />
              )
            })()}
            {screenshot?.previewSvg && (
              <>
                <ImageKonva
                  ref={imageRef}
                  x={imageState.x}
                  y={imageState.y}
                  width={imageState.width}
                  height={imageState.height}
                  rotation={imageState.rotation}
                  image={(() => {
                    const img = new window.Image()
                    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(screenshot.previewSvg)}`
                    return img
                  })()}
                  draggable={true}
                  onDragEnd={e => setImageState(s => ({ ...s, x: e.target.x(), y: e.target.y() }))}
                  onTransformEnd={e => {
                    const node = imageRef.current
                    setImageState(s => ({
                      ...s,
                      x: node.x(),
                      y: node.y(),
                      width: node.width() * node.scaleX(),
                      height: node.height() * node.scaleY(),
                      rotation: node.rotation(),
                    }))
                    node.scaleX(1)
                    node.scaleY(1)
                  }}
                  cornerRadius={mockConfig.borderRadius}
                />
                <Transformer
                  ref={trRef}
                  rotateEnabled={true}
                  enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
                  boundBoxFunc={(oldBox, newBox) => {
                    if (Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10) {
                      return oldBox
                    }
                    return newBox
                  }}
                />
              </>
            )}
          </Layer>
        </Stage>
      </AspectRatio>
    </div>
  )
}

