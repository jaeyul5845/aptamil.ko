import { usePageMeta } from '../utils/meta'

export function Disclaimer() {
  usePageMeta({
    title: 'Disclaimer • Aptamil Recall Korea Archive',
    description: '법적/의료적 면책 조항.',
  })

  return (
    <div className="page disclaimer-page">
      <div className="page-header">
        <div>
          <h1>Disclaimer</h1>
          <p className="lead">본 사이트는 정보 제공 목적이며 의료적 판단을 제공하지 않습니다.</p>
        </div>
      </div>

      <div className="notice">
        <h2>중요 안내</h2>
        <ul>
          <li>본 사이트는 공식 리콜 공지의 대체 수단이 아닙니다.</li>
          <li>공식 발표 기준으로 확인해야 합니다.</li>
          <li>건강 관련 판단이 필요한 경우 전문가와 상담하십시오.</li>
        </ul>
      </div>

      <div className="notice">
        <h2>출처 사용</h2>
        <p>출처는 공식/언론/커뮤니티로 구분되며, 신뢰도 표기는 참고 목적입니다.</p>
      </div>
    </div>
  )
}
