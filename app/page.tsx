"use client"

import { useEffect, useMemo, useState } from "react"
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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"

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
import { AppleLogo, GooglePlayLogo } from "@/components/icons"
import { MultiUpload } from "@/components/multi-upload"
import SaveAllImagesButton from "@/components/save-all-images-button"

const GeneratorInstructions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Create Professional App Store Screenshots</CardTitle>
      <CardDescription>
        Transform your mobile app screenshots into stunning App Store and Google
        Play Store assets with our professional templates.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid gap-2 text-sm">
        {[
          "Upload multiple iOS and Android app screenshots simultaneously",
          "Professional templates optimized for iOS App Store and Google Play Store",
          "Customize titles, colors, and device frames",
          "Download high-quality PNG assets as a ZIP file",
        ].map((text) => (
          <div key={text} className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const ScreenshotEditor = ({
  selectedPlatform,
}: {
  selectedPlatform: "apple" | "android"
}) => {
  const { screenshots, reorderScreenshots, reapplyTemplatesByOrder } =
    useMultiTemplateStore((state) => state)
  const screenshotIds = useMemo(() => screenshots.map((s) => s.id), [
    screenshots,
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderScreenshots(Number(active.id), Number(over.id))
      reapplyTemplatesByOrder(selectedPlatform)
    }
  }

  return (
    <div className="space-y-6">
      <Separator />
      <div className="flex justify-center">
        <SaveAllImagesButton />
      </div>
      <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-[350px_1fr]">
        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <GlobalBackgroundForm />
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={screenshotIds} strategy={rectSortingStrategy}>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {screenshotIds.map((screenshotId) => (
                <DraggableScreenshotCard
                  key={screenshotId}
                  screenshotId={screenshotId}
                  platform={selectedPlatform}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

function MultiTemplateContent({
  selectedPlatform,
}: {
  selectedPlatform: "apple" | "android"
}) {
  const { screenshots, reapplyTemplatesByOrder } = useMultiTemplateStore(
    (state) => state
  )

  useEffect(() => {
    reapplyTemplatesByOrder(selectedPlatform)
  }, [selectedPlatform, reapplyTemplatesByOrder])

  return (
    <div className="space-y-6">
      <MultiUpload />
      {screenshots.length > 0 ? (
        <ScreenshotEditor selectedPlatform={selectedPlatform} />
      ) : (
        <GeneratorInstructions />
      )}
    </div>
  )
}

const ExampleImageCard = ({
  num,
  onClick,
}: {
  num: number
  onClick: () => void
}) => (
  <div className="group relative cursor-pointer" onClick={onClick}>
    <div className="relative aspect-[9/16] overflow-hidden rounded-lg border bg-muted/30">
      <img
        src={`/examples/${num}.png`}
        alt={`App Store screenshot example ${num}`}
        className="object-contain transition-transform group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
    </div>
  </div>
)

const ImagePreviewModal = ({
  src,
  onClose,
}: {
  src: string
  onClose: () => void
}) => (
  <div
    className="fixed inset-0 -top-10 z-50 flex items-center justify-center bg-black/70"
    onClick={onClose}
  >
    <div
      className="relative max-h-[90vh] max-w-[90vw] rounded-lg bg-white p-2 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute right-2 top-2 z-50 text-2xl font-bold text-gray-600 hover:text-black"
        onClick={onClose}
        aria-label="Close preview"
      >
        ×
      </button>
      <div className="relative h-[533px] w-[300px] sm:h-[640px] sm:w-[360px] md:h-[711px] md:w-[400px] lg:h-[568px] lg:w-[320px] xl:h-[640px] xl:w-[360px]">
        <img
          src={src}
          alt="Preview"
          className="rounded-lg object-contain"
          sizes="90vw"
        />
      </div>
    </div>
  </div>
)

const PlatformButton = ({
  platform,
  selectedPlatform,
  onClick,
  children,
}: {
  platform: "apple" | "android"
  selectedPlatform: "apple" | "android"
  onClick: () => void
  children: React.ReactNode
}) => {
  const isActive = selectedPlatform === platform
  return (
    <button
      className={`flex flex-col items-center rounded-lg border px-4 py-2 transition-colors ${isActive ? "border-primary bg-primary/10" : "border-muted bg-background hover:bg-muted"}`}
      onClick={onClick}
    >
      {children}
      <span
        className={`font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
      >
        {platform === "apple" ? "Apple" : "Android"}
      </span>
    </button>
  )
}

export default function Home() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { selectedPlatform, setSelectedPlatform } = useMultiTemplateStore(
    (state) => state
  )

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            App Store Screenshot Generator for iOS & Android
          </h1>
          <p className="text-lg text-muted-foreground">
            Create stunning App Store and Google Play Store screenshots with
            professional templates.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-semibold">
              Examples of Generated Screenshots
            </h2>
            <p className="text-muted-foreground">
              See what professional screenshots look like when created with our
              tool.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <ExampleImageCard
                key={num}
                num={num}
                onClick={() => setPreviewImage(`/examples/${num}.png`)}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Templates designed for maximum conversion on App Store and Google
            Play.
          </p>
        </div>

        <Separator />

        <div className="flex justify-center">
          <div className="flex gap-6">
            <PlatformButton
              platform="apple"
              selectedPlatform={selectedPlatform}
              onClick={() => setSelectedPlatform("apple")}
            >
              <AppleLogo className="mb-1 size-8" />
            </PlatformButton>
            <PlatformButton
              platform="android"
              selectedPlatform={selectedPlatform}
              onClick={() => setSelectedPlatform("android")}
            >
              <GooglePlayLogo className="mb-1 size-8" />
            </PlatformButton>
          </div>
        </div>

        <MultiTemplateContent selectedPlatform={selectedPlatform} />

        {previewImage && (
          <ImagePreviewModal
            src={previewImage}
            onClose={() => setPreviewImage(null)}
          />
        )}
      </div>
    </div>
  )
}