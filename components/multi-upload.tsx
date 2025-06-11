"use client"

import { useRef, useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { UploadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function MultiUpload() {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { screenshots, addScreenshot, clearAll } = useMultiTemplateStore(
    (state) => state
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    imageFiles.slice(0, 6 - screenshots.length).forEach((file) => {
      addScreenshot(file)
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    imageFiles.slice(0, 6 - screenshots.length).forEach((file) => {
      addScreenshot(file)
    })

    e.target.value = ""
  }

  const canAddMore = screenshots.length < 6

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Screenshots</CardTitle>
        <CardDescription>
          Upload up to 6 screenshots to create templates. Supports PNG, JPG, and
          JPEG files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : canAddMore
                  ? "border-muted-foreground/25 hover:border-muted-foreground/50"
                  : "border-muted-foreground/10 bg-muted/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={!canAddMore}
            />

            <div className="space-y-4">
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  {canAddMore
                    ? "Drop your screenshots here, or click to browse"
                    : "Maximum 6 screenshots reached"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {screenshots.length}/6 screenshots uploaded
                </p>
              </div>
              {canAddMore && (
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </Button>
              )}
            </div>
          </div>

          {/* Screenshot List */}
          {screenshots.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Uploaded Screenshots</h4>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
              <div className="grid gap-2">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="flex items-center gap-3 overflow-hidden rounded-md border bg-card p-2"
                  >
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border bg-muted">
                      {screenshot.screenshot && (
                        <img
                          src={URL.createObjectURL(screenshot.screenshot)}
                          alt="Screenshot preview"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium">
                        {screenshot.screenshot?.name ||
                          `Screenshot ${screenshot.id}`}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        Template: {screenshot.template.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
