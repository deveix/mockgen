import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageSettingsProps {
  width: number
  height: number
  onChangeWidth: (width: number) => void
  onChangeHeight: (height: number) => void
  className?: string
}

export function ImageSettings({
  width,
  height,
  onChangeWidth,
  onChangeHeight,
  className,
}: ImageSettingsProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            type="number"
            className="col-span-2 h-8"
            value={width.toString()}
            onChange={(e) => onChangeWidth(parseInt(e.currentTarget.value))}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            type="number"
            className="col-span-2 h-8"
            value={height.toString()}
            onChange={(e) => onChangeHeight(parseInt(e.currentTarget.value))}
          />
        </div>
      </div>
    </div>
  )
}
