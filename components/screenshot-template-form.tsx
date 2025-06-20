"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { AppScreenshotTemplate } from "@/lib/templates/apple/app-screenshot"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageSettings } from "@/components/forms/image-settings"
import { TextSettings } from "@/components/forms/text-settings"
import { ImageSelector } from "@/components/image-selector"
import { ResponsivePopover } from "@/components/responsive-popover"
import { FontWeight } from "@/lib/fonts"

interface ScreenshotTemplateFormProps {
  screenshotId: number
}

export function ScreenshotTemplateForm({
  screenshotId,
}: ScreenshotTemplateFormProps) {
  // More granular selector - only get what we need
  const screenshot = useMultiTemplateStore(
    useCallback(
      (state) => state.getScreenshotById(screenshotId),
      [screenshotId]
    )
  )
  const updateTemplateParams = useMultiTemplateStore(
    (state) => state.updateTemplateParams
  )

  // Local state for immediate UI feedback
  const [localTitle, setLocalTitle] = useState("")

  // Debounced value that updates the store
  const debouncedTitle = useDebouncedValue(localTitle, 300)

  // Initialize local state from store
  useEffect(() => {
    if (screenshot) {
      // && screenshot.template.name !== "apple:app-screenshot"
      const params = screenshot.template
        .params as AppScreenshotTemplate["params"]
      setLocalTitle(String(params.title.text))
    }
  }, [screenshot?.id]) // Only reset when screenshot ID changes

  // Update store when debounced value changes
  useEffect(() => {
    if (
      screenshot &&
      // screenshot.template.name === "apple:app-screenshot" &&
      debouncedTitle !== ""
    ) {
      const params = screenshot.template
        .params as AppScreenshotTemplate["params"]
      if (params.title.text !== debouncedTitle) {
        updateTemplateParams(screenshotId, {
          title: {
            ...params.title,
            text: debouncedTitle,
          },
        })
      }
    }
  }, [debouncedTitle, screenshot, screenshotId, updateTemplateParams])

  const params = useMemo(() => {
    if (!screenshot)
      // || screenshot.template.name !== "apple:app-screenshot"
      return null
    return screenshot.template.params as AppScreenshotTemplate["params"]
  }, [screenshot])

  if (
    !screenshot ||
    // screenshot.template.name !== "apple:app-screenshot" ||
    !params
  ) {
    return null
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Template Settings</CardTitle>
        <CardDescription className="text-xs">
          Customize title and logo for this screenshot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Title Input with local state */}
          <div className="space-y-2">
            <Label htmlFor={`title-${screenshotId}`} className="text-sm">
              Title
            </Label>
            <div className="flex space-x-2">
              <Input
                id={`title-${screenshotId}`}
                value={localTitle}
                className="text-sm"
                placeholder="Enter title text..."
                onChange={(e) => setLocalTitle(e.target.value)}
              />
              <ResponsivePopover
                title="Font Settings"
                description="Customize the title font."
                trigger={
                  <Button variant="outline" size="icon" className="size-9">
                    <MixerHorizontalIcon className="size-3" />
                  </Button>
                }
              >
                <TextSettings
                  fontFamily={params.title.fontFamily as string}
                  fontSize={params.title.fontSize as number}
                  fontWeight={params.title.fontWeight as FontWeight}
                  color={params.title.color as string}
                  onChangeFontFamily={(fontFamily) => {
                    console.log("Changing font family:", fontFamily)
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        text: localTitle, // Use current local state
                        fontFamily,
                      },
                    })
                  }}
                  onChangeFontSize={(fontSize) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        text: localTitle, // Use current local state
                        fontSize,
                      },
                    })
                  }
                  onChangeFontWeight={(fontWeight) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        text: localTitle, // Use current local state
                        fontWeight,
                      },
                    })
                  }
                  onChangeColor={(color) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        text: localTitle, // Use current local state
                        color,
                      },
                    })
                  }
                />
              </ResponsivePopover>
            </div>
          </div>

          {/* Logo Input */}
          {["apple:app-screenshot", "android:app-screenshot"].includes(screenshot.template.name) && (
            <div className="space-y-2">
              <Label htmlFor={`logo-${screenshotId}`} className="text-sm">
                Logo
              </Label>
              <div className="flex space-x-2 overflow-hidden">
                <div className="min-w-0 flex-1">
                  <ImageSelector
                    id={`logo-${screenshotId}`}
                    onChange={(v) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...(params.logo ?? {}),
                          url: v ?? "",
                        },
                      })
                    }
                    initialFileName={
                      params.logo.url
                        ? params.logo.url.split("/").pop()
                        : undefined
                    }
                  />
                </div>
                <ResponsivePopover
                  title="Logo Settings"
                  description="Customize the logo size."
                  trigger={
                    <Button variant="outline" size="icon" className="size-9">
                      <MixerHorizontalIcon className="size-3" />
                    </Button>
                  }
                >
                  <ImageSettings
                    width={params.logo.width ?? 200}
                    height={params.logo.height ?? 200}
                    onChangeWidth={(width) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...params.logo,
                          width: width ?? 200,
                        },
                      })
                    }
                    onChangeHeight={(height) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...params.logo,
                          height: height ?? 200,
                        },
                      })
                    }
                  />
                </ResponsivePopover>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
