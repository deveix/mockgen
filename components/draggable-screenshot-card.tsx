"use client"

import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragHandleDots2Icon } from "@radix-ui/react-icons"

import { ScreenshotCard } from "./screenshot-card"

interface DraggableScreenshotCardProps {
  screenshotId: number
  platform: "apple" | "android"
}

export function DraggableScreenshotCard({
  screenshotId,
  platform,
}: DraggableScreenshotCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: screenshotId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 z-10 flex h-8 w-8 cursor-grab items-center justify-center rounded border bg-background/80 shadow-sm hover:bg-accent hover:text-accent-foreground active:cursor-grabbing"
      >
        <DragHandleDots2Icon className="h-4 w-4" />
      </div>

      {/* Screenshot Card */}
      <ScreenshotCard screenshotId={screenshotId} platform={platform} />
    </div>
  )
}
