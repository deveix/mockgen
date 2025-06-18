"use client"

import { useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { DownloadIcon } from "@radix-ui/react-icons"
import JSZip from "jszip"

import { formatTemplateName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useResvgWorker } from "@/hooks/use-resvg-worker"

export default function SaveAllImagesButton() {
  const screenshots = useMultiTemplateStore((state) => state.screenshots)
  const [isGenerating, setIsGenerating] = useState(false)
  const renderPNG = useResvgWorker()

  const handleSaveAll = async () => {
    if (screenshots.length === 0) return

    try {
      setIsGenerating(true)

      const zip = new JSZip()

      for (const screenshot of screenshots) {
        if (
          !screenshot.previewSvg ||
          screenshot.previewSvg.trim().length === 0
        ) {
          console.warn(
            `Screenshot ${screenshot.id} has no preview SVG, skipping`
          )
          continue
        }

        try {
          if (!renderPNG) {
            console.log("PNG renderer not available")
            continue
          }

          console.log(`Rendering screenshot ${screenshot.id}...`)
          const pngResult = (await renderPNG({
            svg: screenshot.previewSvg,
            width: screenshot.template.canvas.width,
          })) as string

          console.log(`PNG result for screenshot ${screenshot.id}:`, pngResult)

          let base64Data: string

          if (pngResult.startsWith("blob:")) {
            // Convert blob URL to base64
            const response = await fetch(pngResult)
            const blob = await response.blob()
            const arrayBuffer = await blob.arrayBuffer()
            const uint8Array = new Uint8Array(arrayBuffer)

            // Convert to base64
            let binaryString = ""
            uint8Array.forEach((byte) => {
              binaryString += String.fromCharCode(byte)
            })
            base64Data = btoa(binaryString)
          } else if (pngResult.startsWith("data:image/png;base64,")) {
            // Extract base64 from data URL
            base64Data = pngResult.split(",")[1]
          } else {
            console.log(
              `Invalid PNG result format for screenshot ${screenshot.id}:`,
              pngResult
            )
            continue
          }

          // Validate base64 data exists and has content
          if (!base64Data || base64Data.length === 0) {
            console.log(`Empty base64 data for screenshot ${screenshot.id}`)
            continue
          }

          // Add to zip with a descriptive name
          const fileName = `screenshot-${screenshot.id}-${formatTemplateName(screenshot.template.name)}.png`
          zip.file(fileName, base64Data, { base64: true })
          console.log(`Added ${fileName} to zip (${base64Data.length} chars)`)
        } catch (error) {
          console.log(`Failed to process screenshot ${screenshot.id}:`, error)
        }
      }

      // Check if any files were added to the zip
      const fileCount = Object.keys(zip.files).length
      if (fileCount === 0) {
        console.log("No valid images were generated")
        alert(
          "No valid images were generated. Please wait for all previews to render and try again."
        )
        return
      }

      console.log(`Generating zip with ${fileCount} files...`)

      // Generate the zip and download
      const zipBlob = await zip.generateAsync({ type: "blob" })
      const zipUrl = URL.createObjectURL(zipBlob)

      // Create download link
      const link = document.createElement("a")
      link.href = zipUrl
      link.download = `screenshots-${new Date().toISOString().split("T")[0]}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      URL.revokeObjectURL(zipUrl)
    } catch (error) {
      console.log("Failed to save all images:", error)
      alert("Failed to save images. Please try again.")
    } finally {
      setIsGenerating(false)
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
          ? `Generating ${screenshots.length} images...`
          : renderingCount > 0
            ? `Waiting for ${renderingCount} preview${renderingCount > 1 ? "s" : ""} to render...`
            : `Save All (${screenshots.length}) Images`}
      </span>
    </Button>
  )
}
