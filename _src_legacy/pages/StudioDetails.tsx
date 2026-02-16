import { Link, useParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { studios } from '../data/studios'

const amenities = [
  { label: 'Vocal Booth', icon: 'mic' },
  { label: 'Writing Materials', icon: 'notebook' },
  { label: 'Free Wi-Fi', icon: 'wifi' },
  { label: 'Security Cameras', icon: 'camera' },
  { label: 'Secure Environment', icon: 'shield' },
  { label: 'Parking Space', icon: 'parking' },
  { label: 'Air Conditioning', icon: 'air' },
  { label: 'Relaxation Lounge', icon: 'sofa' },
  { label: 'Smoking Area', icon: 'smoking' },
  { label: 'Restroom', icon: 'restroom' },
  { label: 'Food and Drinks', icon: 'food' },
  { label: 'Pet Friendly', icon: 'pet' },
]

const team = [
  {
    name: 'Annette Black',
    role: 'Producer',
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=80',
  },
  {
    name: 'Cameron Williamson',
    role: 'Engineer',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=80',
  },
  {
    name: 'Jacob Jones',
    role: 'Engineer',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  },
  {
    name: 'Savannah Nguyen',
    role: 'Sound Designer',
    avatar:
      'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=240&q=80',
  },
  {
    name: 'Ralph Edwards',
    role: 'Studio Manager',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
  },
]

const faqs = [
  {
    question: 'Question text goes here',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  },
]

const gallery = [
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516981442399-a91139e20ff8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
]

function StudioDetails() {
  const { studioId } = useParams()
  const studio = studios.find((item) => item.id === studioId) ?? studios[0]

  if (!studio) {
    return (
      <div className="min-h-screen bg-white text-ink">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-[1248px] flex-col gap-6 px-4 py-10 sm:px-6 lg:px-[50px]">
          <p className="text-[18px] text-muted">Studio not found.</p>
          <Link to="/studios" className="text-primary-500">
            Back to studios
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />

      <section className="bg-[#341864]">
        <div className="mx-auto flex w-full flex-wrap items-end justify-between gap-6 px-4 py-10 sm:px-6 lg:px-[80px]">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-[30px] font-semibold text-white">
                {studio.name}
              </h1>
              <p className="text-[16px] font-medium text-white">
                {studio.handle} {studio.title}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted">
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
              <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted">
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
                Booked {studio.bookedCount} times
              </span>
              <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted">
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
                {studio.rating.toFixed(1)}({studio.reviewCount})
              </span>
            </div>

            <div className="flex items-center gap-4 text-white">
              <span className="text-[24px] font-semibold">
                {studio.hourlyRate}
              </span>
              <button
                className="rounded-[8px] bg-primary-500 px-6 py-2 text-[16px] font-semibold text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                type="button"
              >
                Book Now
              </button>
              <button
                className="rounded-[8px] bg-primary-50 px-4 py-2 text-[16px] font-semibold text-primary-500"
                type="button"
              >
                Message Studio Manager
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink"
                type="button"
                aria-label="Save studio"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20.5l-1.5-1.4C6 15 3.5 12.8 3.5 9.9 3.5 7.7 5.2 6 7.4 6c1.2 0 2.3.5 3.1 1.3C11.3 6.5 12.4 6 13.6 6c2.2 0 3.9 1.7 3.9 3.9 0 2.9-2.5 5.1-7 9.2L12 20.5z" />
                </svg>
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink"
                type="button"
                aria-label="Share studio"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M7 12h10M15 7l5 5-5 5" />
                  <path d="M4 12h3" />
                </svg>
              </button>
            </div>
          </div>

          <button
            className="flex items-center gap-2 text-[18px] font-semibold text-white"
            type="button"
          >
            Report Studio
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[#FEF3F2] text-error-500">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 5h11l-2 4 2 4H5v7" />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <main className="mx-auto flex w-full flex-col gap-10 px-4 py-10 sm:px-6 lg:px-[50px]">
        <div className="flex flex-wrap items-end gap-8 border-b border-border pb-4">
          {['Overview', 'Reviews', 'Equipment'].map((tab) => (
            <button
              key={tab}
              className={`text-[20px] font-semibold ${
                tab === 'Overview'
                  ? 'text-primary-500'
                  : 'text-muted'
              }`}
              type="button"
            >
              {tab}
            </button>
          ))}
          <div className="flex-1 border-b-4 border-border" />
        </div>

        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-[30px] font-semibold text-ink">
              About the Studio
            </h2>
            <p className="mt-3 text-[16px] font-medium text-ink">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
              lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
            <button
              className="mt-2 flex items-center gap-2 text-[12px] font-medium text-primary-500"
              type="button"
            >
              Read More
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
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[16px] font-medium text-[#535862]">
            {['4 Hours Cancellation', 'Engineer Available', '8 Guests Capacity'].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2"
                >
                  <span className="h-2 w-2 rounded-full bg-[#414651]" />
                  {item}
                </span>
              ),
            )}
          </div>
        </section>

        <section className="relative grid gap-2 lg:grid-cols-[1fr_1fr]">
          <div className="relative overflow-hidden rounded-[12px]">
            <img
              src={gallery[0]}
              alt="Studio overview"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="grid gap-2">
            <div className="grid gap-2 sm:grid-cols-2">
              {gallery.slice(1, 3).map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Studio detail"
                  className="h-[236px] w-full rounded-[12px] object-cover"
                />
              ))}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {gallery.slice(3, 5).map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Studio detail"
                  className="h-[236px] w-full rounded-[12px] object-cover"
                />
              ))}
            </div>
          </div>
          <button
            className="absolute bottom-6 right-6 rounded-[8px] border border-border bg-white px-4 py-2 text-[16px] font-medium text-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
            type="button"
          >
            View all 7 Photos
          </button>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-[30px] font-semibold text-ink">Amenities</h2>
          <div className="flex flex-wrap gap-4">
            {amenities.map((item) => (
              <div
                key={item.label}
                className="flex w-[158px] flex-col items-center justify-center gap-3 rounded-[16px] bg-gray-50 px-4 py-6 text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-25 text-secondary-500">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M4 12h16M12 4v16" />
                  </svg>
                </span>
                <span className="text-[14px] font-semibold text-ink">
                  {item.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-[30px] font-semibold text-ink">Our Team</h2>
          <div className="flex flex-wrap gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex w-[151px] flex-col items-center gap-2 text-center"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-[120px] w-[120px] rounded-full object-cover"
                />
                <p className="text-[16px] font-semibold text-ink">
                  {member.name}
                </p>
                <p className="text-[14px] font-medium text-muted">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 text-[20px] font-semibold text-ink">
            Studio Location
            <span className="text-[20px] font-medium text-muted">
              {studio.handle} {studio.title}
            </span>
          </div>
          <div className="overflow-hidden rounded-[16px] border border-border bg-white">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
              alt="Studio location map"
              className="h-[460px] w-full object-cover"
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-[30px] font-semibold text-ink">FAQs</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((item, index) => (
              <div
                key={`${item.question}-${index}`}
                className="rounded-[16px] bg-gray-50 px-4 py-3"
              >
                <p className="text-[18px] font-semibold text-ink">
                  {item.question}
                </p>
                <p className="mt-2 text-[14px] font-medium text-muted">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default StudioDetails
