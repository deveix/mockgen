import { useRef, useState } from "react"
import { Cross2Icon, FileIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ImageSelector({
  id,
  onChange,
  initialFileName,
}: {
  id: string
  onChange: (v: string | undefined) => void
  initialFileName?: string
}) {
  const [file, setFile] = useState<File | undefined>(
    initialFileName ? new File([], initialFileName) : undefined
  )
  const inputElement = useRef<HTMLInputElement>(null)

  function handleRemove() {
    setFile(undefined)
    onChange(undefined)
  }

  function handleSelect() {
    inputElement.current?.click()
  }

  return (
    <>
      <input
        id={id}
        ref={inputElement}
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg, .svg"
        multiple={false}
        onChange={(e) => {
          if (!e.target.files) return

          const file = e.target.files[0]
          if (!file) return

          const reader = new FileReader()

          reader.addEventListener(
            "load",
            () => {
              setFile(file)
              onChange(reader.result as string)

              inputElement.current!.value = ""
            },
            false
          )

          reader.readAsDataURL(file)
        }}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="justify-start space-x-1 overflow-hidden"
          >
            <span>{file?.name ? "File:" : "Choose Image:"}</span>
            <span className="overflow-hidden overflow-ellipsis font-mono font-normal">
              {file?.name || "(No file chosen)"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            width: "var(--radix-dropdown-menu-trigger-width)",
          }}
        >
          <DropdownMenuItem onSelect={handleSelect}>
            <FileIcon className="mr-1 h-4 w-4" />
            <span>Select a file</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleRemove}>
            <Cross2Icon className="mr-1 h-4 w-4" />
            <span>Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
