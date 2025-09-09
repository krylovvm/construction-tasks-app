export const getMarkerText = (title: string): string => {
  if (!title) return ''

  const words = title.trim().split(' ')

  if (words.length >= 2) {
    return (words[0]?.[0] || '') + (words[1]?.[0] || '')
  } else {
    return title.slice(0, 2)
  }
}
