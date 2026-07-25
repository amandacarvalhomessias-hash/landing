import { Check, X } from 'lucide-react'

const ROWS = [
  {
    them: 'Mensalidade fixa, mesmo se você não usar',
    us: 'Você paga só pelos créditos que consumir',
  },
  {
    them: 'Cota reseta todo mês — o que sobrou, perdeu',
    us: 'Créditos acumulam até acabar, sem data de validade mensal',
  },
  {
    them: 'Cadastro com aprovação e cartão recorrente',
    us: 'Cadastro simples e acesso liberado na hora',
  },
  {
    them: 'Você não sabe exatamente quanto está gastando',
    us: 'Barra de consumo em tempo real, sempre visível',
  },
]

export default function Comparison() {
  return (
    <section id="comparacao" className="bg-neutral-50 py-16 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
            Por que não é só mais uma assinatura
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Assinaturas tradicionais de IA cobram todo mês, usando ou não. A
            gente resolveu fazer diferente.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-2 bg-white text-sm font-medium dark:bg-neutral-900">
            <div className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
              Assinatura tradicional
            </div>
            <div className="px-5 py-3 text-orange-600 dark:text-orange-400">Claude Pró IA - Créditos</div>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={row.them}
              className={`grid grid-cols-2 text-sm ${
                i % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-950'
              }`}
            >
              <div className="flex items-start gap-2 px-5 py-4 text-neutral-500 dark:text-neutral-400">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {row.them}
              </div>
              <div className="flex items-start gap-2 px-5 py-4 text-neutral-800 dark:text-neutral-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                {row.us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
