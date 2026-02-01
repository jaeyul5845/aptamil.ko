import { describe, expect, it } from 'vitest'
import { scoreToLabel, sourceTierScores } from '../utils/credibility'

describe('credibility mapping', () => {
  it('maps score ranges to labels', () => {
    expect(scoreToLabel(95)).toBe('공식(매우 높음)')
    expect(scoreToLabel(80)).toBe('준공식/신뢰 높음')
    expect(scoreToLabel(55)).toBe('언론/참고(중간)')
    expect(scoreToLabel(20)).toBe('카더라/미확인(낮음)')
  })

  it('maps tiers to expected scores', () => {
    expect(sourceTierScores.OFFICIAL_GOV).toBe(95)
    expect(sourceTierScores.OFFICIAL_MANUFACTURER).toBe(90)
    expect(sourceTierScores.OFFICIAL_RETAILER).toBe(80)
    expect(sourceTierScores.REPUTABLE_MEDIA).toBe(65)
    expect(sourceTierScores.COMMUNITY_RUMOR).toBe(25)
    expect(sourceTierScores.UNKNOWN).toBe(10)
  })
})
