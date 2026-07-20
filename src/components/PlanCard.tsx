import { Check } from 'lucide-react'
import { formatPrice } from '../lib/plans'
import type { PlanTier } from '../lib/plans'

// Estimativa grosseira: uma pergunta/resposta típica gira em torno de 400
// créditos (tokens). Serve só pra dar uma noção de "quanto dá pra usar".
const CREDITS_PER_MESSAGE_ESTIMATE = 400

export default function PlanCard({
  tier,
  selected,
  onSelect,
}: {
  tier: PlanTier
  selected: boolean
  onSelect: () => void
}) {
  const estimatedMessages = Math.round(tier.credits / CREDITS_PER_MESSAGE_ESTIMATE)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex-1 rounded-2xl border p-6 text-left transition-colors ${
        selected
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
          : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {formatPrice(tier.priceCents)}
        </span>
        {selected && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
            <Check className="h-4 w-4" />
          </span>
        )}
      </div>

      <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {tier.credits.toLocaleString('pt-BR')} créditos
      </p>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        ≈ {estimatedMessages.toLocaleString('pt-BR')} mensagens trocadas com a IA
      </p>
      <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
        Créditos não expiram por mês — use no seu ritmo até acabar.
      </p>
    </button>
  )
}
