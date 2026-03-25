const STORAGE_KEY = 'helpbeat-dashboard-activity'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readActivity() {
  if (!canUseStorage()) return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeActivity(items) {
  if (!canUseStorage()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function getDashboardActivity() {
  return readActivity().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function addDashboardActivity(entry) {
  const items = readActivity()
  const nextItems = [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      ...entry,
    },
    ...items,
  ]

  writeActivity(nextItems)
  return nextItems
}
