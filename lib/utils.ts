import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatTemplateName(name: string) {
  return name
    .replace(/-/g, " ")
    .replace("apple:", "")
    .replace("android:", "")
    .replace(":", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
