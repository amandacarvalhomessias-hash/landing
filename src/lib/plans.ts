// Precisa ficar em sincronia manual com backend/src/plans.py (PLANS)
export interface PlanTier {
  id: string
  priceReais: number
  priceCents: number
  credits: number
}

export interface PlanGroup {
  id: string
  name: string
  tagline: string
  description: string
  tiers: PlanTier[]
}

export const PLAN_GROUPS: PlanGroup[] = [
  {
    id: 'basico',
    name: 'Básico',
    tagline: 'Pra começar sem gastar quase nada',
    description:
      'A porta de entrada mais barata: tirar dúvidas rápidas, escrever e revisar textos simples. Ótimo pra conhecer o produto antes de subir de plano.',
    tiers: [{ id: 'basico_5', priceReais: 0.01, priceCents: 1, credits: 500_000 }],
  },
  {
    id: 'dia_a_dia',
    name: 'Dia a dia',
    tagline: 'Pra usar sem preocupação, todo santo dia',
    description:
      'Tirar dúvidas, escrever e revisar textos, resumir documentos, ajudar no trabalho e nos estudos. Rápido, inteligente e dá conta de praticamente tudo que você precisa no dia a dia.',
    tiers: [
      { id: 'dia_a_dia_12', priceReais: 0.01, priceCents: 1, credits: 10_000 },
      { id: 'dia_a_dia_45', priceReais: 45, priceCents: 4500, credits: 4_500_000 },
      { id: 'dia_a_dia_60', priceReais: 60, priceCents: 6000, credits: 6_000_000 },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'O nível mais alto de inteligência disponível',
    description:
      'Pra tarefas complexas, análises profundas, código mais elaborado ou qualquer coisa que exija o máximo de qualidade na resposta — usando o modelo mais avançado que existe.',
    tiers: [
      { id: 'premium_60', priceReais: 0.01, priceCents: 1, credits: 10_000 },
      { id: 'premium_90', priceReais: 90, priceCents: 9000, credits: 9_000_000 },
      { id: 'premium_120', priceReais: 120, priceCents: 12000, credits: 12_000_000 },
    ],
  },
]

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
