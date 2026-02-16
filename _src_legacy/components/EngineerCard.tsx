import type { Engineer } from '../types/engineer'

interface EngineerCardProps {
  engineer: Engineer
  size?: 'standard' | 'compact'
  isFavorite?: boolean
}

function EngineerCard({
  engineer,
  size = 'standard',
  isFavorite = false,
}: EngineerCardProps) {
  const isCompact = size === 'compact'
  const cardWidth = isCompact ? 'w-[338px] shrink-0' : 'w-full max-w-[400px]'
  const imageHeight = isCompact ? 'h-[160px]' : 'h-40'
  const topOffset = isCompact ? 'top-3.5' : 'top-4'
  const leftOffset = 'left-4'
  const rightOffset = 'right-4'
  const primaryTags = engineer.tags.slice(0, 3)
  const overflowCount = engineer.tags.length - primaryTags.length

  return (
    <article
      className={`flex h-[338px] flex-col overflow-hidden rounded-[12px] border border-border bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)] ${cardWidth}`}
    >
      <div className={`relative w-full ${imageHeight}`}>
        <img
          src={engineer.imageUrl}
          alt={`${engineer.name} profile`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className={`absolute ${leftOffset} ${topOffset} flex items-center gap-1 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted`}
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4 text-[#ffbd27]"
            aria-hidden="true"
          >
            <path
              d="M10 1.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.5z"
              fill="currentColor"
            />
          </svg>
          <span>{engineer.rating.toFixed(1)}</span>
          <span className="text-ink">({engineer.reviewCount})</span>
        </div>
        <button
          className={`absolute ${rightOffset} ${topOffset} flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white ${
            isFavorite ? 'text-error-500' : 'text-muted'
          }`}
          type="button"
          aria-label="Save engineer"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20.5l-1.5-1.4C6 15 3.5 12.8 3.5 9.9 3.5 7.7 5.2 6 7.4 6c1.2 0 2.3.5 3.1 1.3C11.3 6.5 12.4 6 13.6 6c2.2 0 3.9 1.7 3.9 3.9 0 2.9-2.5 5.1-7 9.2L12 20.5z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-3 py-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[16px] font-semibold text-ink">
                {engineer.name}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-muted">
                <span>{engineer.handle}</span>
                <span>{engineer.title}</span>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-ink">
              {engineer.hourlyRate}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {primaryTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-secondary-100 bg-secondary-25 px-2 py-0.5 text-[10px] font-medium text-muted"
              >
                {tag}
              </span>
            ))}
            {overflowCount > 0 ? (
              <span className="rounded-full border border-secondary-100 bg-secondary-25 px-2 py-0.5 text-[10px] font-medium text-muted">
                +{overflowCount}
              </span>
            ) : null}
          </div>

          <p className="text-[12px] text-muted">{engineer.description}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 text-[12px] text-muted">
          <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-25">
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 text-success-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3.5 8.5l2.3 2.3 6.7-6.7" />
              </svg>
            </span>
            Verified
          </span>
          <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-info-25">
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3 text-info-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 4h10M3 8h10M3 12h6" />
              </svg>
            </span>
            Booked {engineer.bookedCount} times
          </span>
        </div>
      </div>
    </article>
  )
}

export default EngineerCard
