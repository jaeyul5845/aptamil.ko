import type { RecallRule, RecallStatus, SourceTier } from '../types'

interface CheckerInput {
  country: string
  productTag: string
  mhd?: string
  lot?: string
}

const isDateInRange = (date: string, from?: string, to?: string) => {
  if (!from && !to) return true
  const value = new Date(date).getTime()
  if (Number.isNaN(value)) return false
  if (from && value < new Date(from).getTime()) return false
  if (to && value > new Date(to).getTime()) return false
  return true
}

const matchesLot = (lot: string, patterns?: string[]) => {
  if (!patterns || patterns.length === 0) return true
  return patterns.some((pattern) => {
    try {
      const regex = new RegExp(pattern)
      return regex.test(lot)
    } catch {
      return false
    }
  })
}

const hasOfficialEvidence = (tiers: SourceTier[]) =>
  tiers.includes('OFFICIAL_GOV') || tiers.includes('OFFICIAL_MANUFACTURER')

export const evaluateRecall = (input: CheckerInput, rules: RecallRule[]) => {
  if (!input.country || !input.productTag) {
    return { status: 'UNKNOWN_NEEDS_CONFIRMATION' as RecallStatus, matches: [] }
  }

  const matches = rules.filter((rule) => {
    if (rule.country !== input.country) return false
    if (!rule.product_tags.includes(input.productTag as never)) return false
    if (input.mhd && !isDateInRange(input.mhd, rule.mhd_from, rule.mhd_to)) return false
    if (input.lot && !matchesLot(input.lot, rule.lot_patterns)) return false
    return true
  })

  if (matches.length === 0) {
    return { status: 'NOT_IN_LISTED_OFFICIAL_RECALLS' as RecallStatus, matches }
  }

  const included = matches.some((rule) =>
    hasOfficialEvidence(rule.required_evidence_tiers) &&
    rule.sources.some((source) => hasOfficialEvidence([source.source_tier]))
  )

  if (included) {
    return { status: 'INCLUDED_IN_OFFICIAL_RECALLS' as RecallStatus, matches }
  }

  return { status: 'UNKNOWN_NEEDS_CONFIRMATION' as RecallStatus, matches }
}
