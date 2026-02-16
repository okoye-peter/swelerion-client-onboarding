import { useMemo, useState } from 'react'
import EngineerCard from '../components/EngineerCard'
import SiteHeader from '../components/SiteHeader'
import { engineers } from '../data/engineers'
import { Link } from 'react-router-dom'

const filters = ['Pricing', 'Genre', 'Location']
const pageSize = 24

function Engineers() {
    const [page, setPage] = useState(1)
    const [showPersonalSections, setShowPersonalSections] = useState(false)
    const totalPages = Math.max(1, Math.ceil(engineers.length / pageSize))
    const favorites = engineers.slice(0, 4)
    const recent = engineers.slice(4, 8)

    const pagedEngineers = useMemo(() => {
        const start = (page - 1) * pageSize
        return engineers.slice(start, start + pageSize)
    }, [page])

    const pages = useMemo(
        () => Array.from({ length: totalPages }, (_, index) => index + 1),
        [totalPages],
    )

    return (
        <div className="min-h-screen bg-white text-ink">
            <SiteHeader />

            <main className="mx-auto flex w-full flex-col gap-12 px-4 py-10 sm:px-6 lg:px-[50px]">
                <div className="flex items-center gap-3 text-[18px] font-medium text-muted">
                    <span>Home</span>
                    <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-subtle"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                    <span>Select Service</span>
                    <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-subtle"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                    >
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                    <span className="font-normal text-primary-600">Engineers</span>
                </div>

                <section className="relative overflow-hidden rounded-[12px] bg-[linear-gradient(271.4deg,_#3C0D8C_12.29%,_#42660B_79.51%)] px-10 py-4 shadow-[0_1px_3px_rgba(10,13,18,0.1),_0_1px_2px_rgba(10,13,18,0.06)]">
                    <div className="flex items-center justify-between gap-6">
                        <div>
                            <p className="text-[16px] font-medium text-gray-50">
                                Service selected
                            </p>
                            <h1 className="text-[24px] font-semibold text-white">Mixing</h1>
                        </div>
                        {/* <button
                            className="flex items-center gap-2 rounded-[8px] border border-primary-50 bg-primary-50 px-4 py-2 text-[16px] font-bold text-primary-500"
                            type="button"
                        > */}
                        <Link
                            className="flex items-center gap-2 rounded-[8px] border border-primary-50 bg-primary-50 px-4 py-2 text-[16px] font-bold text-primary-500"
                            to={'/services'}
                        >
                            Change Service
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M4 20h4l10-10-4-4L4 16v4z" />
                            </svg>
                        </Link>
                        {/* </button> */}
                    </div>
                </section>

                <section className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-[30px] font-semibold leading-[38px] text-ink">
                                Personal sections
                            </h2>
                            <p className="text-[16px] font-medium text-muted">
                                These show up for returning users once the backend confirms a
                                prior session.
                            </p>
                        </div>
                        <button
                            className="rounded-[8px] border border-border bg-primary-50 px-4 py-2 text-[14px] font-semibold text-primary-500"
                            type="button"
                            onClick={() => setShowPersonalSections((prev) => !prev)}
                        >
                            {showPersonalSections
                                ? 'Hide personal sections'
                                : 'Show personal sections'}
                        </button>
                    </div>

                    {showPersonalSections ? (
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <h3 className="text-[20px] font-semibold text-ink">
                                    Your favourites
                                </h3>
                                <div className="flex gap-6 pb-2 overflow-x-auto">
                                    {favorites.map((engineer) => (
                                        <EngineerCard
                                            key={engineer.id}
                                            engineer={engineer}
                                            size="compact"
                                            isFavorite
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h3 className="text-[20px] font-semibold text-ink">
                                    Recent picks
                                </h3>
                                <div className="flex gap-6 pb-2 overflow-x-auto">
                                    {recent.map((engineer) => (
                                        <EngineerCard
                                            key={engineer.id}
                                            engineer={engineer}
                                            size="compact"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h3 className="text-[20px] font-semibold text-ink">
                                    Recently played
                                </h3>
                                <div className="flex gap-6 pb-2 overflow-x-auto">
                                    {recent.map((engineer) => (
                                        <EngineerCard
                                            key={`${engineer.id}-recently-played`}
                                            engineer={engineer}
                                            size="compact"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </section>

                <section className="flex flex-col gap-2">
                    <h2 className="text-[30px] font-semibold leading-[38px] text-ink">
                        Browse Profiles
                    </h2>
                    <p className="text-[16px] font-medium text-muted">
                        Browse experienced engineers and find the right match for your
                        project.
                    </p>
                </section>

                <section className="flex flex-wrap items-center justify-between gap-4">
                    <label className="relative w-full max-w-[400px]">
                        <span className="absolute -translate-y-1/2 left-3 top-1/2 text-muted">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
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
                            placeholder="Search Engineers"
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
                                    className="w-4 h-4"
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
                    {pagedEngineers.map((engineer) => (
                        <EngineerCard key={engineer.id} engineer={engineer} />
                    ))}
                </section>

                <section className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-border">
                    <button
                        className="flex h-9 items-center gap-2 rounded-[8px] border border-border-strong bg-white px-4 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)] disabled:cursor-not-allowed disabled:opacity-40"
                        type="button"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
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
                                className={`flex h-10 w-10 items-center justify-center rounded-[8px] font-inter ${pageNumber === page
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
                            className="w-5 h-5"
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

export default Engineers
