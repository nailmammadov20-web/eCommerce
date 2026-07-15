import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Deliberately not using Intl.NumberFormat/DateTimeFormat with "az-AZ": Node's
// bundled ICU data doesn't reliably match the browser's for this locale, which
// caused a server/client hydration mismatch (server rendered "25.00", client
// rendered "25,00"). Formatting manually guarantees identical output everywhere.

export function formatPrice(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value
  return num.toFixed(2).replace(".", ",") + " AZN"
}

const azMonths = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr",
]

export function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value
  return `${date.getDate()} ${azMonths[date.getMonth()]} ${date.getFullYear()}`
}

export function slugify(value: string) {
  return value
    .toString()
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/ç/g, "c")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function generateOrderNumber() {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = (date.getMonth() + 1).toString().padStart(2, "0")
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `VLT-${y}${m}-${rand}`
}
