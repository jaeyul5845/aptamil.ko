export type SourceTier =
  | 'OFFICIAL_GOV'
  | 'OFFICIAL_MANUFACTURER'
  | 'OFFICIAL_RETAILER'
  | 'REPUTABLE_MEDIA'
  | 'COMMUNITY_RUMOR'
  | 'UNKNOWN'

export type CredibilityLabel =
  | '공식(매우 높음)'
  | '준공식/신뢰 높음'
  | '언론/참고(중간)'
  | '카더라/미확인(낮음)'

export type CountryScope = 'DE' | 'NL' | 'UK' | 'EU' | 'KR' | 'OTHER'
export type ProductTag = 'PRE' | '1' | 'AR' | 'COMFORT' | 'PROFUTURA' | 'OTHER'

export type ClaimType =
  | 'RECALL_NOTICE'
  | 'SAFETY_UPDATE'
  | 'HOW_TO_CHECK'
  | 'FAQ'
  | 'NEWS_SUMMARY'
  | 'COMMUNITY_REPORT'

export interface SourceEntry {
  id: string
  name: string
  country: string
  type: string
  source_tier: SourceTier
  base_url: string
  why_this_tier: string
  last_checked: string
}

export interface ArchiveSourceRef {
  source_id: string
  url: string
  last_checked: string
  source_tier: SourceTier
}

export interface ArchiveCredibility {
  source_tier: SourceTier
  credibility_score: number
  credibility_label: CredibilityLabel
}

export interface ArchiveItem {
  id: string
  slug: string
  title_ko: string
  summary_ko: string
  country_scope: CountryScope[]
  product_tags: ProductTag[]
  published_at: string
  last_checked: string
  claim_type: ClaimType
  sources: ArchiveSourceRef[]
  credibility: ArchiveCredibility
  content_md: string
}

export interface RecallRuleSource {
  source_id?: string
  url: string
  source_tier: SourceTier
  last_checked: string
}

export interface RecallRule {
  id: string
  country: CountryScope
  product_tags: ProductTag[]
  mhd_from?: string
  mhd_to?: string
  lot_patterns?: string[]
  required_evidence_tiers: SourceTier[]
  sources: RecallRuleSource[]
}

export type RecallStatus =
  | 'INCLUDED_IN_OFFICIAL_RECALLS'
  | 'NOT_IN_LISTED_OFFICIAL_RECALLS'
  | 'UNKNOWN_NEEDS_CONFIRMATION'

export interface UpdateEntry {
  id: string
  date: string
  title_ko: string
  summary_ko: string
}
