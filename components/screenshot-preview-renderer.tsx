"use client"

import React, { useRef, useState, useLayoutEffect, useMemo, useEffect, createContext, useContext } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { useSatoriPreview } from "@/hooks/use-satori-preview"
import dynamic from "next/dynamic"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { DraggableTemplateText } from "./draggable-template-text"
import { useScreenshotLayout } from "@/hooks/use-screenshot-layout"
import { useEditorState } from "@/hooks/use-editor-state"
import type Konva from "konva"
import { SelectableLayer } from "@/components/selectable-layer"
import { DraggableComponent } from "@/components/dragable-component"
import { KonvaBackgroundLayer } from "@/components/konva-background-layer"

const Stage = dynamic(() => import("react-konva").then(mod => mod.Stage), { ssr: false })
import { Image as ImageKonva } from "react-konva"

interface ScreenshotPreviewRendererProps {
  screenshotId: number
  stageRef?: React.Ref<any>
}

export const ExportContext = createContext(false)
export const useExportContext = () => useContext(ExportContext)

export default function ScreenshotPreviewRenderer({
  screenshotId,
  stageRef,
}: ScreenshotPreviewRendererProps) {
  const screenshots = useMultiTemplateStore(state => state.screenshots)
  const updatePreviewSvg = useMultiTemplateStore(state => state.updatePreviewSvg)
  const registerStageRef = useMultiTemplateStore(state => state.registerStageRef)
  const unregisterStageRef = useMultiTemplateStore(state => state.unregisterStageRef)

  // On force l'utilisation d'un objet ref pour l'enregistrement dans le store
  const localStageRef = useRef<any>(null)
  // On n'utilise que localStageRef pour le store, même si un stageRef externe est passé pour d'autres usages
  useEffect(() => {
    registerStageRef?.(screenshotId, localStageRef)
    return () => unregisterStageRef?.(screenshotId)
  }, [screenshotId, registerStageRef, unregisterStageRef])
  const effectiveStageRef = stageRef || localStageRef

  const screenshot = useMemo(
    () => screenshots.find(s => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<Konva.Image | null>(null)
  const trRef = useRef<Konva.Transformer | null>(null)
  const textRef = useRef<Konva.Text | null>(null)
  const logoRef = useRef<Konva.Image | null>(null)

  const [containerWidth, setContainerWidth] = useState<number>(300)

  const {
    ratio,
    stageWidth,
    stageHeight,
    mockConfig,
  } = useScreenshotLayout(screenshot, containerWidth)

  type MainTextField = {
    text: string
    fontFamily: string
    fontWeight: number
    fontSize: number
    color: string
  }
  const mainTextField = (screenshot?.template.params?.title ?? null) as MainTextField | null

  const screenshotForSatori = screenshot
    ? { ...screenshot, previewSvg: screenshot.previewSvg ?? undefined }
    : undefined

  const { renderSvg } = useSatoriPreview(screenshotForSatori, updatePreviewSvg)

  useEffect(() => {
    if (screenshot) {
      renderSvg()
    }
  }, [screenshot?.template])

  const initialImage = {
    x: mockConfig.x,
    y: mockConfig.y,
    width: mockConfig.width,
    height: mockConfig.height,
    rotation: 0,
  }
  let textX = 0
  let textWidth = mockConfig.width
  if (screenshot?.template.name === "apple:app-screenshot") {
    textWidth = mockConfig.width - 200
    textX = (mockConfig.width - textWidth) / 2
  }
  const initialText = { x: textX, y: 20, width: textWidth, rotation: 0 }

  // Initialisation des états pour image, texte et logo
  const logoParams = screenshot?.template?.params && "logo" in screenshot.template.params ? (screenshot.template.params.logo as any) : undefined;
  const initialLogo = {
    x: typeof logoParams?.x === "number" ? logoParams.x : 20,
    y: typeof logoParams?.y === "number" ? logoParams.y : 20,
    width: typeof logoParams?.width === "number" ? logoParams.width : 120,
    height: typeof logoParams?.height === "number" ? logoParams.height : 120,
    rotation: 0,
  }

  const [editorState, dispatch] = useEditorState(initialImage, initialText, initialLogo)

  useEffect(() => {
    dispatch({ type: "reset", image: initialImage, text: initialText, logo: initialLogo })
  }, [screenshotId, mockConfig, screenshot?.template.name])

  const [textRerenderKey, setTextRerenderKey] = useState(0)
  useEffect(() => {
    if (!mainTextField) return
    const timeout = setTimeout(() => {
      setTextRerenderKey(k => k + 1)
    }, 500)
    return () => clearTimeout(timeout)
  }, [mainTextField?.fontFamily])

  const konvaImage = useMemo(() => {
    if (typeof window === "undefined" || !screenshot?.previewSvg) return null
    const img = new window.Image()
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(screenshot.previewSvg)}`
    return img
  }, [screenshot?.previewSvg])

  // Génère l'image HTML pour le logo (comme konvaImage)
  const logoImage = useMemo(() => {
    if (typeof window === "undefined" || !screenshot?.template?.params || !("logo" in screenshot.template.params) || !screenshot.template.params.logo?.url) return null
    const img = new window.Image()
    img.src = screenshot.template.params.logo.url
    return img
  }, [screenshot?.template?.params && "logo" in screenshot.template.params ? screenshot.template.params.logo?.url : undefined])

  useEffect(() => {
    if (konvaImage && imageRef.current && trRef.current && editorState.selected === "image") {
      trRef.current.nodes([imageRef.current])
      trRef.current.getLayer()?.batchDraw()
    } else if (textRef.current && trRef.current && editorState.selected === "text") {
      trRef.current.nodes([textRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [konvaImage, editorState.selected])

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

  if (!screenshot) return null
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", maxWidth: 400, position: "relative" }}
    >
      {/* On retire PreviewBackground, le fond est maintenant dans le canvas */}
      <AspectRatio
        ratio={ratio}
        style={{ width: "100%", position: "relative", zIndex: 1 }}
      >
        <Stage ref={effectiveStageRef} width={stageWidth} height={stageHeight}>
          <KonvaBackgroundLayer background={screenshot.template.background} width={stageWidth} height={stageHeight} />
          <SelectableLayer
            selected={editorState.selected}
            imageRef={imageRef}
            textRef={textRef}
            trRef={trRef}
            logoRef={logoRef}
          >
            {mainTextField && (
              <DraggableTemplateText
                key={`${screenshotId}-${mainTextField.fontFamily}-${mainTextField.fontWeight}-${textRerenderKey}`}
                text={mainTextField.text}
                x={editorState.text.x}
                y={editorState.text.y}
                fontSize={mainTextField.fontSize}
                fontFamily={mainTextField.fontFamily}
                fontWeight={mainTextField.fontWeight}
                color={mainTextField.color}
                width={editorState.text.width}
                onDragEnd={s => dispatch({ type: "update", element: "text", payload: s })}
                draggable={true}
                ref={textRef}
                onClick={() => dispatch({ type: "select", element: "text" })}
                onTap={() => dispatch({ type: "select", element: "text" })}
              />
            )}
            {konvaImage && (
              <DraggableComponent
                ref={imageRef}
                image={konvaImage}
                x={editorState.image.x}
                y={editorState.image.y}
                width={editorState.image.width ?? 120}
                height={editorState.image.height ?? 120}
                rotation={editorState.image.rotation ?? 0}
                cornerRadius={mockConfig.borderRadius}
                draggable={true}
                onClick={() => dispatch({ type: "select", element: "image" })}
                onTap={() => dispatch({ type: "select", element: "image" })}
                onDragEnd={e => {
                  const node = imageRef.current
                  if (node) {
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()
                    node.scaleX(1)
                    node.scaleY(1)
                    dispatch({
                      type: "update",
                      element: "image",
                      payload: {
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, (editorState.image.width ?? 120) * scaleX),
                        height: Math.max(5, (editorState.image.height ?? 120) * scaleY),
                        rotation: node.rotation?.() ?? 0,
                      },
                    })
                  }
                }}
                onTransformEnd={() => {
                  const node = imageRef.current
                  if (node) {
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()
                    node.scaleX(1)
                    node.scaleY(1)
                    dispatch({
                      type: "update",
                      element: "image",
                      payload: {
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, (editorState.image.width ?? 120) * scaleX),
                        height: Math.max(5, (editorState.image.height ?? 120) * scaleY),
                        rotation: node.rotation?.() ?? 0,
                      },
                    })
                  }
                }}
              />
            )}
            {/* Ajout du logo sur le stage si présent dans le template, drag & drop */}
            {typeof window !== "undefined" && logoImage && (
              <DraggableComponent
                ref={logoRef}
                image={logoImage}
                x={editorState.logo.x}
                y={editorState.logo.y}
                width={editorState.logo.width ?? 24}
                height={editorState.logo.height ?? 24}
                draggable={true}
                onClick={() => dispatch({ type: "select", element: "logo" })}
                onTap={() => dispatch({ type: "select", element: "logo" })}
                onDragEnd={e => {
                  const node = logoRef.current
                  if (node) {
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()
                    node.scaleX(1)
                    node.scaleY(1)
                    dispatch({
                      type: "update",
                      element: "logo",
                      payload: {
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, editorState.logo.width * scaleX),
                        height: Math.max(5, (editorState.logo.height ?? 120) * scaleY),
                        rotation: node.rotation?.() ?? 0,
                      },
                    })
                  }
                }}
                onTransformEnd={() => {
                  const node = logoRef.current
                  if (node) {
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()
                    node.scaleX(1)
                    node.scaleY(1)
                    dispatch({
                      type: "update",
                      element: "logo",
                      payload: {
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, editorState.logo.width * scaleX),
                        height: Math.max(5, (editorState.logo.height ?? 120) * scaleY),
                        rotation: node.rotation?.() ?? 0,
                      },
                    })
                  }
                }}
                listening={true}
              />
            )}
          </SelectableLayer>
        </Stage>
      </AspectRatio>
    </div>
  )
}