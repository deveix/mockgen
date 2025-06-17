import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "mockgen",
    short_name: "mockgen",
    description: "Generate beautiful App Store and PlayStore assets for your app.",
    start_url: "/",
    display: "standalone",
  }
}
