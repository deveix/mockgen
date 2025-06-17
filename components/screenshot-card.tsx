"use client"

import React, { useMemo } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { Cross2Icon } from "@radix-ui/react-icons"
import { formatTemplateName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ScreenshotPreviewRenderer from "@/components/screenshot-preview-renderer"
import { ScreenshotTemplateForm } from "@/components/screenshot-template-form"
import ScreenshotTemplateSelector from "@/components/screenshot-template-selector"

interface ScreenshotCardProps {
  screenshotId: number
  platform: "apple" | "android"
}

export const ScreenshotCard = React.memo(function ScreenshotCard({
  screenshotId,
  platform,
}: ScreenshotCardProps) {
  // Use granular selectors - only get what we need
  const screenshot = useMultiTemplateStore((state) =>
    state.getScreenshotById(screenshotId)
  )
  const removeScreenshot = useMultiTemplateStore(
    (state) => state.removeScreenshot
  )

  // Memoize expensive computations
  const screenshotSrc = useMemo(() => {
    return screenshot?.screenshot
      ? URL.createObjectURL(screenshot.screenshot)
      : null
  }, [screenshot?.screenshot])

  const templateName = useMemo(() => {
    return screenshot ? formatTemplateName(screenshot.template.name) : ""
  }, [screenshot?.template.name])

  if (!screenshot) return null
  return (
    <div className="w-full">
      <Card className="h-full overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
              {screenshotSrc && (
                <img
                  src={screenshotSrc}
                  alt="Screenshot preview"
                  className="size-full object-cover"
                  width={screenshot.template.canvas.width}
                  height={screenshot.template.canvas.height}
                />
              )}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="truncate font-semibold">
                {screenshot.screenshot?.name || `Screenshot ${screenshot.id}`}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {templateName}
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
        </CardHeader>

        <CardContent className="space-y-4 overflow-hidden">
          {/* Template Selector */}
          <div className="space-y-3 overflow-hidden">
            <ScreenshotTemplateSelector
              screenshotId={screenshot.id}
              platform={platform}
            />
          </div>

          {/* Template Form (only for app-screenshot) */}
          <ScreenshotTemplateForm screenshotId={screenshot.id} />

          {/* Preview */}
          <div className="overflow-hidden rounded-lg border bg-muted/20 p-2">
            <ScreenshotPreviewRenderer screenshotId={screenshot.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
