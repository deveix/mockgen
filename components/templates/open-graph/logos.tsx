import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { LogosTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: LogosTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      width: template.canvas.width,
      height: template.canvas.height,

      background: toBackgroundShorthand(template.background),

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

      gap: "2rem",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        rowGap: "0.5rem",
      }}
    >
      {template.params.tag.text && (
        <div
          style={{
            flexShrink: 0,

            fontFamily: template.params.tag.fontFamily,
            fontWeight: template.params.tag.fontWeight,
            fontSize: `${template.params.tag.fontSize}px`,
            color: template.params.tag.color,

            border: "solid",
            borderRadius: "100",
            borderWidth: "2px",

            paddingRight: "16px",
            paddingLeft: "16px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          {template.params.tag.text}
        </div>
      )}

      {template.params.title.text && (
        <div
          style={{
            flexShrink: 0,

            fontFamily: template.params.title.fontFamily,
            fontWeight: template.params.title.fontWeight,
            fontSize: `${template.params.title.fontSize}px`,
            color: template.params.title.color,
            letterSpacing: "-0.025em",
          }}
        >
          {template.params.title.text}
        </div>
      )}
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
      }}
    >
      {template.params.logos.map(
        (logo, i) =>
          logo.url && (
            <img
              key={i}
              style={{
                height: "6rem",
                width: "6rem",
              }}
              src={logo.url}
            />
          )
      )}
    </div>

    {renderWatermark && (
      <Watermark
        style={{
          bottom: "2rem",
          right: "2rem",
        }}
      />
    )}
  </div>
)
