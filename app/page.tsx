"use client"

import Link from "next/link"
import {
  MultiTemplateStoreProvider,
  useMultiTemplateStore,
} from "@/providers/multi-template-store-provider"
import { InfoCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MultiUpload } from "@/components/multi-upload"
import SaveAllImagesButton from "@/components/save-all-images-button"
import ScreenshotPreviewRenderer from "@/components/screenshot-preview-renderer"
import ScreenshotTemplateSelector from "@/components/screenshot-template-selector"

function MultiTemplateContent() {
  const screenshots = useMultiTemplateStore((state) => state.screenshots)

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <MultiUpload />

      {screenshots.length > 0 && (
        <>
          <Separator />

          {/* Save All Button */}
          <div className="flex justify-center">
            <SaveAllImagesButton />
          </div>

          {/* Screenshots Flex Wrap Grid */}
          <div className="space-y-4">
            <h2 className="text-center text-2xl font-bold">
              Your Screenshot Templates
            </h2>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="w-full">
                  <Card className="h-full overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                          {screenshot.screenshot && (
                            <img
                              src={URL.createObjectURL(screenshot.screenshot)}
                              alt="Screenshot preview"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <h3 className="truncate font-semibold">
                            {screenshot.screenshot?.name ||
                              `Screenshot ${screenshot.id}`}
                          </h3>
                          <p className="truncate text-xs text-muted-foreground">
                            {screenshot.template.name}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 overflow-hidden">
                      {/* Template Selector */}
                      <div className="space-y-3 overflow-hidden">
                        <ScreenshotTemplateSelector
                          screenshotId={screenshot.id}
                        />
                      </div>

                      {/* Preview */}
                      <div className="overflow-hidden rounded-lg border bg-muted/20 p-2">
                        <ScreenshotPreviewRenderer
                          screenshotId={screenshot.id}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Help Section */}
      {screenshots.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Upload up to 6 screenshots to create beautiful templates for your
              app store assets.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Upload multiple screenshots at once</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Choose different templates for each screenshot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Customize titles, colors, and layouts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Download all images as a ZIP file</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <InfoCircledIcon className="h-4 w-4" />
              <p className="text-sm">
                <Button className="h-auto p-0 underline" variant="link" asChild>
                  <Link href="https://imgsrc.io/guides/open-graph-meta-tags">
                    Learn more
                  </Link>
                </Button>{" "}
                about creating engaging app store assets.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Multi-Screenshot Template Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Create beautiful templates for all your screenshots at once
          </p>
        </div>

        <MultiTemplateContent />
      </div>
    </div>
  )
}
