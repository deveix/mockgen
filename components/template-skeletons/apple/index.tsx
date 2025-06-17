import { Skeleton } from "../skeleton"

export function AppScreenshot() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-center">
      <Skeleton className="size-4 rounded-full md:size-8" />
      <Skeleton className="mt-2 h-3 w-1/4 md:mt-3 md:h-4" />
      <Skeleton className="mt-2 h-12 w-1/6 md:mt-2 md:h-8" />
    </div>
  )
}

export function TiltedLeft() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-between">
      <Skeleton className="h-3 w-1/4 md:mt-3 md:h-4" />
      <Skeleton className="w-1/6 flex-1 rotate-12 md:mt-2" />
    </div>
  )
}

export function TiltedRight() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-between">
      <Skeleton className="h-3 w-1/4 md:mt-3 md:h-4" />
      <Skeleton className="w-1/6 flex-1 -rotate-12 md:mt-2" />
    </div>
  )
}

export function HangedUp() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-between">
      <Skeleton className="w-1/6 flex-1 rotate-180 md:mt-2" />
      <Skeleton className="h-3 w-1/4 md:mt-3 md:h-4" />
    </div>
  )
}

export function Rotated() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-between">
      <Skeleton className="h-3 w-1/4 md:mt-3 md:h-4" />
      <Skeleton className="w-1/6 flex-1 rotate-45 md:mt-2" />
    </div>
  )
}
