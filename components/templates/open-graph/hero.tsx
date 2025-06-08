import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { HeroTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: HeroTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      background: toBackgroundShorthand(template.background),

      width: template.canvas.width,
      height: template.canvas.height,

      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      overflowY: "clip",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

          marginTop: "4rem",

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

      {template.params.image.url && (
        <div
          style={{
            display: "flex",

            width: "100%",

            paddingTop: "4rem",
            paddingRight: "4rem",
            paddingLeft: "4rem",
          }}
        >
          <img
            style={{
              borderRadius: "0.75rem",
            }}
            src={template.params.image.url}
          />
        </div>
      )}
    </div>

    {renderWatermark && (
      <Watermark
        style={{
          top: "2rem",
          right: "2rem",
        }}
      />
    )}
  </div>
)
