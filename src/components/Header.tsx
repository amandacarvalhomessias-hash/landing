import { Sparkles } from 'lucide-react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <span className="font-semibold text-neutral-900 dark:text-neutral-50">Assistente</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 sm:flex">
          <button type="button" onClick={() => scrollTo('produto')} className="hover:text-neutral-900 dark:hover:text-neutral-100">
            Produto
          </button>
          <button type="button" onClick={() => scrollTo('comparacao')} className="hover:text-neutral-900 dark:hover:text-neutral-100">
            Por que somos diferentes
          </button>
          <button type="button" onClick={() => scrollTo('planos')} className="hover:text-neutral-900 dark:hover:text-neutral-100">
            Planos
          </button>
        </nav>

        <button
          type="button"
          onClick={() => scrollTo('planos')}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Criar conta
        </button>
      </div>
    </header>
  )
}
