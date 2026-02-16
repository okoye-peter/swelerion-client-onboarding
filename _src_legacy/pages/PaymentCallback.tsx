import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { verifyPayment } from '../services/api'
import {
  LOCAL_STORAGE_KEYS,
  PAYMENT_CALLBACK_COPY,
  UI_MESSAGES,
} from '../constants'

type VerificationState = 'idle' | 'verifying' | 'success' | 'error'

const PaymentCallback = () => {
  const location = useLocation()
  const [status, setStatus] = useState<VerificationState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const reference = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('reference') || params.get('trxref')
  }, [location.search])

  useEffect(() => {
    if (!reference) {
      setStatus('error')
      setErrorMessage(PAYMENT_CALLBACK_COPY.missingReference)
      return
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.PAYMENT_REFERENCE, reference)
    setStatus('verifying')
    setErrorMessage(null)

    verifyPayment(reference)
      .then((result) => {
        if (!result.paid) {
          setStatus('error')
          setErrorMessage(UI_MESSAGES.paymentNotCompleted)
          return
        }
        setStatus('success')
      })
      .catch((err) => {
        const message =
          err instanceof Error ? err.message : UI_MESSAGES.paymentVerifyFailed
        setStatus('error')
        setErrorMessage(message)
      })
  }, [reference])

  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[800px] px-4 pb-16 pt-12 sm:px-6 lg:px-[80px]">
        <div className="rounded-[16px] border border-border-strong bg-white p-8 shadow-[0_8px_16px_rgba(10,13,18,0.06)]">
          <h1 className="text-[28px] font-semibold text-ink">
            {PAYMENT_CALLBACK_COPY.title}
          </h1>

          {status === 'verifying' ? (
            <p className="mt-4 text-[16px] text-muted">
              {PAYMENT_CALLBACK_COPY.verifying}
            </p>
          ) : null}

          {status === 'success' ? (
            <div className="mt-6 space-y-3">
              <h2 className="text-[20px] font-semibold text-ink">
                {PAYMENT_CALLBACK_COPY.successTitle}
              </h2>
              <p className="text-[16px] text-muted">
                {PAYMENT_CALLBACK_COPY.successBody}
              </p>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="mt-6 space-y-3">
              <h2 className="text-[20px] font-semibold text-ink">
                {PAYMENT_CALLBACK_COPY.failureTitle}
              </h2>
              <p className="text-[16px] text-muted">
                {errorMessage || PAYMENT_CALLBACK_COPY.failureBody}
              </p>
            </div>
          ) : null}

          <div className="mt-8 space-y-3">
            <p className="text-[14px] text-muted">
              {PAYMENT_CALLBACK_COPY.closeHint}
            </p>
            <button
              type="button"
              className="rounded-[8px] border border-border-strong px-6 py-2 text-[14px] font-semibold text-ink"
              onClick={() => window.close()}
            >
              {PAYMENT_CALLBACK_COPY.closeButton}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PaymentCallback
