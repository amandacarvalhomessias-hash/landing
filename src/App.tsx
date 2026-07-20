import { useState } from 'react'
import Comparison from './components/Comparison'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PixPayment from './components/PixPayment'
import ProductBenefits from './components/ProductBenefits'
import SignupForm from './components/SignupForm'
import SuccessScreen from './components/SuccessScreen'
import type { CheckoutResult, PixCharge, SignupResult } from './lib/api'

export default function App() {
  const [result, setResult] = useState<SignupResult | null>(null)
  const [pendingCharge, setPendingCharge] = useState<PixCharge | null>(null)

  const handleCheckoutResult = (checkoutResult: CheckoutResult) => {
    if (checkoutResult.requiresPayment) {
      setPendingCharge(checkoutResult)
    } else {
      setResult(checkoutResult)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <SuccessScreen result={result} />
      </div>
    )
  }

  if (pendingCharge) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <PixPayment charge={pendingCharge} onPaid={setResult} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      <Hero />
      <ProductBenefits />
      <Comparison />

      <section id="planos" className="mx-auto max-w-4xl px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
            Escolha seu plano e comece agora
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Escolha a categoria, depois quantos créditos quer comprar. Preencha
            seus dados e pague via PIX pra receber o token na hora.
          </p>
        </div>
        <div className="mt-10">
          <SignupForm onResult={handleCheckoutResult} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
