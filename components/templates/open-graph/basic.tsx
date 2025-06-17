
import { BasicTemplate } from "@/lib/templates/open-graph"
import { Watermark } from "../elements/watermark"
import { BackgroundContainer } from "../../common/BackgroundContainer"
import Image from "next/image"

export const Template = ({
  template,
  renderWatermark,
}: {
  template: BasicTemplate
  renderWatermark: boolean
}) => (
  <BackgroundContainer canvas={template.canvas} background={template.background}>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {template.params.logo.url && (
        <Image
          style={{
            width: "6rem",
            height: "6rem",
          }}
          src={template.params.logo.url} alt={""} />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
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
  </BackgroundContainer>
)
