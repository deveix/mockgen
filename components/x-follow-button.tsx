"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"

interface XFollowButtonProps {
  username: string
  size?: "large" | "medium" | "small"
  className?: string
}

export function XFollowButton({
  username,
  size = "medium",
  className = "",
}: XFollowButtonProps) {
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  }

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-4 h-4",
    large: "w-5 h-5",
  }

  return (
    <Link
      href={`https://twitter.com/intent/follow?screen_name=${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-black font-medium text-white no-underline transition-colors duration-200 hover:bg-gray-800",
        "dark:bg-white dark:text-black dark:hover:bg-gray-200",
        sizeClasses[size],
        className
      )}
    >
      {/* X Logo SVG */}
      <svg
        className={iconSizes[size]}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Follow @{username}
    </Link>
  )
}

// Extend window object to include twttr
declare global {
  interface Window {
    twttr: any
  }
}
