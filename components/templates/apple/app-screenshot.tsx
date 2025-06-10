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
  const screenshotWidth = template.canvas.width * 0.85
  const screenshotHeight = screenshotWidth * 2.2

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
          justifyContent: "flex-end",
          bottom: template.params.bottomPadding,
        }}
      >
        <p
          style={{
            fontFamily: template.params.title.fontFamily,
            fontWeight: template.params.title.fontWeight,
            fontSize: `${template.params.title.fontSize}px`,
            color: template.params.title.color,
            marginLeft: 100,
            marginRight: 100,
            lineHeight: 1.2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <img
            src={template.params.logo.url}
            alt="Logo"
            style={{
              width: template.params.logo.width,
              height: template.params.logo.height,
              position: "relative",
            }}
          />
          {template.params.title.text}
        </p>
      </div>
      <div
        style={{
          width: screenshotWidth + 135,
          height: screenshotHeight + 120,
          display: "flex",
          bottom: template.params.bottomPadding,
          overflow: "hidden",
        }}
      >
        {/* Device frame placeholder (replace with your SVG/PNG) */}
        <img
          src={absoluteUrl("/mocks/iphone-frame.svg")}
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
            top: 90,
            left: 70,
            right: 20,
            width: screenshotWidth,
            height: screenshotHeight,
            objectFit: "cover",
            zIndex: 1,
            borderRadius: 150,
          }}
        />
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
