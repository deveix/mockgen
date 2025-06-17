"use client"
import { FontFamily, FontWeight } from "@/lib/fonts"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { AppScreenshotTemplate } from "@/lib/templates/app-screenshot"
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
      // && screenshot.template.name !== "app-screenshot"
      const params = screenshot.template
        .params as AppScreenshotTemplate["params"]
      setLocalTitle(params.title.text as string)
    }
  }, [screenshot?.id]) // Only reset when screenshot ID changes

  // Update store when debounced value changes
  useEffect(() => {
    if (
      screenshot &&
      // screenshot.template.name === "app-screenshot" &&
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

  // Memoize params to avoid recalculating
  const params = useMemo(() => {
    if (!screenshot)
      // || screenshot.template.name !== "app-screenshot"
      return null
    return screenshot.template.params as AppScreenshotTemplate["params"]
  }, [screenshot])

  if (
    !screenshot ||
    // screenshot.template.name !== "app-screenshot" ||
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
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <MixerHorizontalIcon className="h-3 w-3" />
                  </Button>
                }
              >
                <TextSettings
                  fontFamily={params.title.fontFamily as FontFamily}
                  fontSize={params.title.fontSize as number}
                  fontWeight={params.title.fontWeight as FontWeight}
                  color={params.title.color as string}
                  onChangeFontFamily={(fontFamily) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        text: localTitle, // Use current local state
                        fontFamily,
                      },
                    })
                  }
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
          {screenshot.template.name === "app-screenshot" && (screenshot.template as AppScreenshotTemplate).params.device === "apple" && (
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
                    url={params.logo?.url}
                  />
                </div>
                <ResponsivePopover
                  title="Logo Settings"
                  description="Customize the logo size."
                  trigger={
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <MixerHorizontalIcon className="h-3 w-3" />
                    </Button>
                  }
                >
                  <ImageSettings
                    width={params.logo?.width ?? 96}
                    height={params.logo?.height ?? 96}
                    onChangeWidth={(width) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...params.logo,
                          width: width ?? 96,
                        },
                      })
                    }
                    onChangeHeight={(height) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...params.logo,
                          height: height ?? 96,
                        },
                      })
                    }
                  />
                </ResponsivePopover>
              </div>
            </div>
          )}

          {/* Screenshot Input */}
          <div className="space-y-2">
            <Label htmlFor={`screenshot-${screenshotId}`} className="text-sm">
              Screenshot
            </Label>
            <div className="flex space-x-2 overflow-hidden">
              <div className="min-w-0 flex-1">
                <ImageSelector
                  id={`screenshot-${screenshotId}`}
                  onChange={(v) =>
                    updateTemplateParams(screenshotId, {
                      screenshot: {
                        ...(params.screenshot ?? {}),
                        url: v ?? "",
                      },
                    })
                  }
                  url={params.screenshot?.url}
                />
              </div>
              <ResponsivePopover
                title="Screenshot Settings"
                description="Customize the screenshot size."
                trigger={
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <MixerHorizontalIcon className="h-3 w-3" />
                  </Button>
                }
              >
                <ImageSettings
                  width={params.screenshot?.width ?? 1000}
                  height={params.screenshot?.height ?? 1000}
                  onChangeWidth={(width) =>
                    updateTemplateParams(screenshotId, {
                      screenshot: {
                        ...params.screenshot,
                        width: width ?? 1000,
                      },
                    })
                  }
                  onChangeHeight={(height) =>
                    updateTemplateParams(screenshotId, {
                      screenshot: {
                        ...params.screenshot,
                        height: height ?? 1000,
                      },
                    })
                  }
                />
              </ResponsivePopover>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
