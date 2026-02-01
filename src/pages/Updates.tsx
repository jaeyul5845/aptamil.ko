import { dataErrors, updates } from '../data'
import { DataErrorBanner } from '../components/DataErrorBanner'
import { formatDate } from '../utils/format'
import { usePageMeta } from '../utils/meta'

export function Updates() {
  usePageMeta({
    title: 'Updates • Aptamil Recall Korea Archive',
    description: '사이트 변경사항과 아카이브 업데이트 기록.',
  })

  return (
    <div className="page updates-page">
      <DataErrorBanner errors={dataErrors} />
      <div className="page-header">
        <div>
          <h1>Updates</h1>
          <p className="lead">아카이브 변경 기록입니다.</p>
        </div>
      </div>

      <div className="cards">
        {updates.map((entry) => (
          <article key={entry.id} className="card">
            <p className="muted">{formatDate(entry.date)}</p>
            <h3>{entry.title_ko}</h3>
            <p>{entry.summary_ko}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
