import rawSources from './sources.json'
import rawArchive from './archive.json'
import rawRules from './recall_rules.json'
import rawUpdates from './updates.json'
import type { ArchiveItem, RecallRule, SourceEntry, UpdateEntry } from '../types'
import { normalizeArchive, validateArchive, validateRecallRules, validateSources, validateUpdates } from '../utils/validate'

const sourceResult = validateSources(rawSources)
const archiveResult = validateArchive(rawArchive)
const rulesResult = validateRecallRules(rawRules)
const updatesResult = validateUpdates(rawUpdates)

export const dataErrors = [
  ...sourceResult.errors,
  ...archiveResult.errors,
  ...rulesResult.errors,
  ...updatesResult.errors,
]

export const sources: SourceEntry[] = sourceResult.ok ? sourceResult.data ?? [] : []
export const archive: ArchiveItem[] =
  archiveResult.ok && archiveResult.data ? normalizeArchive(archiveResult.data) : []
export const recallRules: RecallRule[] = rulesResult.ok ? rulesResult.data ?? [] : []
export const updates: UpdateEntry[] = updatesResult.ok ? updatesResult.data ?? [] : []
