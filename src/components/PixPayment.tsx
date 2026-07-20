import { Check, Copy, Loader2 } from 'lucide-react'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { checkCheckoutStatus } from '../lib/api'
import type { PixCharge, SignupResult } from '../lib/api'

const POLL_INTERVAL_MS = 3000

export default function PixPayment({
  charge,
  onPaid,
}: {
  charge: PixCharge
  onPaid: (result: SignupResult) => void
}) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [qrImage, setQrImage] = useState<string | null>(null)

  // O QR code é só uma representação visual do próprio "copia e cola" — a
  // Efí não devolve uma imagem pronta, então geramos ela aqui no navegador.
  useEffect(() => {
    QRCode.toDataURL(charge.qrCode, { width: 256, margin: 1 })
      .then(setQrImage)
      .catch(() => setQrImage(null))
  }, [charge.qrCode])

  useEffect(() => {
    let cancelled = false

    const poll = async () => {
      try {
        const status = await checkCheckoutStatus(charge.orderId)
        if (cancelled) return

        if (status.status === 'paid') {
          onPaid({ token: status.token, plan: status.plan, credits: status.credits })
          return
        }
        if (status.status === 'canceled' || status.status === 'failed') {
          setError('O pagamento não foi concluído. Gere um novo QR code e tente novamente.')
          return
        }
        setTimeout(poll, POLL_INTERVAL_MS)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Erro ao consultar o pagamento.')
        setTimeout(poll, POLL_INTERVAL_MS)
      }
    }

    const timer = setTimeout(poll, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [charge.orderId, onPaid])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(charge.qrCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
        Escaneie o QR code pra pagar
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Assim que o pagamento cair, seu token aparece aqui automaticamente.
      </p>

      <div className="mt-6 flex h-56 items-center justify-center">
        {qrImage ? (
          <img
            src={qrImage}
            alt="QR code do PIX"
            className="h-56 w-56 rounded-lg border border-neutral-200 dark:border-neutral-800"
          />
        ) : (
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        )}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2.5 dark:border-neutral-700 dark:bg-neutral-900">
        <code className="flex-1 overflow-x-auto whitespace-nowrap text-left text-xs text-neutral-800 dark:text-neutral-200">
          {charge.qrCode}
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

      {error ? (
        <p className="mt-6 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Aguardando confirmação do pagamento...
        </div>
      )}
    </div>
  )
}
