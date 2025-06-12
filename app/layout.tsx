import "./globals.css"

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { MultiTemplateStoreProvider } from "@/providers/multi-template-store-provider"
import { TemplateStoreProvider } from "@/providers/template-store-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileNav } from "@/components/nav/mobile-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { XFollowButton } from "@/components/x-follow-button"

export const metadata: Metadata = {
  metadataBase: new URL("https://mockgen.click"),
  title: {
    default:
      "MockGen - App Store Screenshot Generator | iOS & Android Screenshots",
    template: "%s | MockGen - App Store Screenshot Generator",
  },
  description:
    "Create stunning App Store & Google Play screenshots instantly. Professional iOS & Android templates with zero design skills required.",
  keywords: [
    "app store screenshots",
    "google play store screenshots",
    "ios screenshots",
    "android screenshots",
    "app store assets",
    "device mockups",
    "app store optimization",
    "ASO",
    "app marketing",
    "screenshot generator",
    "app store graphics",
    "mobile app screenshots",
    "app preview images",
    "ios app store",
    "google play store",
    "app store templates",
    "promotional graphics",
    "app marketing images",
    "screenshot maker",
    "app store tools",
  ],
  authors: [{ name: "Fady Abdelmalik", url: "https://mockgen.click" }],
  creator: "MockGen",
  publisher: "MockGen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "MockGen - Professional App Store Screenshot Generator",
    description:
      "Create stunning App Store & Google Play screenshots instantly. Professional iOS & Android templates with zero design skills required.",
    type: "website",
    url: "https://mockgen.click",
    siteName: "MockGen",
    images: [
      {
        url: "https://mockgen.click/og.png",
        width: 1200,
        height: 630,
        alt: "MockGen - Professional App Store Screenshot Generator for iOS and Android",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MockGen - App Store Screenshot Generator",
    description:
      "Create stunning App Store & Google Play screenshots instantly. Professional iOS & Android templates with zero design skills required.",
    images: ["https://mockgen.click/og.png"],
    creator: "@aykasem001",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  category: "Technology",
  alternates: {
    canonical: "https://mockgen.click",
  },
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MockGen",
  description:
    "Create stunning App Store & Google Play screenshots instantly. Professional iOS & Android templates with zero design skills required.",
  url: "https://mockgen.click",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "MockGen",
    url: "https://mockgen.click",
  },
  featureList: [
    "App Store Screenshot Generator",
    "Google Play Store Screenshots",
    "iOS and Android Templates",
    "Device Mockups",
    "Professional App Store Assets",
    "Instant Download",
    "Zero Design Skills Required",
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <div>
                <Link href="/">
                  <Image
                    className="block dark:hidden"
                    src="/logo.svg"
                    alt="MockGen Logo - App Store Screenshot Generator"
                    width={36}
                    height={36}
                  />
                </Link>

                <Link href="/">
                  <Image
                    className="hidden dark:block"
                    src="/logo_dark.svg"
                    alt="MockGen Logo - App Store Screenshot Generator"
                    width={36}
                    height={36}
                  />
                </Link>
              </div>
            </div>

            <div className="hidden space-x-2 sm:flex">
              <XFollowButton
                username="aykasem001"
                size="medium"
                className="flex items-center"
              />

              {/* <Button variant="link">
                <Link href="mailto:aykasem001@gmail.com">Support</Link>
              </Button> */}

              <ModeToggle />
            </div>

            {/* Mobile navigation */}
            <div className="flex space-x-2 sm:hidden">
              <ModeToggle />

              <MobileNav />
            </div>
          </nav>

          <main className="mx-auto min-h-[calc(100dvh-84px)] max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <MultiTemplateStoreProvider>
              <TemplateStoreProvider>{children}</TemplateStoreProvider>
            </MultiTemplateStoreProvider>
          </main>

          <Separator />

          <footer className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
              {/* Left section - Logo and Navigation */}
              <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:space-x-2">
                <div className="font-mono font-semibold">
                  <Link href="https://mockgen.click">.mockgen</Link>
                </div>

                <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
                  <Button variant="link" className="px-0 md:px-4" asChild>
                    <Link href="/">Home</Link>
                  </Button>

                  {/* <Button variant="link" className="px-0 md:px-4" asChild>
                    <Link href="mailto:aykasem001@gmail.com">Support</Link>
                  </Button> */}

                  <XFollowButton
                    username="aykasem001"
                    size="small"
                    className="md:inline-flex md:items-center"
                  />
                </div>
              </div>

              {/* Right section - Status indicator (Desktop only) */}
              <div className="hidden items-center gap-x-2 md:inline-flex">
                <svg
                  className="h-2 w-2 fill-green-400"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                <span className="font-mono text-sm font-medium">
                  Operational
                </span>
              </div>
            </div>
          </footer>
        </ThemeProvider>

        <Toaster />
        <SpeedInsights />
        <Analytics />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
      </body>
    </html>
  )
}
