import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { archive, dataErrors, recallRules, sources, updates } from '../data'
import type { CountryScope, ProductTag } from '../types'
import { DataErrorBanner } from '../components/DataErrorBanner'
import { CredibilityBadge, WarningBadge } from '../components/CredibilityBadge'
import { evaluateRecall } from '../utils/recallChecker'
import { formatDate } from '../utils/format'
import { usePageMeta } from '../utils/meta'
import './Home.css'

const countries: CountryScope[] = ['KR', 'DE', 'NL', 'UK', 'EU', 'OTHER']
const productTags: ProductTag[] = ['PRE', '1', 'AR', 'COMFORT', 'PROFUTURA', 'OTHER']

export function Home() {
  usePageMeta({
    title: 'Aptamil Recall Korea Archive',
    description: 'Aptamil 리콜 관련 정보를 출처 신뢰도와 함께 정리한 아카이브입니다.',
  })

  const [country, setCountry] = useState<CountryScope>('KR')
  const [productTag, setProductTag] = useState<ProductTag>('1')
  const [mhd, setMhd] = useState('')
  const [lot, setLot] = useState('')

  const result = useMemo(() => {
    return evaluateRecall(
      { country, productTag, mhd: mhd || undefined, lot: lot || undefined },
      recallRules
    )
  }, [country, productTag, mhd, lot])

  const latest = useMemo(() => {
    return [...archive].sort((a, b) => b.published_at.localeCompare(a.published_at)).slice(0, 3)
  }, [])

  const topSources = useMemo(() => {
    return sources.filter((source) =>
      ['OFFICIAL_GOV', 'OFFICIAL_MANUFACTURER', 'OFFICIAL_RETAILER'].includes(source.source_tier)
    )
  }, [])

  return (
    <div className="page home-page">
      <DataErrorBanner errors={dataErrors} />
      <section className="hero">
        <div>
          <p className="eyebrow">Korea • Recall Archive</p>
          <h1>공식·언론·커뮤니티 정보를 분리해 기록합니다.</h1>
          <p className="lead">
            본 사이트는 Aptamil 관련 공지/보도를 아카이빙하며, 신뢰도 라벨로 구분합니다. 의료적 판단은 제공하지
            않으며 최종 판단은 공식 발표 기준입니다.
          </p>
          <div className="cta-row">
            <Link to="/archive" className="button primary">
              아카이브 보기
            </Link>
            <Link to="/sources" className="button ghost">
              출처 기준 확인
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h2>Recall Checker</h2>
          <p>입력 정보는 로컬 데이터셋과만 대조됩니다.</p>
          <div className="form-grid">
            <label>
              국가
              <select value={country} onChange={(event) => setCountry(event.target.value as CountryScope)}>
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              제품 라인
              <select value={productTag} onChange={(event) => setProductTag(event.target.value as ProductTag)}>
                {productTags.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              MHD/유통기한
              <input type="date" value={mhd} onChange={(event) => setMhd(event.target.value)} />
            </label>
            <label>
              LOT/BATCH
              <input value={lot} onChange={(event) => setLot(event.target.value)} placeholder="예: KR25A" />
            </label>
          </div>
          <div className="checker-result">
            <p className="result-title">결과</p>
            {result.status === 'INCLUDED_IN_OFFICIAL_RECALLS' && (
              <p>공식 발표에 포함됨(리콜 공지 기준)</p>
            )}
            {result.status === 'NOT_IN_LISTED_OFFICIAL_RECALLS' && (
              <p>현재 공개된 공식 목록에는 없음</p>
            )}
            {result.status === 'UNKNOWN_NEEDS_CONFIRMATION' && (
              <p>확인 필요(공식 근거 부족)</p>
            )}
            {result.matches.length > 0 && (
              <div className="match-list">
                {result.matches.map((rule) => (
                  <div key={rule.id} className="match-card">
                    <p className="muted">규칙: {rule.id}</p>
                    <ul>
                      {rule.sources.map((source) => (
                        <li key={`${rule.id}-${source.url}`}>
                          <a href={source.url} target="_blank" rel="noreferrer">
                            {source.url}
                          </a>
                          <span className="muted"> ({source.source_tier}, {source.last_checked})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Latest updates</h2>
          <Link to="/updates" className="text-link">
            업데이트 전체 보기 →
          </Link>
        </div>
        <div className="cards">
          {updates.slice(0, 3).map((item) => (
            <article key={item.id} className="card">
              <p className="muted">{formatDate(item.date)}</p>
              <h3>{item.title_ko}</h3>
              <p>{item.summary_ko}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Latest archive</h2>
          <Link to="/archive" className="text-link">
            전체 아카이브 →
          </Link>
        </div>
        <div className="cards">
          {latest.map((entry) => (
            <article key={entry.id} className="card">
              <div className="card-top">
                <CredibilityBadge credibility={entry.credibility} />
                <WarningBadge tier={entry.credibility.source_tier} />
              </div>
              <h3>{entry.title_ko}</h3>
              <p>{entry.summary_ko}</p>
              <Link to={`/archive/${entry.slug}`} className="text-link">
                상세 보기 →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Top official sources</h2>
          <Link to="/sources" className="text-link">
            출처 디렉토리 →
          </Link>
        </div>
        <div className="cards">
          {topSources.map((source) => (
            <article key={source.id} className="card">
              <div className="card-top">
                <span className="muted">{source.type}</span>
                <WarningBadge tier={source.source_tier} />
              </div>
              <h3>{source.name}</h3>
              <p>{source.why_this_tier}</p>
              <a href={source.base_url} target="_blank" rel="noreferrer" className="text-link">
                출처 보기 →
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
