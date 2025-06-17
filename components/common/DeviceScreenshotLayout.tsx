

import { absoluteUrl } from "@/lib/url"
import Image from "next/image"
import React from "react"

interface DeviceScreenshotLayoutProps {
  deviceFrameSrc: string
  screenshotUrl: string
  screenshotWidth: number
  screenshotHeight: number
  screenshotTop: number
  screenshotLeft: number
  screenshotBorderRadius: number
  deviceFrameWidth?: number
  deviceFrameHeight?: number
  children?: React.ReactNode
}

export function DeviceScreenshotLayout({
  deviceFrameSrc,
  screenshotUrl,
  screenshotWidth,
  screenshotHeight,
  screenshotTop,
  screenshotLeft,
  screenshotBorderRadius,
  deviceFrameWidth,
  deviceFrameHeight,
  children,
}: DeviceScreenshotLayoutProps) {
  return (
    <div
      style={{
        width: deviceFrameWidth || screenshotWidth,
        height: deviceFrameHeight || screenshotHeight,
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Device frame */}
      <Image
        src={absoluteUrl(deviceFrameSrc)}
        alt="Device Frame"
        fill
        style={{
          position: "relative",
          objectFit: "contain",
          zIndex: 4,
        }}
      />
      {/* User screenshot */}
      <Image
        src={screenshotUrl}
        alt="App Screenshot"
        width={screenshotWidth}
        height={screenshotHeight}
        style={{
          position: "absolute",
          top: screenshotTop,
          left: screenshotLeft,
          objectFit: "cover",
          zIndex: 1,
          borderTopLeftRadius: screenshotBorderRadius,
          borderTopRightRadius: screenshotBorderRadius,
        }}
      />
      {children}
    </div>
  )
}

