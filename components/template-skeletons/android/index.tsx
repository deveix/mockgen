import { Skeleton } from "../skeleton"

export function AppScreenshot() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center">
      <Skeleton className="h-4 w-4 rounded-full md:h-8 md:w-8" />
      <Skeleton className="mt-2 h-3 w-1/4 md:mt-3 md:h-4" />
      <Skeleton className="mt-2 h-12 w-1/6 md:mt-2 md:h-8" />
    </div>
  )
}
