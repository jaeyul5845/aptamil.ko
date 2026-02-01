import type { ArchiveCredibility, SourceTier } from '../types'
import { isLowCredibility } from '../utils/credibility'
import './CredibilityBadge.css'

export function CredibilityBadge({ credibility }: { credibility: ArchiveCredibility }) {
  return (
    <div className="credibility-badge">
      <span className={`tier tier-${credibility.source_tier.toLowerCase()}`}>
        {credibility.source_tier}
      </span>
      <span className="label">{credibility.credibility_label}</span>
      <span className="score">{credibility.credibility_score}</span>
    </div>
  )
}

export function SourceTierBadge({ tier }: { tier: SourceTier }) {
  return <span className={`tier tier-${tier.toLowerCase()}`}>{tier}</span>
}

export function WarningBadge({ tier }: { tier: SourceTier }) {
  if (!isLowCredibility(tier)) return null
  return <span className="warning-badge">확인 필요(공식 근거 부족)</span>
}
