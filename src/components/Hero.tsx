import { ArrowRight, Sparkles } from 'lucide-react'

function scrollToPlanos() {
  document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 pb-12 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white">
        <Sparkles className="h-7 w-7" />
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400">
        Powered by Claude, da Anthropic
      </span>

      <h1 className="mt-4 text-4xl font-semibold text-neutral-900 dark:text-neutral-50 sm:text-5xl">
        Acesso ao Claude,{' '}
        <span className="text-orange-500">pagando só pelo que usar</span>
      </h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Nada de mensalidade da Anthropic. Aqui você compra créditos de acesso
        ao Claude e usa no seu ritmo — sem fidelidade, sem cota que reseta
        todo mês.
      </p>

      <button
        type="button"
        onClick={scrollToPlanos}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600"
      >
        Ver planos e créditos
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
