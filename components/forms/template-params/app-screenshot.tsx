
"use client"
import { FontFamily } from "@/lib/fonts"
import { FontWeight } from "@/lib/fonts"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AppScreenshotFormProps {
  screenshotId: number
}

export function AppScreenshotForm({ screenshotId }: AppScreenshotFormProps) {
  const screenshot = useMultiTemplateStore(
    useCallback(
      (state) => state.getScreenshotById(screenshotId),
      [screenshotId]
    )
  )
  const updateTemplateParams = useMultiTemplateStore(
    (state) => state.updateTemplateParams
  )

  const [localTitle, setLocalTitle] = useState("")
  const debouncedTitle = useDebouncedValue(localTitle, 300)

  useEffect(() => {
    if (screenshot) {
      const params = screenshot.template.params as AppScreenshotTemplate["params"]
      setLocalTitle(params.title.text as string)
    }
  }, [screenshot?.id, screenshot])

  useEffect(() => {
    if (screenshot && debouncedTitle !== "") {
      const params = screenshot.template.params as AppScreenshotTemplate["params"]
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
    if (!screenshot) return null
    return screenshot.template.params as AppScreenshotTemplate["params"]
  }, [screenshot])

  if (!screenshot || !params) {
    return null
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Template Settings</CardTitle>
        <CardDescription className="text-xs">
          Customize title, screenshot, logo, and device for this template.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Device Selection */}
          <div className="space-y-2">
            <Label htmlFor={`device-${screenshotId}`} className="text-sm">
              Device
            </Label>
            <RadioGroup
              id={`device-${screenshotId}`}
              value={params.device}
              onValueChange={(value: "apple" | "android") =>
                updateTemplateParams(screenshotId, {
                  device: value,
                })
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="apple" id={`apple-${screenshotId}`} />
                <Label htmlFor={`apple-${screenshotId}`}>Apple</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="android" id={`android-${screenshotId}`} />
                <Label htmlFor={`android-${screenshotId}`}>Android</Label>
              </div>
            </RadioGroup>
          </div>

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
                        fontSize: fontSize.toString(),
                      },
                    })
                  }
                  onChangeFontWeight={(fontWeight) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        text: localTitle, // Use current local state
                        fontWeight: fontWeight.toString(),
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

          {/* Screenshot Input */}
          <div className="space-y-2">
            <Label htmlFor={`screenshot-${screenshotId}`} className="text-sm">
              Screenshot
            </Label>
            <ImageSelector
              id={`screenshot-${screenshotId}`}
              url={params.screenshot.url}
              onChange={(url) =>
                updateTemplateParams(screenshotId, {
                  screenshot: {
                    ...params.screenshot,
                    url: url ?? "",
                  },
                })
              }
            />
          </div>

          {/* Logo Input */}
          {params.device === "apple" && (
            <div className="space-y-2">
              <Label htmlFor={`logo-${screenshotId}`} className="text-sm">
                Logo
              </Label>
              <div className="flex space-x-2 overflow-hidden">
                <div className="min-w-0 flex-1">
                  <ImageSelector
                    id={`logo-${screenshotId}`}
                    url={params.logo?.url}
                    onChange={(v) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...(params.logo ?? {}),
                          url: v ?? "",
                        },
                      })
                    }
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
                          width: width,
                        },
                      })
                    }
                    onChangeHeight={(height) =>
                      updateTemplateParams(screenshotId, {
                        logo: {
                          ...params.logo,
                          height: height,
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

export const Form = AppScreenshotForm
