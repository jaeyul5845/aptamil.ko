import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { archive, dataErrors } from '../data'
import type { ClaimType, CountryScope, ProductTag, SourceTier } from '../types'
import { CredibilityBadge, WarningBadge } from '../components/CredibilityBadge'
import { DataErrorBanner } from '../components/DataErrorBanner'
import { formatDate, normalizeText } from '../utils/format'
import { usePageMeta } from '../utils/meta'
import './Archive.css'

const countryOptions: CountryScope[] = ['KR', 'DE', 'NL', 'UK', 'EU', 'OTHER']
const productOptions: ProductTag[] = ['PRE', '1', 'AR', 'COMFORT', 'PROFUTURA', 'OTHER']
const claimOptions: ClaimType[] = [
  'RECALL_NOTICE',
  'SAFETY_UPDATE',
  'HOW_TO_CHECK',
  'FAQ',
  'NEWS_SUMMARY',
  'COMMUNITY_REPORT',
]
const tierOptions: SourceTier[] = [
  'OFFICIAL_GOV',
  'OFFICIAL_MANUFACTURER',
  'OFFICIAL_RETAILER',
  'REPUTABLE_MEDIA',
  'COMMUNITY_RUMOR',
  'UNKNOWN',
]

export function Archive() {
  usePageMeta({
    title: 'Archive • Aptamil Recall Korea Archive',
    description: 'Aptamil 리콜 관련 아카이브를 국가/제품/출처 기준으로 탐색합니다.',
  })

  const [query, setQuery] = useState('')
  const [country, setCountry] = useState<CountryScope | 'ALL'>('ALL')
  const [product, setProduct] = useState<ProductTag | 'ALL'>('ALL')
  const [claim, setClaim] = useState<ClaimType | 'ALL'>('ALL')
  const [tier, setTier] = useState<SourceTier | 'ALL'>('ALL')
  const [sort, setSort] = useState<'NEWEST' | 'CREDIBILITY'>('NEWEST')

  const filtered = useMemo(() => {
    const normalized = normalizeText(query)
    return archive
      .filter((entry) => {
        if (country !== 'ALL' && !entry.country_scope.includes(country)) return false
        if (product !== 'ALL' && !entry.product_tags.includes(product)) return false
        if (claim !== 'ALL' && entry.claim_type !== claim) return false
        if (tier !== 'ALL' && entry.credibility.source_tier !== tier) return false
        if (normalized) {
          const haystack = normalizeText(`${entry.title_ko} ${entry.summary_ko}`)
          if (!haystack.includes(normalized)) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sort === 'CREDIBILITY') {
          return b.credibility.credibility_score - a.credibility.credibility_score
        }
        return b.published_at.localeCompare(a.published_at)
      })
  }, [query, country, product, claim, tier, sort])

  return (
    <div className="page archive-page">
      <DataErrorBanner errors={dataErrors} />
      <div className="page-header">
        <div>
          <h1>Archive</h1>
          <p className="lead">출처 신뢰도와 유형별로 정리된 아카이브입니다.</p>
        </div>
      </div>

      <div className="filter-panel">
        <input
          className="search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="제목/요약 검색"
        />
        <div className="filter-grid">
          <label>
            국가
            <select value={country} onChange={(event) => setCountry(event.target.value as CountryScope | 'ALL')}>
              <option value="ALL">전체</option>
              {countryOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            제품 라인
            <select value={product} onChange={(event) => setProduct(event.target.value as ProductTag | 'ALL')}>
              <option value="ALL">전체</option>
              {productOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            유형
            <select value={claim} onChange={(event) => setClaim(event.target.value as ClaimType | 'ALL')}>
              <option value="ALL">전체</option>
              {claimOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            출처 티어
            <select value={tier} onChange={(event) => setTier(event.target.value as SourceTier | 'ALL')}>
              <option value="ALL">전체</option>
              {tierOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            정렬
            <select value={sort} onChange={(event) => setSort(event.target.value as 'NEWEST' | 'CREDIBILITY')}>
              <option value="NEWEST">최신순</option>
              <option value="CREDIBILITY">신뢰도 높은 순</option>
            </select>
          </label>
        </div>
      </div>

      <div className="cards">
        {filtered.map((entry) => (
          <article key={entry.id} className="card">
            <div className="card-top">
              <CredibilityBadge credibility={entry.credibility} />
              <WarningBadge tier={entry.credibility.source_tier} />
            </div>
            <h3>{entry.title_ko}</h3>
            <p>{entry.summary_ko}</p>
            <div className="meta-row">
              <span className="muted">게시: {formatDate(entry.published_at)}</span>
              <span className="muted">확인: {formatDate(entry.last_checked)}</span>
            </div>
            <Link to={`/archive/${entry.slug}`} className="text-link">
              상세 보기 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
