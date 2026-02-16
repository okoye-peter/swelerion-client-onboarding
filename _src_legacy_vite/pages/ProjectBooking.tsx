import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { engineers } from '../data/engineers'

const addOns = [
  'Add Alts',
  'Add Mastering',
  'Add Instrumental',
  'Add Dolby Atmos',
]

const socialLinks = [
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13.5 9.5V8a2 2 0 0 1 2-2h2V3h-2.2C12.6 3 11 4.6 11 7.3V9.5H9v3h2V21h3v-8.5H17l.6-3H13.5z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zM17.5 6.7a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M16 3c.4 2.2 2.2 4 4 4v3c-1.6.1-3.2-.4-4-1.2V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1V13a2 2 0 1 0 2 2V3h2z" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M17.3 3H21l-7.3 8.3L22 21h-6.2l-4.9-5.7L5.6 21H2l7.7-8.8L2 3h6.3l4.4 5.1L17.3 3z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M21.6 8.2a3 3 0 0 0-2.1-2.1C17.7 5.5 12 5.5 12 5.5s-5.7 0-7.5.6A3 3 0 0 0 2.4 8.2C2 9.9 2 12 2 12s0 2.1.4 3.8a3 3 0 0 0 2.1 2.1c1.8.6 7.5.6 7.5.6s5.7 0 7.5-.6a3 3 0 0 0 2.1-2.1c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8zM10 15.2V8.8L15.5 12 10 15.2z" />
      </svg>
    ),
  },
  {
    label: 'Threads',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3c4.6 0 7.4 2.6 7.7 6.8h-2.6C16.9 7.5 15 5.9 12 5.9c-3.2 0-5.3 1.8-5.3 4.7 0 2.4 1.6 3.9 4.4 4.3l1.8.2c2.5.3 3.6 1 3.6 2.3 0 1.5-1.6 2.6-4 2.6-2.6 0-4.4-1.2-4.7-3.3H5.2c.2 3.5 3.1 5.9 6.9 5.9 3.8 0 6.7-2.1 6.7-5.2 0-2.6-1.8-4.1-5.4-4.6l-1.8-.2c-2.3-.3-3.2-1-3.2-2.2 0-1.4 1.4-2.4 3.6-2.4 2.3 0 3.7 1 4.2 2.7h2.5c-.4-3.1-2.7-5.5-6.9-5.5z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm4.1 12.9a.8.8 0 0 1-1.1.2 7.5 7.5 0 0 0-6.3-.7.8.8 0 1 1-.5-1.5 9.1 9.1 0 0 1 7.7.9.8.8 0 0 1 .2 1.1zm1-2.5a1 1 0 0 1-1.3.3 8.9 8.9 0 0 0-7.6-.8 1 1 0 1 1-.6-1.8 10.6 10.6 0 0 1 9.1.9 1 1 0 0 1 .3 1.4zm.1-2.8a1.2 1.2 0 0 1-1.6.4A11.4 11.4 0 0 0 7 9.9a1.2 1.2 0 0 1-.7-2.3 13.7 13.7 0 0 1 9.9 1.2 1.2 1.2 0 0 1 .4 1.8z" />
      </svg>
    ),
  },
  {
    label: 'Apple Music',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M15 4v10.1a3.5 3.5 0 1 0 2 3.2V8h3V4h-5z" />
        <path d="M8 6v11.1a3.5 3.5 0 1 0 2 3.2V10h3V6H8z" />
      </svg>
    ),
  },
]

const stepItems = [
  {
    label: 'Enter Project Details',
    isActive: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm3 3v6l4-3-4-3z" />
      </svg>
    ),
  },
  {
    label: 'Make Payment',
    isActive: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 4h16V8H4v2zm4 5h6v-2H8v2z" />
      </svg>
    ),
  },
  {
    label: 'Upload Files',
    isActive: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 3l4 4h-3v6h-2V7H8l4-4zm-7 12h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z" />
      </svg>
    ),
  },
  {
    label: 'Project Workspace',
    isActive: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm5 4h6v2H9V9zm0 4h8v2H9v-2z" />
      </svg>
    ),
  },
]

const serviceInfoSections = [
  {
    title: 'What You Get With This Service',
    items: [
      'Balanced levels across all vocal and instrumental tracks',
      'Cleaned and enhanced vocals',
      'EQ, compression, and effects applied for clarity and depth',
      'A cohesive mix that feels polished and ready for mastering',
      'A preview version for review and feedback',
    ],
  },
  {
    title: 'What do I need to get started ?',
    items: [
      'Separate beat and vocal files',
      'High-quality audio files (WAV recommended)',
      'Stems properly labeled for easy workflow',
      'Any notes, references or examples of your preferred sound',
      'Optional: Effects or creative directions you want the engineer to follow',
    ],
  },
]

const changeServiceOptions = [
  {
    title: 'Mixing',
    description:
      'Get your tracks balanced and polished. Blend your vocals and instruments to create a clean, cohesive sound ready for the final master.',
  },
  {
    title: 'Mastering',
    description:
      'Give your tracks its final polish. Improved loudness, clarity and overall balance so your music sounds professional and consistent on all speakers and streaming platforms.',
  },
  {
    title: 'Dolby ATMOS',
    description:
      'Give your tracks a three-dimensional immersive sound. Enhanced music depth, movement and a more realistic listening experience.',
  },
]

function ProjectBooking() {
  const navigate = useNavigate()
  const engineer = useMemo(
    () => engineers.find((item) => item.name === 'Jacob Jones') ?? engineers[0],
    [],
  )
  const [projectName, setProjectName] = useState('')
  const [referenceSong, setReferenceSong] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [brief, setBrief] = useState('')
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    new Set(),
  )
  const [isServiceInfoOpen, setIsServiceInfoOpen] = useState(false)
  const [isChangeServiceOpen, setIsChangeServiceOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountStatus, setDiscountStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle')
  const isBriefOverLimit = brief.length > 1000
  const isCheckoutEnabled =
    projectName.trim().length >= 3 &&
    selectedGenre.trim().length > 0 &&
    !isBriefOverLimit

  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 sm:px-6 lg:px-[80px]">
        <Link
          to="/engineer-profile"
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
          Go back
        </Link>

        <div className="mt-6 space-y-2">
          <h1 className="font-display text-[30px] font-semibold leading-[38px] tracking-[-0.01em] text-ink">
            Begin your project booking
          </h1>
          <p className="text-[16px] font-medium tracking-[-0.03em] text-muted">
            Choose the service you need, fill in the basics, upload your files
            and secure your booking quickly.
          </p>
        </div>

        <section className="mt-8 rounded-[16px] bg-[#341864] p-6 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[5px] border-white">
                <img
                  src={engineer.imageUrl}
                  alt={engineer.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h2 className="font-display text-[36px] font-semibold leading-[44px] tracking-[-0.01em]">
                    {engineer.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] font-semibold text-white/90">
                    <span>{engineer.handle}</span>
                    <span className="flex items-center gap-1 text-white">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4 text-[#ffbd27]"
                        fill="currentColor"
                      >
                        <path d="M10 1.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.5z" />
                      </svg>
                      {engineer.rating.toFixed(1)} ({engineer.reviewCount})
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {['Engineer', 'Producer', 'Dolby Expert'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-secondary-25 px-3 py-1 text-[10px] font-medium text-[#78BA14]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[16px] font-medium text-white/85">
                  {engineer.location}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-white">
                  {socialLinks.map((social) => (
                    <button
                      key={social.label}
                      className="text-white/90 transition hover:text-white"
                      type="button"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/engineer-profile"
              className="inline-flex items-center gap-2 rounded-[8px] border border-primary-50 bg-primary-50 px-4 py-2 text-[16px] font-bold tracking-[-0.03em] text-primary-500"
            >
              Change Engineer
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 20h4l10-10-4-4L4 16v4z" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-nowrap items-center gap-4 overflow-x-auto pb-2">
            {stepItems.map((step, index) => (
              <div
                key={step.label}
                className="flex shrink-0 items-center gap-4"
              >
                <div
                  className={`flex items-center gap-3 rounded-[12px] px-3 py-2 whitespace-nowrap ${
                    step.isActive
                      ? 'bg-secondary-25 text-[#5E9110]'
                      : 'text-muted'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.isActive ? 'bg-secondary-100' : 'bg-[#F5F5F5]'
                    }`}
                  >
                    {step.icon}
                  </span>
                  <span
                    className={`text-[20px] tracking-[-0.03em] ${
                      step.isActive ? 'font-semibold' : 'font-medium'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < stepItems.length - 1 ? (
                  <span className="hidden h-px w-[120px] shrink-0 border-t border-dashed border-[#A4A7AE] lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="font-display text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-ink">
              Create Project
            </h2>

            <div className="space-y-6 rounded-[12px] border border-gray-50 bg-gray-25 p-4">
              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#414651]">
                  Service and Add-ons
                </h3>
                <div className="h-px w-full bg-border-strong" />
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-3">
                    <p className="text-[14px] font-medium tracking-[-0.03em] text-muted">
                      Selected Service
                    </p>
                    <div className="flex items-center gap-2 text-[20px] font-semibold tracking-[-0.03em] text-ink">
                      Mixing
                      <button
                        type="button"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-[12px] font-semibold text-[#414651]"
                        aria-label="View service details"
                        onClick={() => setIsServiceInfoOpen(true)}
                      >
                        ?
                      </button>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-[8px] bg-primary-500 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                    type="button"
                    onClick={() => setIsChangeServiceOpen(true)}
                  >
                    Change Service
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M4 20h4l10-10-4-4L4 16v4z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-primary-500">
                    <span className="text-[16px] font-medium tracking-[-0.03em]">
                      Select Add-ons
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M6 15l6-6 6 6" />
                    </svg>
                  </div>
                  <div className="space-y-3 rounded-[8px] border border-primary-50 bg-primary-25 p-3">
                    <div className="flex items-center justify-end gap-2 text-[12px] font-medium text-muted">
                      <button
                        className="flex items-center gap-2 text-[12px] font-medium text-muted"
                        type="button"
                        onClick={() => setSelectedAddOns(new Set())}
                      >
                        Clear selection
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {addOns.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 text-[14px] font-medium tracking-[-0.03em] text-[#414651]"
                        >
                          <span>{item}</span>
                          <input
                            type="checkbox"
                            checked={selectedAddOns.has(item)}
                            onChange={() => {
                              setSelectedAddOns((prev) => {
                                const next = new Set(prev)
                                if (next.has(item)) {
                                  next.delete(item)
                                } else {
                                  next.add(item)
                                }
                                return next
                              })
                            }}
                            className="h-4 w-4 rounded-[4px] border border-border-strong accent-primary-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-[12px] border border-gray-50 bg-gray-25 p-3">
              <div className="space-y-4">
                <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#414651]">
                  Project Details
                </h3>
                <div className="h-px w-full bg-border-strong" />
              </div>

              <div className="flex flex-col gap-8">
                <label className="flex flex-col gap-2">
                  <span className="text-[16px] font-medium tracking-[-0.03em] text-[#414651]">
                    Project Name
                    <span className="ml-1 text-[14px] font-medium text-muted">
                      (Required)
                    </span>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    className="h-10 w-full rounded-[8px] border border-border bg-white px-4 text-[14px] font-medium tracking-[-0.03em] text-ink outline-none placeholder:text-muted shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                  />
                  <span className="mt-1.5 block text-[12px] font-medium tracking-[-0.03em] text-primary-500">
                    Min. 3 - Max. 50 Characters. No special symbols except
                    hyphen.
                  </span>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[16px] font-medium tracking-[-0.03em] text-[#414651]">
                    Reference Song
                    <span className="ml-1 text-[14px] font-medium text-muted">
                      (Optional, only youtube and spotify link accepted)
                    </span>
                  </span>
                  <input
                    type="text"
                    placeholder="Paste song link here"
                    value={referenceSong}
                    onChange={(event) => setReferenceSong(event.target.value)}
                    className="h-10 w-full rounded-[8px] border border-border bg-white px-4 text-[14px] font-medium tracking-[-0.03em] text-ink outline-none placeholder:text-muted shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[16px] font-medium tracking-[-0.03em] text-[#414651]">
                    Select Genre
                    <span className="ml-1 text-[14px] font-medium text-muted">
                      (Required, at least 1 genre selection)
                    </span>
                  </span>
                  <span className="relative block">
                    <select
                      className={`h-10 w-full appearance-none rounded-[8px] border border-border bg-white px-4 text-[14px] font-medium tracking-[-0.03em] outline-none shadow-[0_1px_2px_rgba(10,13,18,0.05)] ${
                        selectedGenre ? 'text-ink' : 'text-muted'
                      }`}
                      value={selectedGenre}
                      onChange={(event) =>
                        setSelectedGenre(event.target.value)
                      }
                    >
                      <option value="" disabled>
                        Choose from selection
                      </option>
                      <option>Hip-Hop</option>
                      <option>R&amp;B</option>
                      <option>Afrobeat</option>
                      <option>Pop</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </span>
                  </span>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[16px] font-medium tracking-[-0.03em] text-[#414651]">
                    Creative Brief
                    <span className="ml-1 text-[14px] font-medium text-muted">
                      (Optional but recommended)
                    </span>
                  </span>
                  <textarea
                    className={`h-[122px] w-full resize-none rounded-[8px] border bg-white px-4 py-3 text-[14px] font-normal tracking-[-0.03em] text-ink outline-none placeholder:text-muted shadow-[0_1px_2px_rgba(10,13,18,0.05)] ${
                      isBriefOverLimit
                        ? 'border-error-500'
                        : 'border-border'
                    }`}
                    placeholder="Enter a short description..."
                    value={brief}
                    onChange={(event) => setBrief(event.target.value)}
                  />
                  <div
                    className={`mt-1.5 flex items-center justify-between text-[14px] font-medium tracking-[-0.03em] ${
                      isBriefOverLimit ? 'text-error-500' : 'text-[#535862]'
                    }`}
                  >
                    <span>{brief.length}/1000 characters</span>
                  </div>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-[8px] bg-primary-50 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-primary-500"
                      type="button"
                    >
                      Save as draft
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M4 20h4l10-10-4-4L4 16v4z" />
                      </svg>
                    </button>
                    <p className="text-[14px] font-semibold tracking-[-0.03em] text-ink">
                      *Your project is saved automatically.
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center gap-2 rounded-[8px] border border-primary-500 bg-primary-500 px-4 py-2 text-[14px] font-semibold tracking-[-0.03em] text-white"
                    type="button"
                  >
                    Add More
                    <span className="text-[18px] font-semibold leading-none">
                      +
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:max-w-[628px]">
            <div className="space-y-6 rounded-[16px] bg-gray-25 p-6">
              <h2 className="font-display text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-ink">
                Order Summary
              </h2>

              <div className="space-y-6">
                <div className="overflow-hidden rounded-[16px] border border-[#F5F5F5] bg-white">
                  <div className="space-y-4 p-4">
                    <div className="grid grid-cols-[2fr_0.6fr_1fr_1fr] gap-4 text-[16px] font-semibold tracking-[-0.03em] text-[#535862]">
                      <span>ITEM</span>
                      <span className="text-center">QTY</span>
                      <span className="text-center">UNIT PRICE</span>
                      <span className="text-right">TOTAL</span>
                    </div>
                    <div className="grid grid-cols-[2fr_0.6fr_1fr_1fr] gap-4 text-[14px] font-medium tracking-[-0.03em] text-ink">
                      <span>Choose a Service</span>
                      <span className="text-center">1</span>
                      <span className="text-center">$0.00</span>
                      <span className="text-right">$0.00</span>
                    </div>
                  </div>

                  <div className="h-px bg-border-strong" />

                  <div className="space-y-2 px-4 py-4 text-[14px] font-medium tracking-[-0.03em] text-ink">
                    <div className="flex items-center justify-between">
                      <span>Sub-Total</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        Service Fee
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-[12px] font-semibold text-[#414651]">
                          ?
                        </span>
                      </span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#F3FAE8] px-4 py-3 text-[16px] font-semibold tracking-[-0.03em] text-ink">
                    <span>Order Total</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-[8px] border border-[#F5F5F5] bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.03em] text-ink">
                    Delivery Date
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-[12px] font-semibold text-[#414651]">
                      ?
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.03em] text-ink">
                    30/12/2025
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M4 20h4l10-10-4-4L4 16v4z" />
                    </svg>
                  </div>
                </div>

                <div className="rounded-[12px] border border-[#F5F5F5] bg-white p-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="discount-code"
                      className="text-[16px] font-medium tracking-[-0.03em] text-ink"
                    >
                      Apply Discount Code
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <span className="relative block w-full sm:flex-1">
                        <input
                          id="discount-code"
                          type="text"
                          placeholder="Discount code"
                          value={discountCode}
                          onChange={(event) => {
                            setDiscountCode(event.target.value)
                            if (discountStatus !== 'idle') {
                              setDiscountStatus('idle')
                            }
                          }}
                          className={`h-11 w-full rounded-[8px] border bg-white px-4 text-[14px] font-medium tracking-[-0.03em] text-ink outline-none placeholder:text-muted shadow-[0_1px_2px_rgba(10,13,18,0.05)] ${
                            discountStatus === 'error'
                              ? 'border-error-500 pr-10'
                              : 'border-border'
                          }`}
                        />
                        {discountStatus === 'error' ? (
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-error-500">
                            <svg
                              viewBox="0 0 20 20"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            >
                              <circle cx="10" cy="10" r="7" />
                              <path d="M10 6v5M10 14h.01" />
                            </svg>
                          </span>
                        ) : null}
                      </span>
                      <button
                        className="h-11 rounded-[8px] bg-primary-500 px-6 text-[14px] font-semibold tracking-[-0.03em] text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                        type="button"
                        onClick={() => {
                          const normalized = discountCode.trim().toLowerCase()
                          if (!normalized) {
                            setDiscountStatus('idle')
                            return
                          }
                          if (normalized === '25%off') {
                            setDiscountStatus('error')
                            return
                          }
                          if (normalized === '10%off') {
                            setDiscountStatus('success')
                            return
                          }
                          setDiscountStatus('error')
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    <span
                      className={`min-h-[18px] text-[12px] font-medium ${
                        discountStatus === 'error'
                          ? 'text-error-500'
                          : discountStatus === 'success'
                            ? 'text-primary-500'
                            : 'text-transparent'
                      }`}
                    >
                      {discountStatus === 'error'
                        ? "We couldn't apply this code. Make sure it's correct and still active."
                        : discountStatus === 'success'
                          ? 'Code applied. Your total has been updated.'
                          : 'Placeholder'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-ink">
                      Checkout
                    </h3>
                    <p className="text-[14px] font-medium tracking-[-0.03em] text-muted">
                      Proceed below to see payment options
                    </p>
                  </div>
                  <button
                    className={`w-full rounded-[8px] px-6 py-2 text-[14px] font-semibold tracking-[-0.03em] ${
                      isCheckoutEnabled
                        ? 'bg-primary-500 text-white'
                        : 'bg-border text-subtle'
                    }`}
                    type="button"
                    disabled={!isCheckoutEnabled}
                    onClick={() => {
                      if (!isCheckoutEnabled) return
                      navigate('/make-payment')
                    }}
                  >
                    Checkout - $0.00
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      {isServiceInfoOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/25 backdrop-blur-md"
            type="button"
            aria-label="Close service details"
            onClick={() => setIsServiceInfoOpen(false)}
          />

          <div
            className="relative z-10 w-[90%] max-w-[425px] overflow-hidden rounded-[12px] bg-white shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03)]"
            role="dialog"
            aria-modal="true"
            aria-label="Mixing service details"
          >
            <div className="flex items-center justify-between bg-gray-50 px-4 py-4">
              <span className="font-display text-[24px] font-semibold tracking-[-0.01em] text-ink">
                Mixing
              </span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-gray-100"
                type="button"
                aria-label="Close"
                onClick={() => setIsServiceInfoOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              {serviceInfoSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[8px] bg-white p-4 shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                >
                  <h4 className="text-[16px] font-semibold tracking-[-0.03em] text-ink">
                    {section.title}
                  </h4>
                  <div className="mt-4 space-y-3">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-secondary-500 text-secondary-600">
                          <svg
                            viewBox="0 0 16 16"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M3.5 8.5l2.3 2.3 6.7-6.7" />
                          </svg>
                        </span>
                        <span className="text-[12px] font-medium tracking-[-0.03em] text-[#414651]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isChangeServiceOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/25 backdrop-blur-md"
            type="button"
            aria-label="Close change service dialog"
            onClick={() => setIsChangeServiceOpen(false)}
          />

          <div
            className="relative z-10 w-[90%] max-w-[1227px] overflow-hidden rounded-[12px] bg-white shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03)]"
            role="dialog"
            aria-modal="true"
            aria-label="Change Service Selection"
          >
            <div className="flex items-center justify-between bg-gray-50 px-4 py-4">
              <span className="font-display text-[24px] font-semibold tracking-[-0.01em] text-ink">
                Change Service Selection
              </span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-gray-100"
                type="button"
                aria-label="Close"
                onClick={() => setIsChangeServiceOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {changeServiceOptions.map((option) => (
                  <div
                    key={option.title}
                    className="flex flex-col gap-3 rounded-[16px] bg-gray-50 p-3"
                  >
                    <h4 className="text-[20px] font-bold tracking-[-0.03em] text-ink">
                      {option.title}
                    </h4>
                    <p className="text-[14px] font-medium tracking-[-0.03em] text-muted">
                      {option.description}
                    </p>
                    <button
                      className="mt-auto w-full rounded-[8px] bg-primary-500 px-6 py-2 text-[16px] font-semibold tracking-[-0.03em] text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                      type="button"
                      onClick={() => setIsChangeServiceOpen(false)}
                    >
                      Select Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProjectBooking
