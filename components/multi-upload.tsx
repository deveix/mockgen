"use client"

import { useMemo, useRef, useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons"

import { formatTemplateName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DraggableUploadItem } from "@/components/draggable-upload-item"

export function MultiUpload() {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    screenshots,
    addScreenshot,
    clearAll,
    removeScreenshot,
    reorderScreenshots,
    reapplyTemplatesByOrder,
  } = useMultiTemplateStore((state) => state)

  // Memoize screenshot IDs for performance
  const screenshotIds = useMemo(
    () => screenshots.map((s) => s.id),
    [screenshots]
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      reorderScreenshots(Number(active.id), Number(over.id))
      // Reapply templates by order after reordering
      reapplyTemplatesByOrder()
    }
  }

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

    imageFiles.forEach((file) => {
      addScreenshot(file)
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    imageFiles.forEach((file) => {
      addScreenshot(file)
    })

    e.target.value = ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Screenshots</CardTitle>
        <CardDescription>
          Upload multiple screenshots to create templates. Supports PNG, JPG,
          and JPEG files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
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
            />

            <div className="space-y-4">
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  Drop your screenshots here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  {screenshots.length} screenshots uploaded
                </p>
              </div>
              <Button
                variant="outline"
              // onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={screenshotIds}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid gap-2">
                    {screenshotIds.map((screenshotId) => (
                      <DraggableUploadItem
                        key={screenshotId}
                        screenshotId={screenshotId}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
