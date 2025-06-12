"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MultiTemplateStoreProvider,
  useMultiTemplateStore,
} from "@/providers/multi-template-store-provider"
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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
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
import { DraggableScreenshotCard } from "@/components/draggable-screenshot-card"
import { GlobalBackgroundForm } from "@/components/global-background-form"
import { MultiUpload } from "@/components/multi-upload"
import { PlatformIcons } from "@/components/platform-icons"
import SaveAllImagesButton from "@/components/save-all-images-button"

function MultiTemplateContent() {
  const { screenshots, reorderScreenshots, reapplyTemplatesByOrder } =
    useMultiTemplateStore((state) => state)

  // Only select the screenshot IDs to minimize re-renders
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

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <MultiUpload />

      {screenshotIds.length > 0 && (
        <>
          <Separator />

          {/* Save All Button */}
          <div className="flex justify-center">
            <SaveAllImagesButton />
          </div>

          {/* Two-column layout: Global Background Form + Screenshots */}
          <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-[350px_1fr]">
            {/* Left: Global Background Form */}
            <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
              <GlobalBackgroundForm />
            </div>

            {/* Right: Screenshots Grid */}
            <div className="space-y-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={screenshotIds}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {screenshotIds.map((screenshotId) => (
                      <DraggableScreenshotCard
                        key={screenshotId}
                        screenshotId={screenshotId}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </>
      )}

      {/* Help Section */}
      {screenshots.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Create Professional App Store Screenshots</CardTitle>
            <CardDescription>
              Transform your mobile app screenshots into stunning App Store and
              Google Play Store assets with our professional templates. Designed
              for maximum conversion and optimized for both iOS and Android
              platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>
                  Upload multiple iOS and Android app screenshots simultaneously
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>
                  Professional App Store templates optimized for iOS App Store
                  and Google Play Store
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>
                  Customize titles, colors, and device frames for iPhone and
                  Android devices
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>
                  Download high-quality PNG app store assets as ZIP file
                </span>
              </div>
            </div>

            {/* <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <InfoCircledIcon className="h-4 w-4" />
              <p className="text-sm">
                <Button className="h-auto p-0 underline" variant="link" asChild>
                  <Link href="https://mockgen.click/guides/open-graph-meta-tags">
                    Learn more
                  </Link>
                </Button>{" "}
                about creating engaging app store assets.
              </p>
            </div> */}
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
            App Store Screenshot Generator for iOS & Android
          </h1>
          <p className="text-lg text-muted-foreground">
            Create stunning App Store and Google Play Store screenshots with
            professional templates. Generate multiple promotional designs
            instantly for iOS and Android apps with zero design skills required.
          </p>

          {/* Platform Icons */}
          {/* <div className="py-4">
            <PlatformIcons size="large" showLabels={true} />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="rounded bg-muted px-2 py-1">
              App Store Optimization
            </span>
            <span className="rounded bg-muted px-2 py-1">iOS Screenshots</span>
            <span className="rounded bg-muted px-2 py-1">
              Android Screenshots
            </span>
            <span className="rounded bg-muted px-2 py-1">Device Mockups</span>
          </div> */}
        </div>

        {/* Examples Showcase Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-semibold">
              Examples of Generated Screenshots
            </h2>
            <p className="text-muted-foreground">
              See what professional App Store screenshots look like when created
              with our tool
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="group relative">
                <div className="relative aspect-[9/16] overflow-hidden rounded-lg border bg-muted/30">
                  <Image
                    src={`/examples/${num}.png`}
                    alt={`App Store screenshot example ${num}`}
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm text-muted-foreground">
                    Template {num}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Professional templates designed for maximum conversion on App
              Store and Google Play Store
            </p>
          </div>
        </div>

        <Separator />

        <MultiTemplateContent />
      </div>
    </div>
  )
}
