"use client"

import { useState } from "react"
import Image from "next/image"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { XFollowButton } from "@/components/x-follow-button"

export function MobileNav() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-4 text-left">
          <SheetTitle>
            <img
              src="/logo.svg"
              alt="logo-mockgen"
              width={32}
              height={32}
              className="block dark:hidden"
            />
            <img
              src="/logo_dark.svg"
              alt="logo-mockgen-dark"
              width={32}
              height={32}
              className="hidden dark:block"
            />
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex justify-start">
            <XFollowButton username="aykasem001" size="medium" />
          </div>

          {/* <Button
            onClick={() => setSheetOpen(false)}
            variant="link"
            className="justify-start px-0"
            asChild
          >
            <Link href="mailto:aykasem001@gmail.com">Support</Link>
          </Button> */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
