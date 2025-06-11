"use client"

import { useMemo } from "react"
import { useMultiTemplateStore } from "@/providers/multi-template-store-provider"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

import { AppScreenshotTemplate } from "@/lib/templates/apple/app-screenshot"
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
  const { screenshots, updateTemplateParams } = useMultiTemplateStore(
    (state) => state
  )

  const screenshot = useMemo(
    () => screenshots.find((s) => s.id === screenshotId),
    [screenshots, screenshotId]
  )

  if (!screenshot) return null

  const params = screenshot.template.params as AppScreenshotTemplate["params"]

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
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor={`title-${screenshotId}`} className="text-sm">
              Title
            </Label>
            <div className="flex space-x-2">
              <Input
                id={`title-${screenshotId}`}
                value={params.title.text}
                className="text-sm"
                placeholder="Enter title text..."
                onChange={(e) =>
                  updateTemplateParams(screenshotId, {
                    title: {
                      ...params.title,
                      text: e.target.value,
                    },
                  })
                }
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
                  fontFamily={params.title.fontFamily}
                  fontSize={params.title.fontSize}
                  fontWeight={params.title.fontWeight}
                  color={params.title.color}
                  onChangeFontFamily={(fontFamily) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        fontFamily,
                      },
                    })
                  }
                  onChangeFontSize={(fontSize) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        fontSize,
                      },
                    })
                  }
                  onChangeFontWeight={(fontWeight) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        fontWeight,
                      },
                    })
                  }
                  onChangeColor={(color) =>
                    updateTemplateParams(screenshotId, {
                      title: {
                        ...params.title,
                        color,
                      },
                    })
                  }
                />
              </ResponsivePopover>
            </div>
          </div>
          {/* Logo Input */}
          {screenshot.template.name === "apple:app-screenshot" && (
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
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <MixerHorizontalIcon className="h-3 w-3" />
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
