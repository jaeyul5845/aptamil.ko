import { describe, expect, it } from 'vitest'
import { evaluateRecall } from '../utils/recallChecker'
import type { RecallRule } from '../types'

describe('recall checker', () => {
  const baseRule: RecallRule = {
    id: 'rule-1',
    country: 'KR',
    product_tags: ['1'],
    required_evidence_tiers: ['OFFICIAL_GOV'],
    sources: [
      {
        url: 'https://example.com/official',
        source_tier: 'OFFICIAL_GOV',
        last_checked: '2025-12-01',
      },
    ],
  }

  it('returns INCLUDED when official evidence exists', () => {
    const result = evaluateRecall({ country: 'KR', productTag: '1' }, [baseRule])
    expect(result.status).toBe('INCLUDED_IN_OFFICIAL_RECALLS')
  })

  it('returns UNKNOWN when only rumor evidence exists', () => {
    const rumorRule: RecallRule = {
      ...baseRule,
      id: 'rule-2',
      required_evidence_tiers: ['COMMUNITY_RUMOR'],
      sources: [
        {
          url: 'https://example.com/rumor',
          source_tier: 'COMMUNITY_RUMOR',
          last_checked: '2025-12-01',
        },
      ],
    }
    const result = evaluateRecall({ country: 'KR', productTag: '1' }, [rumorRule])
    expect(result.status).toBe('UNKNOWN_NEEDS_CONFIRMATION')
  })

  it('returns NOT_IN_LISTED when no rules match', () => {
    const result = evaluateRecall({ country: 'KR', productTag: 'AR' }, [baseRule])
    expect(result.status).toBe('NOT_IN_LISTED_OFFICIAL_RECALLS')
  })
})
