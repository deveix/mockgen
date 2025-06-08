import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { AppScreenshotTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export function Template(props: {
  template: AppScreenshotTemplate
  renderWatermark: boolean
}) {
  const { template, renderWatermark } = props
  const screenshotWidth = template.canvas.width - 40 // 20px left + 20px right
  const screenshotHeight = template.canvas.height - 80 // 40px top + 40px bottom
  return (
    <div
      style={{
        width: template.canvas.width,
        height: template.canvas.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: toBackgroundShorthand(template.background),
        position: "relative",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: template.params.title.fontSize,
          fontWeight: template.params.title.fontWeight,
          marginBottom: 32,
          color: template.params.title.color,
          fontFamily: template.params.title.fontFamily,
          display: "flex",
        }}
      >
        {template.params.title.text}
      </div>
      <div
        style={{
          position: "relative",
          width: 350,
          height: 700,
          display: "flex",
        }}
      >
        {/* Device frame placeholder (replace with your SVG/PNG) */}
        <img
          src={absoluteUrl("/iphone-frame.svg")}
          alt="Device Frame"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />
        {/* User screenshot */}
        <img
          src={template.params.screenshot.url}
          alt="App Screenshot"
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            right: 20,
            bottom: 40,
            width: screenshotWidth,
            height: screenshotHeight,
            objectFit: "cover",
            borderRadius: 24,
            zIndex: 2,
          }}
        />
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
