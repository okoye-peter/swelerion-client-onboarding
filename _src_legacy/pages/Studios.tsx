import { useMemo, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import StudioCard from '../components/StudioCard'
import { studios } from '../data/studios'

const filters = ['Pricing', 'Location', 'Availability']
const pageSize = 24
const totalResults = 200

function Studios() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(studios.length / pageSize))

  const pagedStudios = useMemo(() => {
    const start = (page - 1) * pageSize
    return studios.slice(start, start + pageSize)
  }, [page])

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  )

  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />

      <main className="mx-auto flex w-full flex-col gap-10 px-4 py-10 sm:px-6 lg:px-[50px]">
        <div className="flex items-center gap-3 text-[18px] font-medium text-muted">
          <span>Home</span>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-subtle"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
          <span className="font-medium text-ink">Studios</span>
        </div>

        <section className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-[30px] font-semibold leading-[38px] text-ink">
              Browse Studios
            </h1>
            <span className="text-[30px] font-medium leading-[38px] text-muted">
              ({totalResults} results)
            </span>
          </div>
          <p className="text-[16px] font-medium text-muted">
            Find verified studios near you with clear rates, availability and
            equipment details.
          </p>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4">
          <label className="relative w-full max-w-[400px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search by name, location and more..."
              className="h-10 w-full rounded-[8px] border border-border bg-white pl-10 pr-4 text-[16px] font-medium text-ink outline-none placeholder:text-subtle"
            />
          </label>

          <div className="flex items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                className="flex h-9 items-center gap-2 rounded-[8px] border border-border bg-gray-25 px-3 text-[16px] font-medium text-ink"
                type="button"
              >
                {filter}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {pagedStudios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4">
          <button
            className="flex h-9 items-center gap-2 rounded-[8px] border border-border-strong bg-white px-4 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)] disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2 text-[14px] font-medium text-muted">
            {pages.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`flex h-10 w-10 items-center justify-center rounded-[8px] font-inter ${
                  pageNumber === page
                    ? 'bg-primary-25 text-primary-500'
                    : 'text-muted'
                }`}
                type="button"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            className="flex h-9 items-center gap-2 rounded-[8px] border border-border-strong bg-white px-4 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)] disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            onClick={() =>
              setPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={page === totalPages}
          >
            Next
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  )
}

export default Studios
