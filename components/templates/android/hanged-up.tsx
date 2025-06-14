import { patterns } from "@/lib/patterns"
import { HangedUpTemplate as AndroidHangedUpTemplate } from "@/lib/templates/android/hanged-up"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export function Template(props: {
  template: AndroidHangedUpTemplate
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
        justifyContent: "center",
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
            backgroundImage: `url('${patterns[template.background.gridOverlay.pattern as keyof typeof patterns].svg({ color: template.background.gridOverlay.color, opacity: template.background.gridOverlay.opacity })}')`,
            maskImage:
              template.background.gridOverlay.blurRadius > 0
                ? `radial-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) ${100 - template.background.gridOverlay.blurRadius}%)`
                : "none",
          }}
        ></div>
      )}
      <div
        style={{
          width: screenshotWidth + 70,
          height: screenshotHeight,
          display: "flex",
          overflow: "hidden",
          position: "relative",
          top: -100,
        }}
      >
        {/* Device frame using android-frame SVG rotated upside down */}
        <img
          src={absoluteUrl("/mocks/android/android-frame.svg")}
          alt="Device Frame"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            zIndex: 4,
          }}
        />
        {/* User screenshot */}
        {template.params.screenshot.url && (
          <img
            src={template.params.screenshot.url}
            alt="App Screenshot"
            style={{
              position: "absolute",
              left: 35,
              right: 20,
              bottom: 30,
              width: screenshotWidth,
              height: screenshotHeight,
              objectFit: "cover",
              zIndex: 1,
              borderBottomLeftRadius: 80,
              borderBottomRightRadius: 80,
              transformOrigin: "center center",
            }}
          />
        )}
      </div>
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
          marginBottom: 80,
        }}
      >
        <p
          style={{
            fontFamily: template.params.title.fontFamily,
            fontWeight: template.params.title.fontWeight,
            fontSize: `${template.params.title.fontSize}px`,
            color: template.params.title.color,
            marginLeft: 150,
            marginRight: 150,
            lineHeight: 1.2,
          }}
        >
          {template.params.title.text}
        </p>
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
