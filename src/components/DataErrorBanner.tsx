import './DataErrorBanner.css'

export function DataErrorBanner({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null
  return (
    <div className="data-error">
      <h2>데이터 형식 오류</h2>
      <p>콘텐츠 JSON 형식에 문제가 있어 일부 화면이 표시되지 않을 수 있습니다.</p>
      <ul>
        {errors.map((error, index) => (
          <li key={`${error}-${index}`}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
