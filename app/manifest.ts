import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "imgsrc",
    short_name: "imgrsrc",
    description: "Generate beautiful Open Graph images with zero effort.",
    start_url: "/",
    display: "standalone",
  }
}
