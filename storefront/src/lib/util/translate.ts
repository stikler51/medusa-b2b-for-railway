import { translations } from "../translations"

/**
 * Simple translation utility function
 * Supports nested key lookup (e.g., "nav.quote" -> translations.nav.quote)
 * Supports placeholder replacement (e.g., "{count}" replaced with actual values)
 */
export function t(
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".")
  let value: any = translations

  // Navigate through nested object
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k]
    } else {
      // Key not found, return the key itself as fallback
      console.warn(`Translation key not found: ${key}`)
      return key
    }
  }

  // If value is not a string, return key as fallback
  if (typeof value !== "string") {
    console.warn(`Translation value is not a string: ${key}`)
    return key
  }

  // Replace placeholders if params provided
  if (params) {
    let result = value
    Object.entries(params).forEach(([placeholder, replacement]) => {
      result = result.replace(`{${placeholder}}`, String(replacement))
    })
    return result
  }

  return value
}
