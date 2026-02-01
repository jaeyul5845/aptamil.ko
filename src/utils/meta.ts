import { useEffect } from 'react'

interface MetaOptions {
  title: string
  description?: string
  url?: string
}

const setMeta = (name: string, content?: string) => {
  if (!content) return
  const element = document.querySelector(`meta[name="${name}"]`)
  if (element) element.setAttribute('content', content)
}

const setOg = (property: string, content?: string) => {
  if (!content) return
  const element = document.querySelector(`meta[property="${property}"]`)
  if (element) element.setAttribute('content', content)
}

export const usePageMeta = ({ title, description, url }: MetaOptions) => {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setOg('og:title', title)
    setOg('og:description', description)
    if (url) setOg('og:url', url)
  }, [title, description, url])
}
