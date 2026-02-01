import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { archive, dataErrors } from '../data'
import { CredibilityBadge, SourceTierBadge, WarningBadge } from '../components/CredibilityBadge'
import { DataErrorBanner } from '../components/DataErrorBanner'
import { formatDate } from '../utils/format'
import { usePageMeta } from '../utils/meta'
import { markdownToHtml } from '../utils/markdown'
import './Article.css'

const articles = import.meta.glob('../content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export function Article() {
  const { slug } = useParams()
  const entry = archive.find((item) => item.slug === slug)
  const markdown = entry ? articles[`../content/${entry.content_md}`] : undefined
  const html = useMemo(() => (markdown ? markdownToHtml(markdown) : ''), [markdown])
  const [copied, setCopied] = useState(false)

  usePageMeta({
    title: entry ? `${entry.title_ko} • Archive` : 'Article not found',
    description: entry?.summary_ko,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  })

  const copySummary = async () => {
    if (!entry) return
    const sourceLines = entry.sources
      .map((source) => `${source.url} (${source.source_tier}, ${source.last_checked})`)
      .join('\n')
    const text = [
      entry.title_ko,
      entry.summary_ko,
      `신뢰도: ${entry.credibility.credibility_label} (${entry.credibility.source_tier}, ${entry.credibility.credibility_score})`,
      '출처:',
      sourceLines,
      '최종 판단은 공식 발표 기준',
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  if (!entry) {
    return (
      <div className="page">
        <h1>Article not found</h1>
        <p className="lead">요청한 아카이브 항목을 찾지 못했습니다.</p>
        <Link to="/archive" className="button primary">
          아카이브로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="page article-page">
      <DataErrorBanner errors={dataErrors} />
      <div className="article-hero">
        <div className="article-header-row">
          <CredibilityBadge credibility={entry.credibility} />
          <WarningBadge tier={entry.credibility.source_tier} />
        </div>
        <h1>{entry.title_ko}</h1>
        <div className="meta-row">
          <span className="muted">게시: {formatDate(entry.published_at)}</span>
          <span className="muted">최종 확인: {formatDate(entry.last_checked)}</span>
        </div>
      </div>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

      <section className="article-section">
        <h2>신뢰도 정보</h2>
        <p>
          티어: <SourceTierBadge tier={entry.credibility.source_tier} />
        </p>
        <p>
          점수: {entry.credibility.credibility_score} / 100 · 라벨: {entry.credibility.credibility_label}
        </p>
      </section>

      <section className="article-section">
        <h2>출처</h2>
        <ul className="source-list">
          {entry.sources.map((source) => (
            <li key={`${source.source_id}-${source.url}`}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.url}
              </a>
              <span className="muted"> ({source.source_tier}, {source.last_checked})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="article-section notice">
        <p>최종 판단은 공식 발표 기준입니다.</p>
      </section>

      <div className="article-actions">
        <button className="button ghost" type="button" onClick={copySummary}>
          {copied ? '복사됨' : '요약 복사'}
        </button>
        <Link to="/archive" className="button primary">
          아카이브로
        </Link>
      </div>
    </div>
  )
}
