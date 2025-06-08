import { patterns } from "@/lib/patterns"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { ImageRightTemplate } from "@/lib/templates/open-graph"
import { absoluteUrl } from "@/lib/url"

import { Watermark } from "../elements/watermark"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: ImageRightTemplate
  renderWatermark: boolean
}) => (
  <div
    style={{
      width: template.canvas.width,
      height: template.canvas.height,

      background: toBackgroundShorthand(template.background),

      display: "flex",
      flexDirection: "column",
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

    {template.params.logo.url && (
      <div
        style={{
          display: "flex",

          paddingTop: "2rem",
          paddingLeft: "2rem",
        }}
      >
        <img
          style={{
            height: "4rem",
            width: "4rem",
          }}
          src={template.params.logo.url}
        />
      </div>
    )}

    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "1.5rem",

        paddingLeft: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1.5rem",
          flexShrink: 0,

          width: "50%",
          maxWidth: "50%",

          paddingTop: "4rem",
        }}
      >
        {template.params.tag.text && (
          <div
            style={{
              display: "flex",
              flexGrow: 0,
            }}
          >
            <span
              style={{
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
            </span>
          </div>
        )}

        {template.params.title.text && (
          <div
            style={{
              display: "flex",
              flexGrow: 0,

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
            flexGrow: 0,
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
          bottom: "2rem",
          left: "2rem",
        }}
      />
    )}
  </div>
)
