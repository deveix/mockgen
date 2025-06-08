"use client"

import { useTemplateStore } from "@/providers/template-store-provider"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CopyApiRequestButton() {
  const template = useTemplateStore((state) => state)

  async function handleCopy({ copyAs }: { copyAs: "json" | "curl" }) {
    const requestBody = {
      name: template.name,
      params: template.params,
      background: template.background,
      canvas: template.canvas,
    }

    if (copyAs === "json") {
      await navigator.clipboard.writeText(JSON.stringify(requestBody, null, 2))
    } else if (copyAs === "curl") {
      const curl = `curl -H "Content-Type: application/json" \\
  ${process.env.NEXT_PUBLIC_API_URL}/v1/images \\
  -d '${JSON.stringify(requestBody, null, 2)}' > image.png`

      await navigator.clipboard.writeText(curl)
    }

    toast.success("Copied to clipboard")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          Copy Request
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => handleCopy({ copyAs: "json" })}>
          Copy as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCopy({ copyAs: "curl" })}>
          Copy as curl
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
