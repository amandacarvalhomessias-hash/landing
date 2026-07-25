import { Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import type { SignupResult } from '../lib/api'

// TODO: substituir pelos canais reais assim que o usuário passar os dados.
const WHATSAPP_URL = 'https://wa.me/5500000000000'
const INSTAGRAM_URL = 'https://instagram.com/seuinstagram'
const SUPPORT_EMAIL = 'suporte@bulbeenergia.com.br'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174 4 4 0 0 1 7.914-1.174z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function SuccessScreen({ result }: { result: SignupResult }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white">
        <Check className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
        Conta criada!
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Obrigado por confiar na Claude Pró IA - Créditos. Guarde este token — é ele que dá
        acesso à sua conta ({result.credits.toLocaleString('pt-BR')} créditos,
        plano {result.plan}).
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 dark:border-neutral-700 dark:bg-neutral-900">
        <code className="flex-1 overflow-x-auto whitespace-nowrap text-left text-sm text-neutral-800 dark:text-neutral-200">
          {result.token}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-600"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Cole esse token na tela de acesso do chat pra começar a usar.
      </p>

      <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 dark:border-neutral-800 dark:bg-neutral-900/60">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          Precisa de ajuda?
        </h2>
        <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
          Fale com a gente por qualquer um destes canais.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-orange-500 hover:text-orange-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-orange-500 hover:text-orange-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-orange-500 hover:text-orange-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
          >
            <Mail className="h-4 w-4" />
            E-mail
          </a>
        </div>
      </div>
    </div>
  )
}
