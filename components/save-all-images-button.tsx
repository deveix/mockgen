"use client"

import { useState, useRef } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { DownloadIcon } from "@radix-ui/react-icons"
import JSZip from "jszip"

import { formatTemplateName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ExportContext } from "@/components/screenshot-preview-renderer"

export default function SaveAllImagesButton() {
  const screenshots = useMultiTemplateStore((state) => state.screenshots)
  const stageRefs = useMultiTemplateStore((state) => state.stageRefs)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const isDownloadingRef = useRef(false)

  function removeTransformersRecursive(node: any) {
    if (!node || typeof node.getChildren !== "function") return
    const children = node.getChildren()
    children.forEach((child: any) => {
      if (child.className === "Transformer") {
        child.destroy()
      } else {
        removeTransformersRecursive(child)
      }
    })
  }

  const handleSaveAll = async () => {
    if (isGenerating || isDownloadingRef.current) return
    if (screenshots.length === 0) return
    isDownloadingRef.current = true

    try {
      setIsGenerating(true)
      setProgress(0)
      let finalZipName = `screenshots-${new Date().toISOString().split("T")[0]}.zip`
      const zip = new JSZip()
      let done = 0
      for (const screenshot of screenshots) {
        const stageRef = stageRefs[screenshot.id]
        if (!stageRef || !stageRef.current) {
          console.warn(`No stage ref for screenshot ${screenshot.id}, skipping`)
          continue
        }
        removeTransformersRecursive(stageRef.current)
        await new Promise((resolve) => setTimeout(resolve, 30))
        const dataUrl = stageRef.current.toDataURL({ pixelRatio: 3, mimeType: "image/png" })
        if (!dataUrl.startsWith("data:image/png")) continue
        const base64Data = dataUrl.split(",")[1]
        if (!base64Data || base64Data.length === 0) continue
        const fileName = `screenshot-${screenshot.id}-${formatTemplateName(screenshot.template.name)}.png`
        zip.file(fileName, base64Data, { base64: true })
        done++
        setProgress(done)
      }
      const fileCount = Object.keys(zip.files).length
      if (fileCount === 0) {
        alert("No valid images were generated. Please wait for all previews to render and try again.")
        return
      }
      const zipBlob = await zip.generateAsync({ type: "blob" })
      const zipUrl = URL.createObjectURL(zipBlob)
      const link = document.createElement("a")
      link.href = zipUrl
      link.download = finalZipName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(zipUrl)
    } catch (error) {
      alert("Failed to save images. Please try again.")
    } finally {
      setIsGenerating(false)
      isDownloadingRef.current = false
      setProgress(0)
    }
  }

  const hasScreenshots = screenshots.length > 0
  const allRendered = screenshots.every(
    (s) => s.previewSvg && s.previewSvg.trim().length > 0
  )
  const renderingCount = screenshots.filter(
    (s) => !s.previewSvg || s.previewSvg.trim().length === 0
  ).length

  return (
    <ExportContext.Provider value={isGenerating}>
      <Button
        onClick={handleSaveAll}
        disabled={!hasScreenshots || !allRendered || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 size-4 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <DownloadIcon className="mr-2 size-4" />
        )}
        <span>
          {isGenerating
            ? `Exporting ${progress}/${screenshots.length}...`
            : renderingCount > 0
              ? `Waiting for ${renderingCount} preview${renderingCount > 1 ? "s" : ""} to render...`
              : `Save All (${screenshots.length}) Images`}
        </span>
      </Button>
    </ExportContext.Provider>
  )
}
