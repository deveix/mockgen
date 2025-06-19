"use client"
import { patterns } from "@/lib/patterns"
import { HangedUpTemplate } from "@/lib/templates/apple/hanged-up"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"

function getScreenshotPosition(template: HangedUpTemplate) {
  const isAndroid = template.name.startsWith("android:")
  const pos: { [key: string]: number } = {}
  const fields = ["left", "right", "top", "bottom"]
  if (template.params.screenshot) {
    for (const field of fields) {
      const value = (template.params.screenshot as Record<string, unknown>)[field]
      if (typeof value === "number" && value !== 0) {
        pos[field] = value
      }
    }
  }
  if (Object.keys(pos).length === 0) {
    pos.left = isAndroid ? 35 : 40
    pos.right = 20
    pos.bottom = isAndroid ? 30 : 80
  }
  return pos
}

/**
 * 
 * This file have a lot in common with the other templates, it will be interesting to see how much are in common
 * 
 */

export function Template(props: {
  template: HangedUpTemplate
}) {
  const { template } = props
  // 1:2 aspect ratio
  const screenshotWidth = template.canvas.width * 0.8
  const screenshotHeight = screenshotWidth * 2.2
  const isAndroid = template.name.startsWith("android:")
  const screenshotPosition = getScreenshotPosition(template)

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
          width: screenshotWidth + (isAndroid ? 70 : 80),
          height: screenshotHeight,
          display: "flex",
          overflow: "hidden",
          position: "relative",
          top: -100,
        }}
      >
        {/* Device frame using iphone-up SVG rotated upside down */}
        { /* ToDo: use the complete frame on every template to simplify mocks management */}
        <img
          src={absoluteUrl(`/mocks/${isAndroid ? 'android-frame.svg' : 'iphone-up.svg'}`)}
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
              width: screenshotWidth,
              height: screenshotHeight,
              objectFit: "cover",
              zIndex: 1,
              borderBottomLeftRadius: isAndroid ? 80 : 150,
              borderBottomRightRadius: isAndroid ? 80 : 150,
              transformOrigin: "center center",
              ...screenshotPosition,
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
