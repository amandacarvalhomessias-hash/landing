import { useState } from 'react'
import { checkout } from '../lib/api'
import type { CheckoutResult } from '../lib/api'
import { PLAN_GROUPS } from '../lib/plans'
import PlanCard from './PlanCard'
import PlanGroupTabs from './PlanGroupTabs'

export default function SignupForm({ onResult }: { onResult: (result: CheckoutResult) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [groupId, setGroupId] = useState(PLAN_GROUPS[0].id)
  const [tierId, setTierId] = useState(PLAN_GROUPS[0].tiers[1].id)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedGroup = PLAN_GROUPS.find((g) => g.id === groupId) ?? PLAN_GROUPS[0]

  const handleSelectGroup = (newGroupId: string) => {
    setGroupId(newGroupId)
    const group = PLAN_GROUPS.find((g) => g.id === newGroupId)
    if (group) setTierId(group.tiers[1].id)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const result = await checkout({ name, email, phone, plan: tierId })
      onResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <PlanGroupTabs groups={PLAN_GROUPS} selectedId={groupId} onSelect={handleSelectGroup} />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {selectedGroup.tiers.map((tier) => (
          <PlanCard
            key={tier.id}
            tier={tier}
            selected={tierId === tier.id}
            onSelect={() => setTierId(tier.id)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="rounded-lg border border-neutral-300 bg-transparent px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-700 dark:text-neutral-100"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="rounded-lg border border-neutral-300 bg-transparent px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-700 dark:text-neutral-100"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Seu telefone (com DDD)"
          className="rounded-lg border border-neutral-300 bg-transparent px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-neutral-700 dark:text-neutral-100"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-medium text-white transition-opacity hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? 'Processando...' : 'Gerar QR code PIX'}
      </button>
    </form>
  )
}
