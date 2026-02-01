import type {
  ArchiveItem,
  RecallRule,
  SourceEntry,
  UpdateEntry,
} from '../types'
import { scoreToLabel, sourceTierScores, tierToCredibility } from './credibility'

const isString = (value: unknown): value is string => typeof value === 'string'
const isArray = (value: unknown): value is unknown[] => Array.isArray(value)

const validateDate = (value: unknown) => isString(value) && /\d{4}-\d{2}-\d{2}/.test(value)

export const validateSources = (data: unknown) => {
  const errors: string[] = []
  if (!isArray(data)) {
    return { ok: false, errors: ['sources.json must be an array'] }
  }

  const sources: SourceEntry[] = []
  for (const item of data) {
    if (!item || typeof item !== 'object') {
      errors.push('Invalid source entry')
      continue
    }
    const source = item as SourceEntry
    if (!isString(source.id) || !isString(source.name)) {
      errors.push('Source entry missing id or name')
    }
    if (!validateDate(source.last_checked)) {
      errors.push(`Source ${source.id} has invalid last_checked`) }
    if (!(source.source_tier in sourceTierScores)) {
      errors.push(`Source ${source.id} has invalid source_tier`) }
    sources.push(source)
  }

  return { ok: errors.length === 0, errors, data: sources }
}

export const validateArchive = (data: unknown) => {
  const errors: string[] = []
  if (!isArray(data)) {
    return { ok: false, errors: ['archive.json must be an array'] }
  }

  const archive: ArchiveItem[] = []
  for (const item of data) {
    if (!item || typeof item !== 'object') {
      errors.push('Invalid archive entry')
      continue
    }
    const entry = item as ArchiveItem
    if (!isString(entry.id) || !isString(entry.slug) || !isString(entry.title_ko)) {
      errors.push('Archive entry missing id, slug, or title_ko')
    }
    if (!validateDate(entry.published_at) || !validateDate(entry.last_checked)) {
      errors.push(`Archive entry ${entry.id} has invalid dates`) }
    if (!isArray(entry.sources) || entry.sources.length === 0) {
      errors.push(`Archive entry ${entry.id} must include sources`) }
    if (!entry.credibility || !(entry.credibility.source_tier in sourceTierScores)) {
      errors.push(`Archive entry ${entry.id} has invalid credibility`) }
    archive.push(entry)
  }

  return { ok: errors.length === 0, errors, data: archive }
}

export const normalizeArchive = (data: ArchiveItem[]) =>
  data.map((item) => {
    const credibility = tierToCredibility(item.credibility.source_tier)
    return {
      ...item,
      credibility,
      sources: item.sources.map((source) => ({
        ...source,
        source_tier: source.source_tier,
      })),
    }
  })

export const validateRecallRules = (data: unknown) => {
  const errors: string[] = []
  if (!isArray(data)) {
    return { ok: false, errors: ['recall_rules.json must be an array'] }
  }

  const rules: RecallRule[] = []
  for (const item of data) {
    if (!item || typeof item !== 'object') {
      errors.push('Invalid recall rule')
      continue
    }
    const rule = item as RecallRule
    if (!isString(rule.id)) {
      errors.push('Recall rule missing id')
    }
    if (!isArray(rule.sources) || rule.sources.length === 0) {
      errors.push(`Recall rule ${rule.id} must include sources`) }
    if (!isArray(rule.required_evidence_tiers)) {
      errors.push(`Recall rule ${rule.id} must include required_evidence_tiers`) }
    rules.push(rule)
  }

  return { ok: errors.length === 0, errors, data: rules }
}

export const validateUpdates = (data: unknown) => {
  const errors: string[] = []
  if (!isArray(data)) {
    return { ok: false, errors: ['updates.json must be an array'] }
  }

  const updates: UpdateEntry[] = []
  for (const item of data) {
    if (!item || typeof item !== 'object') {
      errors.push('Invalid update entry')
      continue
    }
    const update = item as UpdateEntry
    if (!isString(update.id) || !isString(update.title_ko)) {
      errors.push('Update entry missing id or title_ko')
    }
    if (!validateDate(update.date)) {
      errors.push(`Update ${update.id} has invalid date`) }
    updates.push(update)
  }

  return { ok: errors.length === 0, errors, data: updates }
}

export const getCredibilityLabel = (score: number) => scoreToLabel(score)
