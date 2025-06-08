import { Skeleton } from "../skeleton"

export function Basic() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center space-y-1">
      <Skeleton className="min-h-1 w-1/6 md:min-h-2" />
      <Skeleton className="min-h-2 w-1/2 md:min-h-3" />
    </div>
  )
}

export function Minimalist() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center">
      <Skeleton className="min-h-2 w-1/2 md:min-h-3" />
    </div>
  )
}

export function Logo() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center">
      <Skeleton className="h-4 w-4 rounded-full md:h-8 md:w-8" />
      <Skeleton className="mt-1 h-2 w-3/4 md:mt-2 md:h-3" />
    </div>
  )
}
