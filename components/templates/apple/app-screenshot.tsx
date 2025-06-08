import { AppScreenshotTemplate } from "@/lib/templates/apple"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export function Template(props: {
  template: AppScreenshotTemplate
  renderWatermark: boolean
}) {
  const { template, renderWatermark } = props
  // 1:2 aspect ratio
  const screenshotWidth = template.canvas.width * 0.8
  const screenshotHeight = screenshotWidth * 2.1

  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        background: toBackgroundShorthand(template.background),
        position: "relative",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: template.params.title.fontSize,
          fontWeight: template.params.title.fontWeight,
          color: template.params.title.color,
          fontFamily: template.params.title.fontFamily,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bottom: template.params.bottomPadding + 50,
        }}
      >
        <img
          src={template.params.logo.url}
          alt="Logo"
          style={{
            width: template.params.logo.width,
            height: template.params.logo.height,
          }}
        />
        <p
          style={{
            fontFamily: template.params.title.fontFamily,
            fontWeight: template.params.title.fontWeight,
            fontSize: `${template.params.title.fontSize}px`,
            color: template.params.title.color,
            marginLeft: 100,
            marginRight: 100,
            lineHeight: 1.2,
          }}
        >
          {template.params.title.text}
        </p>
      </div>
      <div
        style={{
          width: screenshotWidth + 40,
          height: screenshotHeight + 120,
          display: "flex",
          bottom: template.params.bottomPadding,
          overflow: "hidden",
        }}
      >
        {/* Device frame placeholder (replace with your SVG/PNG) */}
        <img
          src={absoluteUrl("/iphone-frame.svg")}
          alt="Device Frame"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            zIndex: 4,
          }}
        />
        {/* User screenshot */}
        <img
          src={template.params.screenshot.url}
          alt="App Screenshot"
          style={{
            position: "absolute",
            top: 80,
            left: 20,
            right: 20,
            width: screenshotWidth,
            height: screenshotHeight,
            objectFit: "cover",
            zIndex: 1,
            borderRadius: 200,
          }}
        />
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
