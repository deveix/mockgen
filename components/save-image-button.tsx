"use client"

import { useEffect, useRef, useState } from "react"
import { useTemplateStore } from "@/providers/template-store-provider"
import { DownloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { useResvgWorker } from "@/hooks/use-resvg-worker"


export default function SaveImageButton() {
  const { canvas, previewSvg } = useTemplateStore((state) => state)
  const [pngDownloadUrl, setPngDownloadUrl] = useState<string>()
  const [generatingPng, setGeneratingPng] = useState(false)
  const pngAnchorElement = useRef<HTMLAnchorElement>(null)
  const renderPNG = useResvgWorker()

  useEffect(() => {
    if (pngDownloadUrl) {
      pngAnchorElement.current?.click()
    }
  }, [pngDownloadUrl])

  return (
    <>
      <a
        ref={pngAnchorElement}
        href={pngDownloadUrl}
        download="image.png"
        className="hidden"
      />

      <Button
        onClick={async () => {
          try {
            setGeneratingPng(true)
            const pngDownloadUrl = await renderPNG?.({
              svg: previewSvg,
              width: canvas.width,
            })

            // this will set the pngDownloadUrl and trigger the useEffect to download the image
            setPngDownloadUrl(pngDownloadUrl as string)
          } finally {
            setGeneratingPng(false)
          }
        }}
        disabled={generatingPng}
      >
        {generatingPng ? (
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
        <span>Save Image</span>
      </Button>
    </>
  )
}
