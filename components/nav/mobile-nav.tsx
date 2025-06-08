"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-4 text-left">
          <SheetTitle>
            <Image
              src="/logo.svg"
              alt="imgsrc"
              width={32}
              height={32}
              className="block dark:hidden"
            />
            <Image
              src="/logo_dark.svg"
              alt="imgsrc"
              width={32}
              height={32}
              className="hidden dark:block"
            />
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col space-y-4">
          <Button
            onClick={() => setSheetOpen(false)}
            variant="link"
            className="justify-start px-0"
            asChild
          >
            <Link href="mailto:support@imgsrc.io" target="_blank">
              Support
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
