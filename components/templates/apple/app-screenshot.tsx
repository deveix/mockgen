import { patterns } from "@/lib/patterns"
import { AppScreenshotTemplate } from "@/lib/templates/apple"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"
import Image from 'next/image'

export function Template(props: {
  template: AppScreenshotTemplate
  renderWatermark: boolean
}) {
  const { template, renderWatermark } = props
  // 1:2 aspect ratio
  const screenshotWidth = template.canvas.width * 0.8
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
          height: "100%",
          width: "100%",
          position: "absolute",
          inset: 0,
          filter: "brightness(100%) contrast(150%)",
          opacity: template.background.noise,
          backgroundImage: `url('${absoluteUrl("/noise.svg")}')`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      {template.background.gridOverlay && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundImage: `url('${patterns[template.background.gridOverlay.pattern].svg({ color: template.background.gridOverlay.color, opacity: template.background.gridOverlay.opacity })}')`,
            maskImage:
              template.background.gridOverlay.blurRadius > 0
                ? `radial-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) ${100 - template.background.gridOverlay.blurRadius}%)`
                : "none",
          }}
        ></div>
      )}

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
          bottom: Number(template.params.bottomPadding) ?? 0,
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
          {template.params.logo.url && <img
            src={template.params.logo.url}
            alt="Logo"
            style={{
              width: template.params.logo.width,
              height: template.params.logo.height,
              position: "relative",
            }}
          />}
          {template.params.title.text}
        </p>
      </div>
      <div
        style={{
          width: screenshotWidth + 120,
          height: screenshotHeight + 120,
          display: "flex",
          bottom: Number(template.params.bottomPadding) ?? 0,
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
            left: 65,
            right: 20,
            width: screenshotWidth,
            height: screenshotHeight,
            objectFit: "cover",
            zIndex: 1,
            borderTopLeftRadius: 140,
            borderTopRightRadius: 140,
          }}
        />
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
