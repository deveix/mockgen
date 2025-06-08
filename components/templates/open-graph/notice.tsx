import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { NoticeTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: NoticeTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      background: toBackgroundShorthand(template.background),

      width: template.canvas.width,
      height: template.canvas.height,

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
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
        display: "flex",
        columnGap: "1.5rem",
        alignItems: "center",
      }}
    >
      {template.params.logo.url && (
        <img
          style={{
            width: "6rem",
            height: "6rem",
          }}
          src={template.params.logo.url}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {template.params.title.text && (
          <div
            style={{
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

        {template.params.description.text && (
          <div
            style={{
              fontFamily: template.params.description.fontFamily,
              fontWeight: template.params.description.fontWeight,
              fontSize: `${template.params.description.fontSize}px`,
              color: template.params.description.color,
            }}
          >
            {template.params.description.text}
          </div>
        )}
      </div>
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
