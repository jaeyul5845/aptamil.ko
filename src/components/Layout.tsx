import { NavLink } from 'react-router-dom'
import './Layout.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <p className="brand-title">Aptamil Recall Korea Archive</p>
            <p className="brand-subtitle">공식/언론/커뮤니티 정보를 투명하게 정리</p>
          </div>
        </div>
        <nav className="site-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/archive">Archive</NavLink>
          <NavLink to="/sources">Sources</NavLink>
          <NavLink to="/updates">Updates</NavLink>
          <NavLink to="/disclaimer">Disclaimer</NavLink>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <p>정보 제공 목적의 아카이브입니다. 최종 판단은 공식 발표 기준입니다.</p>
        <p>의료적 판단이나 안전성 결론을 제공하지 않습니다.</p>
      </footer>
    </div>
  )
}
