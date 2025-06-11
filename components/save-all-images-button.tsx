"use client"

import { useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { DownloadIcon } from "@radix-ui/react-icons"
import JSZip from "jszip"

import { Button } from "@/components/ui/button"

function initResvgWorker() {
  if (typeof window === "undefined") return

  const worker = new Worker(
    new URL("../components/resvg-worker.ts", import.meta.url)
  )

  const pending = new Map()
  worker.onmessage = (e) => {
    const { _id, url } = e.data
    const resolve = pending.get(_id)
    if (resolve) {
      resolve(url)
      pending.delete(_id)
    }
  }

  return async (msg: object) => {
    const _id = Math.random()
    worker.postMessage({
      ...msg,
      _id,
    })
    return new Promise((resolve) => {
      pending.set(_id, resolve)
    })
  }
}

const renderPNG = initResvgWorker()

export default function SaveAllImagesButton() {
  const screenshots = useMultiTemplateStore((state) => state.screenshots)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSaveAll = async () => {
    if (screenshots.length === 0) return

    try {
      setIsGenerating(true)

      // Create a zip file
      const zip = new JSZip()

      // Process each screenshot
      for (const screenshot of screenshots) {
        if (!screenshot.previewSvg) continue

        try {
          const pngDataUrl = (await renderPNG?.({
            svg: screenshot.previewSvg,
            width: screenshot.template.canvas.width,
          })) as string

          // Extract the base64 data from the data URL
          const base64Data = pngDataUrl.split(",")[1]

          // Add to zip with a descriptive name
          const fileName = `screenshot-${screenshot.id}-${screenshot.template.name}.png`
          zip.file(fileName, base64Data, { base64: true })
        } catch (error) {
          console.error(`Failed to process screenshot ${screenshot.id}:`, error)
        }
      }

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
      console.error("Failed to save all images:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const hasScreenshots = screenshots.length > 0
  const allRendered = screenshots.every((s) => s.previewSvg)

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
          className="mr-2 h-4 w-4 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <DownloadIcon className="mr-2 h-4 w-4" />
      )}
      <span>
        {isGenerating
          ? `Generating ${screenshots.length} images...`
          : `Save All (${screenshots.length}) Images`}
      </span>
    </Button>
  )
}
