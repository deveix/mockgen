"use client"
import { patterns } from "@/lib/patterns"
import { HangedUpTemplate } from "@/lib/templates/apple/hanged-up"
import { toBackgroundShorthand } from "@/lib/templates/elements/background"
import { absoluteUrl } from "@/lib/url"

// Coords et taille réelle du PNG pour iPhone 15 Black Mockup
const FRAME_WIDTH = 1419  // largeur réelle du PNG
const FRAME_HEIGHT = 2796 // hauteur réelle du PNG
const SCREENSHOT_COORDS = [[120, 120], [1299, 120], [1299, 2676], [120, 2676]]

function getScreenshotPosition(template: HangedUpTemplate, frameDisplayWidth: number, frameDisplayHeight: number) {
  // Par défaut, Android non supporté dans cette démo
  // (Adapte la logique si tu veux le même calcul pour Android)
  const isAndroid = template.name.startsWith("android:")
  if (isAndroid) {
    // Pour Android, remplace par tes propres valeurs ou une autre fonction
    return {
      left: 35,
      top: 0,
      width: frameDisplayWidth - 55, // à adapter selon ton PNG Android
      height: frameDisplayHeight - 30,
      borderRadius: 80,
    }
  }

  // Calcul du scaling (important !)
  const scaleX = frameDisplayWidth / FRAME_WIDTH
  const scaleY = frameDisplayHeight / FRAME_HEIGHT

  // Extraction des coordonnées écran (rectangle)
  const [topLeft, topRight, bottomRight] = SCREENSHOT_COORDS
  const left = topLeft[0] * scaleX
  const top = topLeft[1] * scaleY
  const width = (topRight[0] - topLeft[0]) * scaleX
  const height = (bottomRight[1] - topRight[1]) * scaleY
  const borderRadius = 80 * scaleX // À ajuster si besoin selon le visuel de ton frame

  return { left, top, width, height, borderRadius }
}

/**
 * 
 * This file has a lot in common with the other templates, it will be interesting to see how much are in common
 * 
 */
export function Template(props: { template: HangedUpTemplate }) {
  const { template } = props
  const isAndroid = template.name.startsWith("android:")

  // On choisit une taille d'affichage pour la frame (par exemple 800px de large)
  // ou adapte selon template.canvas.width/height si nécessaire
  const FRAME_DISPLAY_WIDTH = template.canvas.width
  const FRAME_DISPLAY_HEIGHT = template.canvas.height

  // Calcul dynamique de la position/size du screenshot
  const screenshotPos = getScreenshotPosition(template, FRAME_DISPLAY_WIDTH, FRAME_DISPLAY_HEIGHT)

  return (
    <div
      style={{
        width: FRAME_DISPLAY_WIDTH,
        height: FRAME_DISPLAY_HEIGHT,
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
          display: "flex",
        }}
      ></div>

      {template.background.gridOverlay && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundImage: `url('${patterns[template.background.gridOverlay.pattern].svg({
              color: template.background.gridOverlay.color,
              opacity: template.background.gridOverlay.opacity
            })}')`,
            maskImage:
              template.background.gridOverlay.blurRadius > 0
                ? `radial-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) ${100 - template.background.gridOverlay.blurRadius}%)`
                : "none",
            display: "flex",
          }}
        ></div>
      )}
      <div
        style={{
          width: FRAME_DISPLAY_WIDTH,
          height: FRAME_DISPLAY_HEIGHT,
          display: "flex",
          overflow: "hidden",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Screenshot container avec placement précis */}
        <div
          style={{
            position: "absolute",
            width: screenshotPos.width + 2,
            height: screenshotPos.height,
            left: screenshotPos.left - 1,
            top: screenshotPos.top - 1,
            zIndex: 2,
            overflow: "hidden",
            borderRadius: screenshotPos.borderRadius,
            pointerEvents: "none",
            display: "flex",
          }}
        >
          {template.params.screenshot.url && (
            <img
              src={template.params.screenshot.url}
              alt="App Screenshot"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: screenshotPos.borderRadius,
                display: "block",
              }}
            />
          )}
        </div>
        {/* Frame PNG (device) */}
        <img
          src={absoluteUrl(`/mocks/${isAndroid ? 'android-frame.svg' : 'iphone-15-frame.png'}`)}
          alt="Device Frame"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            zIndex: 4,
            position: "relative",
          }}
        />
      </div>
      <div
        style={{
          fontSize: template.params.title.fontSize as number,
          fontWeight: template.params.title.fontWeight as import("@/lib/fonts").FontWeight,
          color: template.params.title.color as string,
          fontFamily: template.params.title.fontFamily as string,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 80,
        }}
      >
        <p
          style={{
            fontFamily: template.params.title.fontFamily as string,
            fontWeight: template.params.title.fontWeight as import("@/lib/fonts").FontWeight,
            fontSize: `${template.params.title.fontSize}px`,
            color: template.params.title.color as string,
            marginLeft: 150,
            marginRight: 150,
            lineHeight: 1.2,
          }}
        >
          {template.params.title.text as string}
        </p>
      </div>
      {/* {renderWatermark && <Watermark style={{ bottom: 16, right: 16 }} />} */}
    </div>
  )
}
