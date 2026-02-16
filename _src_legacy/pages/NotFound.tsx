import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Signal lost
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          We could not find that page.
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          The route might have moved or is waiting on backend sync.
        </p>
        <Link
          className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
          to="/"
        >
          Return to Engineers
        </Link>
      </div>
    </div>
  )
}

export default NotFound
