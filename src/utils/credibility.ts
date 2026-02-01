import type { CredibilityLabel, SourceTier } from '../types'

export const sourceTierScores: Record<SourceTier, number> = {
  OFFICIAL_GOV: 95,
  OFFICIAL_MANUFACTURER: 90,
  OFFICIAL_RETAILER: 80,
  REPUTABLE_MEDIA: 65,
  COMMUNITY_RUMOR: 25,
  UNKNOWN: 10,
}

export const scoreToLabel = (score: number): CredibilityLabel => {
  if (score >= 90) return '공식(매우 높음)'
  if (score >= 70) return '준공식/신뢰 높음'
  if (score >= 50) return '언론/참고(중간)'
  return '카더라/미확인(낮음)'
}

export const tierToCredibility = (tier: SourceTier) => {
  const credibility_score = sourceTierScores[tier]
  const credibility_label = scoreToLabel(credibility_score)
  return { source_tier: tier, credibility_score, credibility_label }
}

export const isLowCredibility = (tier: SourceTier) =>
  tier === 'COMMUNITY_RUMOR' || tier === 'UNKNOWN'
