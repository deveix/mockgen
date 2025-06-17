import { useEffect, useState } from "react"

export default function useImage(url: string, crossOrigin?: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!url) return
    const img = new window.Image()
    if (crossOrigin) img.crossOrigin = crossOrigin
    img.src = url
    img.onload = () => setImage(img)
    return () => {
      setImage(null)
    }
  }, [url, crossOrigin])

  return [image]
}
