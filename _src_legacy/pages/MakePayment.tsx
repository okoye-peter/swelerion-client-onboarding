import { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import paystackLogo from '../assets/paystack.png'
import successIcon from '../assets/success-icon.png'
import { initializePayment, verifyPayment } from '../services/api'
import {
  BOOKING_DETAILS,
  BOOKING_STEP_TITLES,
  COPY,
  CURRENCY_SYMBOL,
  DEFAULT_CUSTOMER_EMAIL,
  LOCAL_STORAGE_KEYS,
  PAYMENT_PAGE_COPY,
  PAYMENT_REFERENCE_PREFIX,
  PAYSTACK_CALLBACK_URL,
  PAYSTACK_CURRENCY,
  UI_MESSAGES,
} from '../constants'

const steps = [
  { label: BOOKING_STEP_TITLES[0], status: 'completed' },
  { label: BOOKING_STEP_TITLES[1], status: 'active' },
  { label: BOOKING_STEP_TITLES[2], status: 'upcoming' },
  { label: BOOKING_STEP_TITLES[3], status: 'upcoming' },
]

function StepChip({
  label,
  status,
}: {
  label: string
  status: 'completed' | 'active' | 'upcoming'
}) {
  const isActive = status !== 'upcoming'
  return (
    <div
      className={`flex items-center gap-3 rounded-[12px] px-3 py-2 ${
        isActive ? 'bg-secondary-25 text-[#5E9110]' : 'text-muted'
      }`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isActive ? 'bg-secondary-100' : 'bg-[#F5F5F5]'
        }`}
      >
        {status === 'completed' ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M6 12l4 4 8-8" />
          </svg>
        ) : status === 'active' ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 4h16V8H4v2zm4 5h6v-2H8v2z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 3l4 4h-3v6h-2V7H8l4-4zm-7 12h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z" />
          </svg>
        )}
      </span>
      <span
        className={`text-[20px] tracking-[-0.03em] ${
          isActive ? 'font-semibold' : 'font-medium'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function MakePayment() {
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [paymentReference, setPaymentReference] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState('')

  const storedTotal = Number(
    localStorage.getItem(LOCAL_STORAGE_KEYS.ORDER_TOTAL) ?? '0',
  )
  const orderTotal = Number.isFinite(storedTotal) ? storedTotal : 0
  const orderTotalInKobo = Math.round(orderTotal * 100)
  const customerEmail = DEFAULT_CUSTOMER_EMAIL
  const isPaymentReady = orderTotalInKobo > 0

  const handleInitializePayment = async () => {
    if (orderTotalInKobo <= 0) {
      setPaymentError(UI_MESSAGES.paymentTotalInvalid)
      return
    }
    setIsInitializing(true)
    setPaymentError('')
    try {
      const response = await initializePayment({
        email: customerEmail,
        amount: orderTotalInKobo,
        currency: PAYSTACK_CURRENCY,
        reference: `${PAYMENT_REFERENCE_PREFIX}${Date.now()}`,
        callbackUrl: PAYSTACK_CALLBACK_URL,
      })
      setPaymentReference(response.reference)
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.PAYMENT_REFERENCE,
        response.reference,
      )
      window.open(response.authorizationUrl, '_blank', 'noopener,noreferrer')
      setShowPaymentSuccess(true)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : UI_MESSAGES.paymentInitFailed
      setPaymentError(message)
    } finally {
      setIsInitializing(false)
    }
  }

  const handleVerifyPayment = async () => {
    const reference =
      paymentReference ||
      localStorage.getItem(LOCAL_STORAGE_KEYS.PAYMENT_REFERENCE)
    if (!reference) {
      setPaymentError(UI_MESSAGES.paymentReferenceMissing)
      return
    }
    setIsVerifying(true)
    setPaymentError('')
    try {
      const result = await verifyPayment(reference)
      if (!result.paid) {
        setPaymentError(UI_MESSAGES.paymentNotCompleted)
        return
      }
      setShowPaymentSuccess(false)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : UI_MESSAGES.paymentVerifyFailed
      setPaymentError(message)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 sm:px-6 lg:px-[80px]">
        <Link
          to="/project-booking"
          className="flex items-center gap-3 text-[18px] font-medium tracking-[-0.03em] text-ink"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#F5F5F5] text-ink">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          {COPY.goBack}
        </Link>

        <section className="mt-10">
          <div className="flex flex-nowrap items-center gap-4 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className="flex shrink-0 items-center gap-4"
              >
                <StepChip label={step.label} status={step.status as any} />
                {index < steps.length - 1 ? (
                  <span className="hidden h-px w-[120px] shrink-0 border-t border-dashed border-[#A4A7AE] lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-display text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-ink">
              {PAYMENT_PAGE_COPY.bookingDetailsTitle}
            </h2>

            <div className="space-y-6 rounded-[12px] bg-gray-25 p-6">
              <div className="flex items-center justify-between text-[20px] font-semibold tracking-[-0.03em] text-[#414651]">
                <span>{PAYMENT_PAGE_COPY.projectIdLabel}</span>
                <span>{PAYMENT_PAGE_COPY.projectIdValue}</span>
              </div>
              <div className="h-px w-full bg-border-strong" />

              <div className="space-y-4">
                {BOOKING_DETAILS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-[16px] font-medium tracking-[-0.03em]"
                  >
                    <span className="text-muted">{item.label}</span>
                    <span className="text-ink">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="inline-flex items-center gap-2 rounded-[8px] bg-primary-50 px-4 py-2 text-[16px] font-bold tracking-[-0.03em] text-primary-500"
              type="button"
            >
              {COPY.editProject}
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 20h4l10-10-4-4L4 16v4z" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-ink">
              {PAYMENT_PAGE_COPY.checkoutTitle}
            </h2>

            <div className="rounded-[8px] bg-secondary-25 px-4 py-3 text-[20px] font-semibold tracking-[-0.03em] text-ink">
              <div className="flex items-center justify-between">
                <span>{COPY.orderTotalLabel}</span>
                <span>{`${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="space-y-4 rounded-[12px] bg-white p-4 shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
              <div className="space-y-2">
                <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#414651]">
                  {COPY.payWithPaystack}
                </h3>
                <div className="h-px w-full bg-border-strong" />
              </div>

              <div className="flex items-center gap-2 text-[16px] font-medium text-muted">
                {UI_MESSAGES.paystackPoweredBy}
                <img
                  src={paystackLogo}
                  alt="Paystack"
                  className="h-4 w-auto"
                />
              </div>
              <div className="rounded-[8px] border border-border-strong bg-secondary-25 px-4 py-3 text-[16px] text-muted">
                {UI_MESSAGES.paystackCheckoutNote}
              </div>
              <button
                className={`w-full rounded-[8px] px-6 py-3 text-[14px] font-semibold tracking-[-0.03em] ${
                  isPaymentReady
                    ? 'bg-success-500 text-white'
                    : 'bg-border text-subtle'
                }`}
                type="button"
                disabled={!isPaymentReady || isInitializing}
                onClick={handleInitializePayment}
              >
                {isInitializing
                  ? UI_MESSAGES.paymentRedirecting
                  : `${PAYMENT_PAGE_COPY.payButtonPrefix} ${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`}
              </button>
              {paymentError ? (
                <p className="text-sm text-red-600">{paymentError}</p>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      {showPaymentSuccess ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/25 backdrop-blur-md"
            type="button"
            aria-label="Close payment success dialog"
            onClick={() => setShowPaymentSuccess(false)}
          />
          <div
            className="relative z-10 w-[90%] max-w-[520px] rounded-[12px] bg-white p-6 shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03)]"
            role="dialog"
            aria-modal="true"
            aria-label="Payment Successful"
          >
            <div className="space-y-8">
              <img
                src={successIcon}
                alt="Payment success"
                className="h-12 w-12"
              />

              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#181D27]">
                  {UI_MESSAGES.paymentInitializedTitle}
                </h3>
                <p className="text-[16px] font-medium tracking-[-0.03em] text-muted">
                  {UI_MESSAGES.paymentInitializedBody}
                </p>
              </div>

              {paymentError ? (
                <p className="text-sm text-red-600">{paymentError}</p>
              ) : null}

              <button
                className="w-full rounded-[8px] bg-primary-500 px-6 py-2 text-[16px] font-semibold tracking-[-0.03em] text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                type="button"
                onClick={handleVerifyPayment}
                disabled={isVerifying}
              >
                {isVerifying
                  ? UI_MESSAGES.paymentVerifyLoading
                  : UI_MESSAGES.paymentVerifyButton}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MakePayment
