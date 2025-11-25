export const getPluralizedItemCount = (
  count: number,
  t: (key: string, params?: any) => string,
  prefix: string
) => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return t(`${prefix}.items`, { count })
  }

  if (lastDigit === 1) {
    return t(`${prefix}.item`, { count })
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return t(`${prefix}.items2to4`, { count })
  }

  return t(`${prefix}.items`, { count })
}
