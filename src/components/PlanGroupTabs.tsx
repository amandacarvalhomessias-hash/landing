import { Check } from 'lucide-react'
import type { PlanGroup } from '../lib/plans'

export default function PlanGroupTabs({
  groups,
  selectedId,
  onSelect,
}: {
  groups: PlanGroup[]
  selectedId: string
  onSelect: (groupId: string) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groups.map((group) => {
        const selected = group.id === selectedId
        return (
          <button
            key={group.id}
            type="button"
            onClick={() => onSelect(group.id)}
            className={`rounded-2xl border p-6 text-left transition-colors ${
              selected
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {group.name}
              </span>
              {selected && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-medium text-orange-600 dark:text-orange-400">
              {group.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {group.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
