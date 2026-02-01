import { dataErrors, sources } from '../data'
import { DataErrorBanner } from '../components/DataErrorBanner'
import { SourceTierBadge, WarningBadge } from '../components/CredibilityBadge'
import { usePageMeta } from '../utils/meta'

export function Sources() {
  usePageMeta({
    title: 'Sources • Aptamil Recall Korea Archive',
    description: '출처 등급과 신뢰도 기준을 안내합니다.',
  })

  return (
    <div className="page sources-page">
      <DataErrorBanner errors={dataErrors} />
      <div className="page-header">
        <div>
          <h1>Sources & Credibility</h1>
          <p className="lead">출처 티어는 정보의 신뢰도 수준을 판단하기 위한 기준입니다.</p>
        </div>
      </div>

      <section className="notice">
        <h2>티어 기준</h2>
        <ul>
          <li>OFFICIAL_GOV: 정부 공식 발표</li>
          <li>OFFICIAL_MANUFACTURER: 제조사 공식 발표</li>
          <li>OFFICIAL_RETAILER: 유통사 공식 공지</li>
          <li>REPUTABLE_MEDIA: 주요 언론 보도</li>
          <li>COMMUNITY_RUMOR: 커뮤니티/루머</li>
          <li>UNKNOWN: 출처 불명</li>
        </ul>
      </section>

      <div className="cards">
        {sources.map((source) => (
          <article key={source.id} className="card">
            <div className="card-top">
              <SourceTierBadge tier={source.source_tier} />
              <WarningBadge tier={source.source_tier} />
            </div>
            <h3>{source.name}</h3>
            <p>{source.why_this_tier}</p>
            <p className="muted">최근 확인: {source.last_checked}</p>
            <a href={source.base_url} target="_blank" rel="noreferrer" className="text-link">
              출처 보기 →
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}
