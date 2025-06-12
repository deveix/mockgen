import { cn } from "@/lib/utils"
import { AppleLogo, GooglePlayLogo } from "@/components/icons"

interface PlatformIconsProps {
  size?: "small" | "medium" | "large"
  className?: string
  showLabels?: boolean
}

export function PlatformIcons({
  size = "medium",
  className = "",
  showLabels = false,
}: PlatformIconsProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  const containerClasses = {
    small: "gap-3",
    medium: "gap-4",
    large: "gap-6",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        containerClasses[size],
        className
      )}
    >
      {/* Apple App Store */}
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "text-gray-700 transition-colors dark:text-gray-300",
            sizeClasses[size]
          )}
        >
          <AppleLogo />
        </div>
        {showLabels && (
          <span className="text-xs font-medium text-muted-foreground">
            App Store
          </span>
        )}
      </div>

      {/* Google Play Store */}
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "text-gray-700 transition-colors dark:text-gray-300",
            sizeClasses[size]
          )}
        >
          <GooglePlayLogo />
        </div>
        {showLabels && (
          <span className="text-xs font-medium text-muted-foreground">
            Google Play
          </span>
        )}
      </div>
    </div>
  )
}
