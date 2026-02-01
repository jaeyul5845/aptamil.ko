const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatInline = (value: string) => {
  return value
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

export const markdownToHtml = (markdown: string) => {
  const lines = markdown.split(/\r?\n/)
  let html = ''
  let inList = false

  const closeList = () => {
    if (inList) {
      html += '</ul>'
      inList = false
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      closeList()
      continue
    }

    if (line.startsWith('### ')) {
      closeList()
      const content = formatInline(escapeHtml(line.slice(4)))
      html += `<h3>${content}</h3>`
      continue
    }

    if (line.startsWith('## ')) {
      closeList()
      const content = formatInline(escapeHtml(line.slice(3)))
      html += `<h2>${content}</h2>`
      continue
    }

    if (line.startsWith('# ')) {
      closeList()
      const content = formatInline(escapeHtml(line.slice(2)))
      html += `<h1>${content}</h1>`
      continue
    }

    if (line.startsWith('- ')) {
      const content = formatInline(escapeHtml(line.slice(2)))
      if (!inList) {
        html += '<ul>'
        inList = true
      }
      html += `<li>${content}</li>`
      continue
    }

    closeList()
    const content = formatInline(escapeHtml(line))
    html += `<p>${content}</p>`
  }

  closeList()
  return html
}
