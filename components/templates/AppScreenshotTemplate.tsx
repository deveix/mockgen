
import { AppScreenshotTemplate as AppleAppScreenshotTemplate } from "@/lib/templates/apple"
import { AppScreenshotTemplate as AndroidAppScreenshotTemplate } from "@/lib/templates/android/app-screenshot"

import Image from "next/image"
import { Watermark } from "@/components/templates/elements/watermark"

import { BackgroundContainer } from "../common/BackgroundContainer"
import { DeviceScreenshotLayout } from "../common/DeviceScreenshotLayout"

interface AppScreenshotTemplateProps {
  template: AppleAppScreenshotTemplate | AndroidAppScreenshotTemplate;
  renderWatermark: boolean;
}

export function AppScreenshotTemplate({ template, renderWatermark }: AppScreenshotTemplateProps) {
  const screenshotWidth = template.canvas.width * 0.8;
  const screenshotHeight = screenshotWidth * 2.2;

  const isAppleTemplate = (template as AppleAppScreenshotTemplate).params.logo !== undefined;

  const deviceFrameSrc = isAppleTemplate ? "/mocks/iphone-frame.svg" : "/mocks/android/android-frame.svg";
  const screenshotTop = isAppleTemplate ? 90 : 35;
  const screenshotLeft = isAppleTemplate ? 65 : 35;
  const screenshotBorderRadius = isAppleTemplate ? 140 : 80;
  const deviceFrameWidth = isAppleTemplate ? screenshotWidth + 120 : screenshotWidth + 80;
  const deviceFrameHeight = isAppleTemplate ? screenshotHeight + 120 : screenshotHeight + 80;
  const justifyContent = isAppleTemplate ? "flex-end" : "flex-start";
  const bottomPadding = Number(template.params.bottomPadding || 0);

  return (
    <BackgroundContainer canvas={template.canvas} background={template.background} style={{ justifyContent }}>
      <div
        style={{
          fontSize: template.params.title.fontSize,
          fontWeight: template.params.title.fontWeight,
          color: template.params.title.color,
          fontFamily: template.params.title.fontFamily,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: justifyContent,
          bottom: bottomPadding,
        }}
      >
        {isAppleTemplate && (
          <Image
            src={(template as AppleAppScreenshotTemplate).params.logo.url}
            alt="Logo"
            width={(template as AppleAppScreenshotTemplate).params.logo.width}
            height={(template as AppleAppScreenshotTemplate).params.logo.height}
            style={{
              position: "relative",
            }}
          />
        )}
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
          {template.params.title.text}
        </p>
      </div>
      <DeviceScreenshotLayout
        deviceFrameSrc={deviceFrameSrc}
        screenshotUrl={template.params.screenshot.url}
        screenshotWidth={screenshotWidth}
        screenshotHeight={screenshotHeight}
        screenshotTop={screenshotTop}
        screenshotLeft={screenshotLeft}
        screenshotBorderRadius={screenshotBorderRadius}
        deviceFrameWidth={deviceFrameWidth}
        deviceFrameHeight={deviceFrameHeight}
      />
      {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />}
    </BackgroundContainer>
  );
}
