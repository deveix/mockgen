"use client"

import React from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Cross2Icon, DragHandleDots2Icon } from "@radix-ui/react-icons"
import { formatTemplateName } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DraggableUploadItemProps {
  screenshotId: number
}

export function DraggableUploadItem({
  screenshotId,
}: DraggableUploadItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: screenshotId })

  const screenshot = useMultiTemplateStore((state) =>
    state.getScreenshotById(screenshotId)
  )
  const removeScreenshot = useMultiTemplateStore(
    (state) => state.removeScreenshot
  )

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  if (!screenshot) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 overflow-hidden rounded-md border bg-card p-2"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex size-6 cursor-grab items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground active:cursor-grabbing"
      >
        <DragHandleDots2Icon className="size-3" />
      </div>

      <div className="size-10 shrink-0 overflow-hidden rounded border bg-muted">
        {screenshot.screenshot && (
          <img
            src={URL.createObjectURL(screenshot.screenshot)}
            alt="Screenshot preview"
            className="size-full object-cover"
            width={screenshot.template.canvas.width}
            height={screenshot.template.canvas.height}
          />
        )}
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="truncate text-sm font-medium">
          {screenshot.screenshot?.name || `Screenshot ${screenshot.id}`}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          Template: {formatTemplateName(screenshot.template.name)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="size-8 shrink-0 p-0 text-muted-foreground hover:text-destructive"
        onClick={() => removeScreenshot(screenshot.id)}
      >
        <Cross2Icon className="size-4" />
      </Button>
    </div>
  )
}
