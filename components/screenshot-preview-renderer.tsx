"use client"

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback,
} from "react"
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

const getMainTextField = (params: Record<string, unknown> | undefined) => {
  if (!params) return null
  for (const key of Object.keys(params)) {
    const val = params[key] as Record<string, unknown>
    if (
      val &&
      typeof val === "object" &&
      "text" in val && typeof val.text === "string" &&
      "fontFamily" in val && typeof val.fontFamily === "string" &&
      "fontWeight" in val && typeof val.fontWeight === "number" &&
      "fontSize" in val && typeof val.fontSize === "number" &&
      "color" in val && typeof val.color === "string"
    ) {
      console.log("Main text field found:", key, val)
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

export default function ScreenshotPreviewRenderer({
  screenshotId,
}: ScreenshotPreviewRendererProps) {
  const { screenshots, updatePreviewSvg } = useMultiTemplateStore(state => state)

  const screenshot = useMemo(
    () => screenshots.find(s => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<any>(null)
  const trRef = useRef<any>(null)

  const [containerWidth, setContainerWidth] = useState<number>(300)

  const { trueWidth, trueHeight, ratio } = useMemo(() => {
    const w = screenshot?.template.canvas.width ?? 400
    const h = screenshot?.template.canvas.height ?? 800
    return { trueWidth: w, trueHeight: h, ratio: w / h }
  }, [screenshot?.template.canvas])

  const stageWidth = containerWidth
  const stageHeight = containerWidth / ratio

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

  const mainTextField = useMemo(
    () => getMainTextField(screenshot?.template.params),
    [screenshot?.template.params]
  )

  const renderSvg = useCallback(async () => {
    if (!screenshot) return

    const templateFonts = getFontsFromTemplate(screenshot.template.params)
    const fontResponses = await Promise.all(
      templateFonts.map(async f => {
        try {
          const url = await getFontUrl({ family: f.family, weight: f.weight })
          if (!url) return null
          const res = await fetch(url)
          return res.ok ? { ...f, data: await res.arrayBuffer() } : null
        } catch {
          return null
        }
      })
    )
    const validFonts = fontResponses.filter(Boolean)

    const templateEntry = templates[screenshot.template.name] as {
      Template: React.ComponentType<{ template: typeof screenshot.template, renderWatermark: boolean }>
    }
    const TemplateComp = templateEntry.Template

    const templateWithoutText = JSON.parse(JSON.stringify(screenshot.template))
    const textFieldKey = Object.keys(templateWithoutText.params).find(key => {
      const val = templateWithoutText.params[key] as Record<string, unknown>
      return val && typeof val === "object" && "text" in val
    })

    if (textFieldKey) {
      templateWithoutText.params[textFieldKey].text = ""
    }
    if (templateWithoutText.params.logo) {
      templateWithoutText.params.logo.url = ""
    }

    templateWithoutText.background = {
      type: "color",
      color: "transparent",
      noise: 0,
    }

    const svg = await satori(<TemplateComp template={templateWithoutText} renderWatermark={false} />, {
      width: screenshot.template.canvas.width,
      height: screenshot.template.canvas.height,
      fonts: (validFonts as any[]).map(f => ({
        name: f.family,
        weight: f.weight,
        data: f.data,
        style: "normal",
      })),
      loadAdditionalAsset: async (languageCode, segment) => {
        if (languageCode === "emoji") {
          return `data:image/svg+xml;base64,${btoa(await loadEmoji(getIconCode(segment)))}`
        }
        return ""
      },
    })

    updatePreviewSvg(screenshotId, svg)
  }, [screenshot, screenshotId, updatePreviewSvg])

  useEffect(() => {
    if (screenshot) {
      renderSvg()
    }
  }, [screenshot?.template])

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

  const [imageState, setImageState] = useState({
    x: 0,
    y: 0,
    width: 400,
    height: 800,
    rotation: 0,
  })

  const [textState, setTextState] = useState({
    x: 0,
    y: 0,
    width: 400,
    rotation: 0,
  })

  // Nouvel état pour la sélection
  const [selectedElement, setSelectedElement] = useState<"image" | "text" | null>(null)
  const textRef = useRef<any>(null)

  // Ajout d'un délai de 0.5s pour forcer le rerender de DraggableTemplateText quand fontFamily change
  const [textRerenderKey, setTextRerenderKey] = useState(0)
  useEffect(() => {
    if (!mainTextField) return
    const timeout = setTimeout(() => {
      setTextRerenderKey(k => k + 1)
    }, 500)
    return () => clearTimeout(timeout)
  }, [mainTextField?.fontFamily])

  useEffect(() => {
    setImageState({
      x: mockConfig.x,
      y: mockConfig.y,
      width: mockConfig.width,
      height: mockConfig.height,
      rotation: 0,
    })

    let textX = 0
    let textWidth = mockConfig.width
    if (screenshot?.template.name === "apple:app-screenshot") {
      textWidth = mockConfig.width - 200
      textX = (mockConfig.width - textWidth) / 2
    }
    setTextState({ x: textX, y: 20, width: textWidth, rotation: 0 })
  }, [screenshotId, mockConfig, screenshot?.template.name])

  const konvaImage = useMemo(() => {
    if (!screenshot?.previewSvg) return null
    const img = new window.Image()
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(screenshot.previewSvg)}`
    return img
  }, [screenshot?.previewSvg])

  useEffect(() => {
    if (konvaImage && imageRef.current && trRef.current && selectedElement === "image") {
      trRef.current.nodes([imageRef.current])
      trRef.current.getLayer()?.batchDraw()
    } else if (textRef.current && trRef.current && selectedElement === "text") {
      trRef.current.nodes([textRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [konvaImage, selectedElement])

  if (!screenshot) return null

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", maxWidth: 400, position: "relative" }}
    >
      <PreviewBackground
        background={screenshot.template.background}
        width={stageWidth}
        height={stageHeight}
      />
      <AspectRatio
        ratio={ratio}
        style={{ width: "100%", position: "relative", zIndex: 1 }}
      >
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            {mainTextField && (
              <DraggableTemplateText
                key={`${screenshotId}-${mainTextField.fontFamily}-${mainTextField.fontWeight}-${textRerenderKey}`}
                text={mainTextField.text}
                x={textState.x}
                y={textState.y}
                fontSize={mainTextField.fontSize}
                fontFamily={mainTextField.fontFamily}
                fontWeight={mainTextField.fontWeight}
                color={mainTextField.color}
                width={textState.width}
                onDragEnd={s => setTextState(prev => ({ ...prev, ...s }))}
                draggable={true}
                ref={textRef}
                onClick={() => setSelectedElement("text")}
                onTap={() => setSelectedElement("text")}
              // Ajout de la sélection par clic/tap
              />
            )}
            {konvaImage && (
              <>
                <ImageKonva
                  ref={imageRef}
                  image={konvaImage}
                  x={imageState.x}
                  y={imageState.y}
                  width={imageState.width}
                  height={imageState.height}
                  rotation={imageState.rotation}
                  draggable={true}
                  onClick={() => setSelectedElement("image")}
                  onTap={() => setSelectedElement("image")}
                  onDragEnd={e => {
                    const node = imageRef.current
                    if (node) {
                      const scaleX = node.scaleX()
                      const scaleY = node.scaleY()
                      node.scaleX(1)
                      node.scaleY(1)
                      setImageState(s => ({
                        ...s,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, s.width * scaleX),
                        height: Math.max(5, s.height * scaleY),
                        rotation: node.rotation(),
                      }))
                    }
                  }}
                  onTransformEnd={() => {
                    const node = imageRef.current
                    if (node) {
                      const scaleX = node.scaleX()
                      const scaleY = node.scaleY()
                      node.scaleX(1)
                      node.scaleY(1)
                      setImageState(s => ({
                        ...s,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, s.width * scaleX),
                        height: Math.max(5, s.height * scaleY),
                        rotation: node.rotation(),
                      }))
                    }
                  }}
                  cornerRadius={mockConfig.borderRadius}
                />
                {/* Transformer sur l'élément sélectionné */}
                {selectedElement && (
                  <Transformer
                    ref={trRef}
                    rotateEnabled={true}
                    enabledAnchors={[
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right",
                    ]}
                    boundBoxFunc={(oldBox, newBox) =>
                      newBox.width < 10 || newBox.height < 10 ? oldBox : newBox
                    }
                  />
                )}
              </>
            )}
          </Layer>
        </Stage>
      </AspectRatio>
    </div>
  )
}