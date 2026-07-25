const CHECKOUT_URL =
  import.meta.env.VITE_CHECKOUT_URL ?? 'https://ia-backend-8q1m.onrender.com/checkout'
const CHECKOUT_STATUS_URL =
  import.meta.env.VITE_CHECKOUT_STATUS_URL ??
  'https://ia-backend-8q1m.onrender.com/checkout/status'

export interface CheckoutData {
  name: string
  email: string
  phone: string
  plan: string
}

export interface SignupResult {
  token: string
  plan: string
  credits: number
}

export interface PixCharge {
  requiresPayment: true
  orderId: string
  qrCode: string
  plan: string
  credits: number
}

export type CheckoutResult = ({ requiresPayment: false } & SignupResult) | PixCharge

export async function checkout(data: CheckoutData): Promise<CheckoutResult> {
  const response = await fetch(CHECKOUT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.error ?? 'Falha ao iniciar o cadastro. Tente novamente.')
  }

  if (body.requires_payment) {
    return {
      requiresPayment: true,
      orderId: body.order_id,
      qrCode: body.qr_code,
      plan: body.plan,
      credits: body.credits,
    }
  }

  return { requiresPayment: false, token: body.token, plan: body.plan, credits: body.credits }
}

export type CheckoutStatus =
  | { status: 'paid'; token: string; plan: string; credits: number }
  | { status: 'pending' | 'canceled' | 'processing' | 'failed' }

export async function checkCheckoutStatus(orderId: string): Promise<CheckoutStatus> {
  const response = await fetch(
    `${CHECKOUT_STATUS_URL}?order_id=${encodeURIComponent(orderId)}`,
  )
  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.error ?? 'Falha ao consultar o status do pagamento.')
  }

  return body
}
