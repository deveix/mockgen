import { Metadata } from "next"

// SEO Constants
export const SEO_CONFIG = {
  siteName: "MockGen",
  siteUrl: "https://mockgen.click",
  defaultTitle: "MockGen - App Store Screenshot Generator",
  defaultDescription:
    "Create stunning App Store & Google Play screenshots instantly. Professional iOS & Android templates with zero design skills required.",
  defaultImage: "/og.png",
  twitterHandle: "@aykasem001",
  defaultKeywords: [
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
}

// Generate page metadata
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  path = "",
  noIndex = false,
}: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const pageTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle

  const pageDescription = description || SEO_CONFIG.defaultDescription
  const pageImage = image || SEO_CONFIG.defaultImage
  const pageUrl = `${SEO_CONFIG.siteUrl}${path}`
  const allKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords]

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: SEO_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

// Generate structured data for different page types
export function generateStructuredData(
  type: "WebApplication" | "Article" | "Organization",
  data: any
) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
  }

  switch (type) {
    case "WebApplication":
      return {
        ...baseStructuredData,
        name: data.name || SEO_CONFIG.siteName,
        description: data.description || SEO_CONFIG.defaultDescription,
        url: data.url || SEO_CONFIG.siteUrl,
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.siteUrl,
        },
        featureList: data.features || [
          "App Store Screenshot Generator",
          "Google Play Store Screenshots",
          "iOS and Android Templates",
          "Device Mockups",
          "Professional App Store Assets",
          "Instant Download",
          "Zero Design Skills Required",
        ],
      }

    case "Organization":
      return {
        ...baseStructuredData,
        name: data.name || SEO_CONFIG.siteName,
        url: data.url || SEO_CONFIG.siteUrl,
        logo: data.logo || `${SEO_CONFIG.siteUrl}/logo.png`,
        description: data.description || SEO_CONFIG.defaultDescription,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: data.email || "aykasem001@gmail.com",
        },
      }

    case "Article":
      return {
        ...baseStructuredData,
        headline: data.title,
        description: data.description,
        image: data.image || SEO_CONFIG.defaultImage,
        author: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.siteUrl,
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
      }

    default:
      return baseStructuredData
  }
}

// Generate FAQ structured data
export function generateFAQStructuredData(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
