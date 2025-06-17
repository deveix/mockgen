import { Skeleton } from "../skeleton"

export function AppScreenshot() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-center">
      <Skeleton className="mt-2 h-3 w-1/4 md:mt-3 md:h-4" />
      <Skeleton className="mt-2 h-12 w-1/6 md:mt-2 md:h-8" />
    </div>
  )
}

export function HangedUp() {
  return (
    <div className="flex aspect-video size-full flex-col items-center justify-center">
      <Skeleton className="mt-2 h-12 w-1/6 md:mt-2 md:h-8" />
      <Skeleton className="mt-2 h-3 w-1/4 md:mt-3 md:h-4" />
    </div>
  )
}
