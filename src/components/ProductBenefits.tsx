import { Activity, Coins, Rocket, Wallet } from 'lucide-react'

const BENEFITS = [
  {
    icon: Rocket,
    title: 'É o Claude, da Anthropic',
    description:
      'Não é uma IA genérica — você conversa com o Claude de verdade, um dos modelos mais avançados que existem hoje, para dúvidas, trabalho, estudo ou o que precisar.',
  },
  {
    icon: Wallet,
    title: 'Você paga só pelo que usar',
    description:
      'Nada de mensalidade fixa. Compre créditos uma vez e use no seu ritmo, sem cobrança recorrente no cartão.',
  },
  {
    icon: Coins,
    title: 'Créditos não expiram por mês',
    description:
      'Diferente de uma cota mensal, seu saldo fica disponível até acabar — não existe "perder o que sobrou" no fim do mês.',
  },
  {
    icon: Activity,
    title: 'Consumo transparente',
    description:
      'Acompanhe em tempo real quanto você já usou e quanto ainda tem disponível, sem letras miúdas.',
  },
]

export default function ProductBenefits() {
  return (
    <section id="produto" className="mx-auto max-w-5xl px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
          O que é o Assistente
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Um jeito simples e direto de ter acesso a uma IA poderosa, sem os
          compromissos de uma assinatura tradicional.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <benefit.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-neutral-900 dark:text-neutral-50">
              {benefit.title}
            </h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
