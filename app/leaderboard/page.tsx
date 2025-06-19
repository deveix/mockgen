

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function MadeByMockGenPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          Made by MockGen
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Discover top apps made with MockGen! Want to see your app here? Submit
          below.
        </p>
        <Separator />
      </div>
      <div className="mb-8 flex flex-col items-center gap-8">
        {/* App Store Listing Style Card */}
        <div className="flex w-full max-w-2xl flex-col gap-4 rounded-xl bg-white p-6">
          <div className="flex items-center gap-4">
            {/* App Icon */}
            <a
              href="https://getqrosh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="size-16 shrink-0 overflow-hidden rounded-2xl bg-muted/20 shadow-sm"
            >
              <img
                src="/examples/logo.png"
                alt="Qrosh app icon"
                width={64}
                height={64}
                className="object-cover"
              />
            </a>
            {/* App Info */}
            <div className="flex min-w-0 grow flex-col">
              <a
                href="https://getqrosh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-xl font-bold leading-tight"
              >
                Qrosh - Talk your expenses
              </a>
              <span className="truncate text-sm text-muted-foreground">
                Track spending by voice or cam
              </span>
              <span className="mt-1 truncate text-xs text-muted-foreground">
                Ahmed Kasem
              </span>
            </div>
            {/* Free Badge */}
            <div className="ml-auto flex flex-col items-end">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                Free
              </span>
            </div>
          </div>
          {/* Screenshots Row */}
          <div className="mt-2 flex gap-3 pl-20">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="relative h-[400px] w-[200px] overflow-hidden rounded-lg bg-muted/10"
              >
                <img
                  src={`/examples/${num}.png`}
                  alt={`Qrosh screenshot ${num}`}
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex justify-center">
        <div className="flex w-full max-w-md flex-col items-center rounded-2xl p-8">
          <h2 className="mb-2 text-2xl font-semibold">Submit Your App</h2>
          <p className="mb-4 text-center text-muted-foreground">
            Want your app featured here? Send us your app and screenshots!
            Contact me at{" "}
            <a
              className="font-bold text-primary"
              href="mailto:aykasem001@gmail.com"
            >
              aykasem001@gmail.com
            </a>
          </p>
          <Button
            asChild
            size="lg"
            className="px-8 py-3 text-base font-semibold"
          >
            <a
              href="mailto:aykasem001@gmail.com?subject=Made%20by%20MockGen%20Submission"
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit Your App
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
