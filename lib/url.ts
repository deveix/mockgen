export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const absoluteUrl = new URL(path, baseUrl)
  return absoluteUrl.toString()
}
