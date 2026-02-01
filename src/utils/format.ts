export const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export const normalizeText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, ' ').trim()
