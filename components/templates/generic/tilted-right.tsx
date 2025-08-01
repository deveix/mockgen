import { patterns } from "@/lib/patterns"
import { TiltedRightTemplate } from "@/lib/templates/apple/tilted-right"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"


export function Template(props: {
  template: TiltedRightTemplate
}) {
  const { template } = props
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
          justifyContent: "center",
          flex: 1,
          top: 120,
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
      <div
        style={{
          width: screenshotWidth + 325,
          height: screenshotHeight,
          display: "flex",
          overflow: "hidden",
          top: 200,
          position: "relative",
        }}
      >
        {/* Device frame using tilted-right SVG */}
        <img
          src={absoluteUrl("/mocks/iphone-tilted-right.svg")}
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
            top: 100,
            left: 200,
            right: 20,
            width: screenshotWidth,
            height: screenshotHeight,
            objectFit: "cover",
            zIndex: 1,
            borderTopLeftRadius: 160,
            borderTopRightRadius: 160,
            transform: "rotate(8deg) skewX(8deg) skewY(-2deg)",
            transformOrigin: "center center",
          }}
        />

        {/* Device frame using tilted-right SVG */}
        {/* <img
          src={absoluteUrl("/mocks/dynamic-island.svg")}
          alt="Device Frame"
          style={{
            position: "absolute",
            top: 110,
            left: 590,
            width: 300, // 500
            height: 120, // 200
            zIndex: 8,
            transform: "rotate(10deg) skewX(8deg) skewY(-2deg)",
            transformOrigin: "center center",
          }}
        /> */}
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
