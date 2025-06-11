import Head from "next/head"
import { NextSeo, NextSeoProps } from "next-seo"

import { SEO_CONFIG } from "@/lib/seo"

interface SEOProps extends Partial<NextSeoProps> {
  structuredData?: object[]
  breadcrumbs?: { name: string; url: string }[]
}

export function SEO({
  title = SEO_CONFIG.defaultTitle,
  description = SEO_CONFIG.defaultDescription,
  openGraph,
  twitter,
  structuredData = [],
  breadcrumbs = [],
  ...props
}: SEOProps) {
  const seoTitle = title?.includes(SEO_CONFIG.siteName)
    ? title
    : `${title} | ${SEO_CONFIG.siteName}`

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={description}
        openGraph={{
          title: seoTitle,
          description,
          url: SEO_CONFIG.siteUrl,
          siteName: SEO_CONFIG.siteName,
          images: [
            {
              url: SEO_CONFIG.defaultImage,
              width: 1200,
              height: 630,
              alt: seoTitle,
            },
          ],
          locale: "en_US",
          type: "website",
          ...openGraph,
        }}
        twitter={{
          handle: SEO_CONFIG.twitterHandle,
          site: SEO_CONFIG.twitterHandle,
          cardType: "summary_large_image",
          ...twitter,
        }}
        {...props}
      />

      {/* Structured Data */}
      {structuredData.length > 0 && (
        <Head>
          {structuredData.map((data, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
          ))}
        </Head>
      )}

      {/* Breadcrumbs structured data */}
      {breadcrumbs.length > 0 && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: item.name,
                  item: item.url,
                })),
              }),
            }}
          />
        </Head>
      )}
    </>
  )
}

// Preset configurations for common page types
export const SEOPresets = {
  home: {
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
  },

  generator: {
    title: "App Store Screenshot Generator - Create Professional Screenshots",
    description:
      "Generate stunning app store screenshots for iOS and Android apps. Professional templates, device mockups, and instant downloads.",
  },

  templates: {
    title: "App Store Screenshot Templates - iOS & Android",
    description:
      "Professional app store screenshot templates for iOS and Android. Beautiful designs optimized for maximum conversion rates.",
  },
}
