import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { AppScreenshotTemplate } from "@/lib/templates/open-graph"
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
          bottom: -150,
        }}
      >
        <img
          src={template.params.logo.url}
          alt="Logo"
          style={{
            width: 100,
            height: 100,
          }}
        />
        <p
          style={{
            fontFamily: template.params.title.fontFamily,
            fontWeight: template.params.title.fontWeight,
            fontSize: `${template.params.title.fontSize}px`,
            color: template.params.title.color,
          }}
        >
          {template.params.title.text}
        </p>
      </div>
      <div
        style={{
          width: screenshotWidth,
          height: screenshotHeight,
          display: "flex",
          bottom: -200,
          overflow: "hidden",
          backgroundImage: `url(${absoluteUrl("/iphone-frame.svg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Device frame placeholder (replace with your SVG/PNG) */}
        {/* User screenshot */}
        <img
          src={template.params.screenshot.url}
          alt="App Screenshot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
