import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Projects', icon: 'music', to: '/my-projects' },
  { label: 'Bookings', icon: 'report' },
  { label: 'Messages', icon: 'mail' },
  { label: 'Hire Talent', icon: 'users' },
]

const iconPaths: Record<string, string> = {
  home: 'M3 10.5L12 3l9 7.5v9a1 1 0 0 1-1 1h-5.5v-6H9.5v6H4a1 1 0 0 1-1-1v-9z',
  music: 'M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M14 3v4h4',
  report: 'M5 4h14v14H5z M8 14h2 M8 11h6 M8 8h8',
  mail: 'M4 6h16v12H4z M4 7l8 5 8-5',
  users: 'M8 11a3 3 0 1 0-6 0a3 3 0 0 0 6 0zm11 0a3 3 0 1 0-6 0a3 3 0 0 0 6 0zm-13 8v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1zm10 0v-1a4 4 0 0 1 4-4',
}

function Icon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={iconPaths[name]} />
    </svg>
  )
}

function SiteHeader() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isProfileMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isProfileMenuOpen])

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-[97px] w-full items-center justify-between px-4 sm:px-6 lg:px-[50px]">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-[5px] border-primary-500" />
            <div className="leading-tight">
              <p className="text-[16px] font-semibold text-ink">SoundmindPRO</p>
              <p className="text-[12px] font-medium text-muted">
                Studio Network
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const content = (
                <>
                  <Icon name={item.icon} />
                  {item.label}
                </>
              )

              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-2 rounded-md px-2 py-1 text-[16px] font-medium text-muted"
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <button
                  key={item.label}
                  className="flex items-center gap-2 rounded-md px-2 py-1 text-[16px] font-medium text-muted"
                  type="button"
                >
                  {content}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <label className="relative">
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
              placeholder="Search engineers, studios..."
              className="h-10 w-[260px] rounded-[8px] border border-border bg-gray-50 pl-10 pr-4 text-[16px] font-medium text-ink outline-none placeholder:text-subtle"
            />
          </label>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-primary-500"
            type="button"
            aria-label="Notifications"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22z" />
              <path d="M5 16h14l-1.5-2v-4a5.5 5.5 0 1 0-11 0v4L5 16z" />
            </svg>
          </button>

          <div className="relative" ref={profileMenuRef}>
            <button
              className="flex items-center gap-3 rounded-full p-1 text-left transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              type="button"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              onClick={() =>
                setIsProfileMenuOpen((prevOpen) => !prevOpen)
              }
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80"
                  alt="Profile avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-success-500" />
              </div>
              <div className="text-left">
                <p className="text-[16px] font-medium text-[#414651]">
                  Timon Singz
                </p>
                <div className="inline-flex items-center gap-2 rounded bg-secondary-25 px-2 py-0.5 text-[10px] font-medium text-secondary-500">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M10 1.5l2.3 3.8 4.4 1-2.9 3.4.4 4.5-4.2-1.8-4.2 1.8.4-4.5-2.9-3.4 4.4-1L10 1.5z" />
                  </svg>
                  Professional
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                className={`h-6 w-6 text-[#414651] transition ${
                  isProfileMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isProfileMenuOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-48 rounded-[12px] border border-border bg-white p-2 shadow-[0_12px_24px_rgba(10,13,18,0.12)]"
                role="menu"
              >
                <Link
                  to="/engineer-profile"
                  role="menuitem"
                  className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-[14px] font-medium text-ink hover:bg-gray-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/my-projects"
                  role="menuitem"
                  className="flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-[14px] font-medium text-ink hover:bg-gray-50"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  My Projects
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
