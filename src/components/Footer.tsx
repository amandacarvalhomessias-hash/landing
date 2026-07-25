export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Claude Pró IA - Créditos. Todos os direitos reservados.</p>
        <p className="mt-1">Créditos não são reembolsáveis e não expiram por período mensal.</p>
        <p className="mt-1">
          Utiliza a API do Claude, da Anthropic. Este produto é independente e
          não é afiliado, endossado ou operado pela Anthropic.
        </p>
      </div>
    </footer>
  )
}
