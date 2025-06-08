import { Skeleton } from "../skeleton"

export function Basic() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center">
      <Skeleton className="h-4 w-4 rounded-full md:h-8 md:w-8" />
      <Skeleton className="mt-2 h-3 w-1/2 md:mt-3 md:h-4" />
      <Skeleton className="mt-1 h-2 w-3/4 md:mt-2 md:h-3" />
    </div>
  )
}

export function Notice() {
  return (
    <div className="flex aspect-video h-full w-full items-center justify-center space-x-2 md:space-x-4">
      <Skeleton className="h-6 w-6 shrink-0 rounded-md md:h-10 md:w-10" />
      <div className="w-1/4">
        <Skeleton className="h-2 w-full md:h-3" />
        <Skeleton className="mt-1 h-1 w-full md:mt-2 md:h-2" />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center space-y-1">
      <Skeleton className="min-h-1 w-1/6 md:min-h-2" />
      <Skeleton className="min-h-2 w-1/2 md:min-h-3" />
      <Skeleton className="min-h-8 w-3/4 md:h-16" />
    </div>
  )
}

export function ImageRight() {
  return (
    <div className="h-full w-full">
      <Skeleton className="mt-2 h-3 w-3 rounded-full" />

      <div className="flex aspect-video h-full w-full justify-center space-x-2 md:space-x-4">
        <div className="flex h-full w-1/2 flex-col space-y-2 pt-2 md:pt-4">
          <Skeleton className="h-1 w-1/3 md:h-2" />
          <Skeleton className="h-2 w-full md:h-4" />
        </div>

        <Skeleton className="flex h-2/3 w-1/2" />
      </div>
    </div>
  )
}

export function Logos() {
  return (
    <div className="flex aspect-video h-full w-full flex-col items-center justify-center space-y-1 md:space-y-2">
      <Skeleton className="h-1 w-1/6 md:h-2" />
      <Skeleton className="h-2 w-1/2 md:h-4" />
      <div className="flex space-x-2">
        <Skeleton className="flex h-5 w-5 items-center justify-center md:h-8 md:w-8" />
        <Skeleton className="flex h-5 w-5 items-center justify-center md:h-8 md:w-8" />
        <Skeleton className="flex h-5 w-5 items-center justify-center md:h-8 md:w-8" />
      </div>
    </div>
  )
}
