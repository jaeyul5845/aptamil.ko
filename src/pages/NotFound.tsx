import { Link } from 'react-router-dom'
import { usePageMeta } from '../utils/meta'

export function NotFound() {
  usePageMeta({ title: 'Page not found' })

  return (
    <div className="page">
      <h1>Page not found</h1>
      <p className="lead">요청한 페이지를 찾지 못했습니다.</p>
      <Link to="/" className="button primary">
        홈으로 이동
      </Link>
    </div>
  )
}
