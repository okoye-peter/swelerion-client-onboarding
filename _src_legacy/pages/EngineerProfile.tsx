import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { engineers } from '../data/engineers'

const tabs = ['Services', 'Reviews', 'Portfolio', 'About Me']

const certifications = [
  'SoundmindPRO Verified',
  'Dolby Atmos Certified',
  'Analog Gear Specialist',
]

const genres = [
  'Hip-Hop',
  'Jazz',
  'Afrobeat',
  'Highlife',
  'RnB',
  'Gospel',
  'Rock',
  'Country',
  'Amapiano',
  'Raggae',
]

const credits = [
  'Moses Bliss',
  'Ebuka Songs',
  'Spyro',
  'Jaywon',
  'LadiPoe',
  'Chidinma',
  'Suave',
  'ThaRapMan',
  'Terry Apala',
  'Bouqui',
  'Flavour',
]

const collaborators = [
  'Moses Bliss',
  'Ebuka Songs',
  'Spyro',
  'Jaywon',
  'LadiPoe',
  'Chidinma',
  'Suave',
  'ThaRapMan',
  'Terry Apala',
  'Bouqui',
  'Flavour',
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

const shareLinks = [
  {
    label: 'Facebook',
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0866FF">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.2 7h-1.4c-.6 0-.8.3-.8.9v1.3h2.1l-.3 2.2h-1.8v5.3H9.8v-5.3H8.3v-2.2h1.5V9.5c0-1.7 1-2.7 2.6-2.7h1.8V9z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: () => 'https://www.instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#111111">
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5zM17.5 6.7a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: (url: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#25D366">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.1 4 4.1-1.1A10 10 0 1 0 12 2zm5.3 13.3c-.2.6-1.1 1.1-1.6 1.2-.4.1-.9.1-1.5 0-1.6-.4-3-1.2-4.2-2.4-1.3-1.2-2.2-2.8-2.5-4.4-.1-.6-.1-1.1 0-1.6.1-.5.6-1.3 1.2-1.6.3-.2.6-.2.9-.1l.6.1c.2 0 .5.1.6.4.2.4.7 1.6.8 1.7.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.3.4c-.1.1-.2.3-.1.5.2.7.8 1.5 1.4 2.1.6.6 1.3 1.1 2.1 1.3.2.1.4 0 .6-.1l.4-.3c.2-.2.4-.3.6-.4.2-.1.4-.1.6 0 .2.1 1.3.6 1.7.8.3.2.4.4.4.6 0 .2 0 .6-.1.9z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: () => 'https://www.tiktok.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M15 4c.3 1.7 1.6 3.1 3.3 3.4v2.4c-1.2 0-2.4-.4-3.3-1.1v5.2a4.6 4.6 0 1 1-4.6-4.6c.4 0 .8 0 1.2.1v2.5a2.2 2.2 0 1 0 1.8 2.2V4h1.6z"
          fill="#111111"
        />
        <path
          d="M19 7.4v2.4c-1.2 0-2.4-.4-3.3-1.1v-2.4c.9.7 2.1 1.1 3.3 1.1z"
          fill="#00F2EA"
        />
        <path
          d="M15.7 6.3V4h-1.6v9.1a2.2 2.2 0 1 1-1.8-2.2v-2.5a4.6 4.6 0 1 0 4.6 4.6V8.7c.9.7 2.1 1.1 3.3 1.1V7.4c-1.7-.3-3-1.7-3.3-3.4z"
          fill="#FF004F"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#111111">
        <path d="M17.3 3H21l-7.3 8.3L22 21h-6.2l-4.9-5.7L5.6 21H2l7.7-8.8L2 3h6.3l4.4 5.1L17.3 3z" />
      </svg>
    ),
  },
  {
    label: 'Thread',
    href: () => 'https://www.threads.net/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#111111">
        <path d="M12 3c4.6 0 7.4 2.6 7.7 6.8h-2.6C16.9 7.5 15 5.9 12 5.9c-3.2 0-5.3 1.8-5.3 4.7 0 2.4 1.6 3.9 4.4 4.3l1.8.2c2.5.3 3.6 1 3.6 2.3 0 1.5-1.6 2.6-4 2.6-2.6 0-4.4-1.2-4.7-3.3H5.2c.2 3.5 3.1 5.9 6.9 5.9 3.8 0 6.7-2.1 6.7-5.2 0-2.6-1.8-4.1-5.4-4.6l-1.8-.2c-2.3-.3-3.2-1-3.2-2.2 0-1.4 1.4-2.4 3.6-2.4 2.3 0 3.7 1 4.2 2.7h2.5c-.4-3.1-2.7-5.5-6.9-5.5z" />
      </svg>
    ),
  },
]

const services = [
  {
    title: 'Mixing (Full Stems)',
    description: 'Upload beat files and vocal stems separately.',
    price: '$100/Song',
    includes: ['Delivery in 3 days', '2 revision rounds'],
    imageUrl:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mastering',
    description: 'Get your final mix polished for release.',
    price: '$100/Song',
    includes: ['Streaming loudness targets', 'Instrument balance check'],
    imageUrl:
      'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Dolby Atmos',
    description: 'Bring your music to life with Dolby Atmos mix.',
    price: '$100/Song',
    includes: ['Atmos-ready export', 'Stereo downmix included'],
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Recording',
    description: 'Book an in-person session with this engineer.',
    price: '$100/Song',
    includes: ['Studio prep and setup', 'Session notes included'],
    imageUrl:
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mixing (2 Tracks)',
    description: 'Upload beat files and vocals separately.',
    price: '$100/Song',
    includes: ['Quick turnaround', 'Tuning assistance'],
    imageUrl:
      'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80',
  },
]

const SERVICE_DESCRIPTION_MAX = 50

const portfolioItems = [
  {
    id: 'live-01',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=400&q=80',
    duration: '1:00',
    beforeLabel: 'Before Mixing',
    afterLabel: 'After Mixing',
    afterDuration: '0:30',
  },
  {
    id: 'live-02',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    duration: '1:00',
    beforeLabel: 'Before Mixing',
    afterLabel: 'After Mixing',
    afterDuration: '0:30',
  },
  {
    id: 'live-03',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    duration: '1:00',
    beforeLabel: 'Before Mixing',
    afterLabel: 'After Mixing',
    afterDuration: '0:30',
  },
]

const portfolioCredits = [
  {
    id: 'credit-01',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    date: '25 December, 2025',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'credit-02',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    date: '25 December, 2025',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'credit-03',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    date: '25 December, 2025',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'credit-04',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    date: '25 December, 2025',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'credit-05',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    date: '25 December, 2025',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'credit-06',
    title: "Live or Let's Live",
    artist: 'Timon Singz',
    date: '25 December, 2025',
    badge: 'Full Stem Mixing',
    imageUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
  },
]

const aboutBioParagraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
]

const studioCards = [
  {
    id: 'studio-01',
    name: 'Soundmind Studio',
    type: 'Recording Studio',
    address: '3891 Ranchview Dr. Richardson, California 62639',
    rating: 4.5,
    reviewCount: 5,
    bookedCount: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
  },
]

const equipmentSections = [
  {
    title: 'Hardware',
    items: [
      'Solid State Logic Revival 4000',
      'Chandler Limited EMI REDD47',
      'HEDD Tower Mains Extended',
      'Kernom ELIPSE Modulation Pedal',
      'Barefoot Sound Footprint03',
      'PreSonus Studio 1824c',
      'Mackie HR824 Studio Monitors',
      'Auralex ProPads',
      'Beyerdynamic DT770',
      'BEHRINGER 8-Channel Headphone Amplifier',
    ],
    showViewMore: true,
  },
  {
    title: 'Software and Plugins',
    items: [
      'Steinburg Cubase',
      'Pro Tools',
      'Ableton Live',
      'FL Studio',
      'Adobe Audition',
      'Universal Audio (UAD)',
      'Oeksound Soothe2',
      'iZotope',
    ],
  },
  {
    title: 'Studio Monitors',
    items: ['Mackie HR824 Studio Monitor', 'KRK RP8 Rokit Studio Monitor'],
  },
  {
    title: 'Microphones',
    items: ['Neumann U 87', 'Neumann KM 184', 'Rode NT-1A', 'Shure SM 58'],
  },
]

const baseWaveformHeights = [
  1, 3, 5, 5, 13, 17, 23, 13, 7, 11, 15, 29, 41, 37, 55, 47, 35, 41, 19,
  13, 7, 3, 1, 9, 15, 21, 15, 27, 37, 23, 13, 5, 7, 3, 3, 7, 11, 23, 29,
  27, 43, 55, 43, 29, 19, 23, 13, 15, 9, 5, 3, 1,
]

const waveformHeights = Array.from({ length: 150 }, (_, index) => {
  return baseWaveformHeights[index % baseWaveformHeights.length]
})

const defaultExpandedPortfolioId =
  portfolioItems[1]?.id ?? portfolioItems[0]?.id ?? ''

function chunkArray<T>(items: T[], size: number) {
  const rows: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size))
  }
  return rows
}

const portfolioCreditRows = chunkArray(portfolioCredits, 2)

function Waveform({
  activeRatio = 0,
  lengthRatio = 1,
  activeClassName = 'bg-secondary-500',
  inactiveClassName = 'bg-gray-200',
}: {
  activeRatio?: number
  lengthRatio?: number
  activeClassName?: string
  inactiveClassName?: string
}) {
  const safeLengthRatio = Math.max(0.1, Math.min(1, lengthRatio))
  const visibleBars = Math.max(
    1,
    Math.round(waveformHeights.length * safeLengthRatio),
  )
  const activeBars = Math.max(
    0,
    Math.min(visibleBars, Math.round(visibleBars * activeRatio)),
  )

  return (
    <div className="w-full overflow-hidden">
      <div className="flex h-[55px] items-end gap-[3px]">
        {waveformHeights.slice(0, visibleBars).map((height, index) => (
          <span
            key={`wave-${height}-${index}`}
            className={`w-[3px] rounded-full ${
              index < activeBars ? activeClassName : inactiveClassName
            }`}
            style={{ height: `${height}px` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}

function PlayerControls({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-6 text-secondary-500">
      <button type="button" aria-label="Previous">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M6 6h2v12H6V6zm4.5 6 7.5 6V6l-7.5 6z" />
        </svg>
      </button>
      <button type="button" aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? (
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
            <path d="M7 5h4v14H7V5zm6 0h4v14h-4V5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
            <path d="M8 5l11 7-11 7V5z" />
          </svg>
        )}
      </button>
      <button type="button" aria-label="Next">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M16 6h2v12h-2V6zm-9.5 6 7.5 6V6l-7.5 6z" />
        </svg>
      </button>
    </div>
  )
}

function StudioCard({
  studio,
}: {
  studio: (typeof studioCards)[number]
}) {
  return (
    <article className="flex w-full max-w-[346px] flex-col overflow-hidden rounded-[12px] border border-border bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]">
      <div className="relative h-[160px] w-full">
        <img
          src={studio.imageUrl}
          alt={studio.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted">
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 text-[#ffbd27]"
              fill="currentColor"
            >
              <path d="M10 1.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.5z" />
            </svg>
            <span>{studio.rating.toFixed(1)}</span>
            <span className="text-ink">({studio.reviewCount})</span>
          </span>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-muted"
            type="button"
            aria-label="Save studio"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M12 20.5l-1.5-1.4C6 15 3.5 12.8 3.5 9.9 3.5 7.7 5.2 6 7.4 6c1.2 0 2.3.5 3.1 1.3C11.3 6.5 12.4 6 13.6 6c2.2 0 3.9 1.7 3.9 3.9 0 2.9-2.5 5.1-7 9.2L12 20.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[16px] font-semibold text-ink">
            {studio.name}
          </span>
          <span className="h-4 w-px bg-border-strong" />
          <span className="text-[14px] font-medium text-muted">
            {studio.type}
          </span>
        </div>
        <p className="text-[12px] text-muted">{studio.address}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success-25 text-success-600">
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
            Verified
          </span>
          <span className="flex items-center gap-2 rounded-full border border-border bg-white px-2 py-1 text-[12px] font-medium text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-25 text-blue-600">
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
            Booked {studio.bookedCount} times
          </span>
        </div>
      </div>
    </article>
  )
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`
}

const reviews = [
  {
    name: 'Devon Lane',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.',
  },
  {
    name: 'Ralph Edwards',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    name: 'Bessie Cooper',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.',
  },
  {
    name: 'Wade Warren',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    showReadMore: true,
  },
  {
    name: 'Arlene McCoy',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    showReadMore: true,
  },
  {
    name: 'Eleanor Pena',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    name: 'Robert Fox',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    showReadMore: true,
  },
  {
    name: 'Darlene Robertson',
    rating: 4,
    date: 'December, 2025',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
    showReadMore: true,
  },
]

const faqs = [
  {
    question: 'Question text goes here',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  },
  {
    question: 'Question text goes here',
    answer:
      'Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.',
  },
]

function EngineerProfile() {
  const [activeTab, setActiveTab] = useState('Services')
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [showMessageSuccess, setShowMessageSuccess] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [hasCopied, setHasCopied] = useState(false)
  const [expandedPortfolioId, setExpandedPortfolioId] = useState(
    defaultExpandedPortfolioId,
  )
  const tabsRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  })
  const engineer = useMemo(
    () => engineers.find((item) => item.name === 'Jacob Jones') ?? engineers[0],
    [],
  )
  const shareUrl = `https://jacobjones/soundmindpro678943`
  const activeFaqs = activeTab === 'Services' ? faqs : []

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const index = tabs.indexOf(activeTab)
      const activeButton = tabRefs.current[index]
      const container = tabsRef.current
      if (!activeButton || !container) return
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeTab])

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setHasCopied(true)
      window.setTimeout(() => setHasCopied(false), 1500)
    } catch {
      setHasCopied(false)
    }
  }
  const portfolioSection = (
    <div className="space-y-10">
      <div className="space-y-6">
        <h2 className="text-[30px] font-semibold text-ink">
          Made on SoundmindPRO
        </h2>
        <div className="space-y-6 border-y border-border py-2">
          {portfolioItems.map((item) => {
            const isExpanded = expandedPortfolioId === item.id
            return (
              <div key={item.id} className="space-y-6">
                <button
                  className="flex w-full items-center justify-between gap-6 py-4 text-left"
                  type="button"
                  onClick={() =>
                    setExpandedPortfolioId(isExpanded ? '' : item.id)
                  }
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-[104px] w-[104px] overflow-hidden rounded-[16px] bg-white">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-[22px] font-semibold text-ink">
                          {item.title}
                        </p>
                        <p className="text-[16px] font-medium text-muted">
                          {item.artist}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[12px] font-medium text-ink">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center text-ink">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      {isExpanded ? (
                        <path d="M5 12l5-5 5 5" />
                      ) : (
                        <path d="M5 8l5 5 5-5" />
                      )}
                    </svg>
                  </span>
                </button>

                {isExpanded ? (
                  <div className="space-y-6 rounded-[16px] border border-border bg-white p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-muted">
                        <span className="rounded-[6px] bg-gray-100 px-2 py-1">
                          A
                        </span>
                        <span className="rounded-[6px] bg-gray-100 px-3 py-1">
                          {item.beforeLabel}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <Waveform activeRatio={0} lengthRatio={1} />
                        <div className="flex items-center justify-between text-[16px] font-semibold text-ink">
                          <span>0:00</span>
                          <PlayerControls isPlaying={false} />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[12px] font-semibold text-secondary-700">
                        <span className="rounded-[6px] bg-secondary-100 px-2 py-1">
                          B
                        </span>
                        <span className="rounded-[6px] bg-secondary-100 px-3 py-1">
                          {item.afterLabel}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <Waveform
                          activeRatio={0.5}
                          lengthRatio={1}
                        />
                        <div className="flex items-center justify-between text-[16px] font-semibold text-ink">
                          <span>{item.afterDuration}</span>
                          <PlayerControls isPlaying />
                          <span>{item.afterDuration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-[30px] font-semibold text-ink">Credits</h2>
        <div className="space-y-6 border-y border-border py-6">
          {portfolioCreditRows.map((row, rowIndex) => (
            <div
              key={`credit-row-${rowIndex}`}
              className="grid gap-6 md:grid-cols-2"
            >
              {row.map((credit) => (
                <div
                  key={credit.id}
                  className="flex items-start gap-4 rounded-[16px] bg-white p-2"
                >
                  <div className="h-[104px] w-[104px] overflow-hidden rounded-[16px] bg-white">
                    <img
                      src={credit.imageUrl}
                      alt={credit.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[22px] font-semibold text-ink">
                        {credit.title}
                      </p>
                      <p className="text-[16px] font-medium text-muted">
                        {credit.artist}
                      </p>
                      <p className="text-[16px] font-medium text-muted">
                        {credit.date}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[12px] font-medium text-ink">
                      {credit.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const servicesSection = (
    <div className="space-y-6">
      <div>
        <h3 className="text-[30px] font-semibold text-ink">Services</h3>
        <p className="mt-2 text-[16px] font-medium text-muted">
          Browse packages and book the service that fits your project goals.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="flex h-[384px] w-full max-w-[292px] flex-col overflow-hidden rounded-[12px] border border-border bg-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="h-[160px] w-full object-cover"
            />
            <div className="flex flex-1 flex-col gap-4 p-3">
              <div className="flex flex-1 flex-col gap-4">
                <div className="space-y-1">
                  <h4 className="text-[20px] font-semibold text-ink">
                    {service.title}
                  </h4>
                  <p className="text-[12px] font-medium text-muted">
                    {truncateText(service.description, SERVICE_DESCRIPTION_MAX)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[10px] font-medium text-subtle">
                    What's included:
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-50">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-2.5 w-2.5 text-ink"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <circle cx="8" cy="8" r="6" />
                        <path d="M8 6v4M8 4h.01" />
                      </svg>
                    </span>
                  </div>

                  <div className="space-y-2">
                    {service.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[10px] text-muted"
                      >
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-secondary-25 text-secondary-500">
                          <svg
                            viewBox="0 0 16 16"
                            className="h-2.5 w-2.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M3.5 8.5l2.3 2.3 6.7-6.7" />
                          </svg>
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className="flex items-center gap-1 text-[12px] font-normal text-primary-500"
                    type="button"
                  >
                    Read More
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M6 8l4 4 4-4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-4">
                <span className="text-[16px] font-bold text-ink">
                  {service.price}
                </span>
                <Link
                  to="/project-booking"
                  className="inline-flex h-8 flex-1 items-center justify-center rounded-[8px] bg-primary-500 px-6 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {activeFaqs.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-[30px] font-semibold text-ink">FAQs</h3>
          <div className="space-y-4">
            {activeFaqs.map((faq) => (
              <div
                key={faq.question + faq.answer}
                className="rounded-[16px] bg-gray-50 p-4"
              >
                <h4 className="text-[16px] font-semibold text-ink">
                  {faq.question}
                </h4>
                <p className="mt-2 text-[14px] text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )

  const aboutMeSection = (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-[30px] font-semibold text-ink">Bio</h2>
        <div className="space-y-4 text-[16px] font-medium text-muted">
          {aboutBioParagraphs.map((paragraph, index) => (
            <p key={`bio-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[30px] font-semibold text-ink">Studios</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {studioCards.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-[30px] font-semibold text-ink">
          Equipment List
        </h2>
        <div className="space-y-6">
          {equipmentSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-[20px] font-semibold text-ink">
                {section.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted"
                  >
                    {item}
                  </span>
                ))}
                {section.showViewMore ? (
                  <button
                    className="flex items-center gap-1 text-[12px] font-semibold text-primary-500"
                    type="button"
                  >
                    View More
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M6 8l4 4 4-4" />
                    </svg>
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />

      <main className="pb-16">
        <section className="relative h-[360px]">
          <div className="absolute inset-x-0 top-0 h-[320px] w-full bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.35),rgba(0,0,0,0.35))]" />
            <div className="absolute inset-0 bg-[radial-gradient(44.2%_49.34%_at_45.45%_50%,rgba(102,102,102,0)_9.7%,rgba(0,0,0,0.7)_100%)]" />
          </div>

          <div className="absolute left-0 right-0 top-0 h-full">
            <div className="mx-auto h-full w-full px-4 sm:px-6 lg:px-[50px]">
              <div className="absolute left-4 top-[160px] flex items-start gap-6 sm:left-6 lg:left-[50px]">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full border-[5px] border-white shadow-[0_12px_24px_rgba(10,13,18,0.18)]">
                  <img
                    src={engineer.imageUrl}
                    alt={engineer.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="text-white">
                  <h1 className="text-[36px] font-semibold leading-[44px]">
                    {engineer.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[14px] font-semibold text-white/90">
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
                          className="rounded-full border border-border bg-white px-3 py-1 text-[10px] font-medium text-secondary-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-2 text-[16px] font-medium text-white/85">
                    {engineer.location}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-white">
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

                  <p className="mt-3 max-w-[520px] text-[16px] font-medium text-white/90">
                    {engineer.title} with a focus on clarity, translation, and
                    fast turnaround times for modern releases.
                  </p>
                </div>
              </div>

              <div className="absolute right-4 top-[256px] flex flex-wrap items-center gap-3 sm:right-6 lg:right-[50px]">
                <Link
                  to="/project-booking"
                  className="inline-flex items-center justify-center rounded-[8px] bg-primary-500 px-6 py-2 text-[16px] font-semibold text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                >
                  Book Now
                </Link>
                <button
                  className="rounded-[8px] bg-primary-50 px-6 py-2 text-[16px] font-bold text-primary-500"
                  type="button"
                  onClick={() => {
                    setMessageText('')
                    setShowMessageSuccess(false)
                    setIsMessageOpen(true)
                  }}
                >
                  Message
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink"
                  type="button"
                  aria-label="Save engineer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 20.5l-1.5-1.4C6 15 3.5 12.8 3.5 9.9 3.5 7.7 5.2 6 7.4 6c1.2 0 2.3.5 3.1 1.3C11.3 6.5 12.4 6 13.6 6c2.2 0 3.9 1.7 3.9 3.9 0 2.9-2.5 5.1-7 9.2L12 20.5z" />
                  </svg>
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink"
                  type="button"
                  aria-label="Share profile"
                  onClick={() => setIsShareOpen(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="2.5" />
                    <circle cx="6" cy="12" r="2.5" />
                    <circle cx="18" cy="19" r="2.5" />
                    <path d="M8.2 11l7.1-4.1M8.2 13l7.1 4.1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 flex w-full flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-[50px]">
          <aside className="w-full max-w-[300px] space-y-8">
            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-ink">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-[14px] font-medium text-muted"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success-25 text-success-600">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3.5 8.5l2.3 2.3 6.7-6.7" />
                      </svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-ink">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-ink">
                Credits (10)
              </h2>
              <div className="flex flex-wrap gap-2">
                {credits.map((credit) => (
                  <span
                    key={credit}
                    className="rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted"
                  >
                    {credit}
                  </span>
                ))}
                <button
                  className="flex items-center gap-1 text-[12px] font-semibold text-primary-500"
                  type="button"
                >
                  View More
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[20px] font-semibold text-ink">
                Collaborators
              </h2>
              <div className="flex flex-wrap gap-2">
                {collaborators.map((collaborator) => (
                  <span
                    key={collaborator}
                    className="rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted"
                  >
                    {collaborator}
                  </span>
                ))}
                <button
                  className="flex items-center gap-1 text-[12px] font-semibold text-primary-500"
                  type="button"
                >
                  View More
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-10">
            <div className="relative">
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[6px] bg-border" />
              <div
                ref={tabsRef}
                className="relative flex flex-wrap items-end gap-8"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    ref={(node) => {
                      tabRefs.current[tabs.indexOf(tab)] = node
                    }}
                    className={`relative pb-2 text-[18px] font-semibold ${
                      activeTab === tab ? 'text-primary-500' : 'text-muted'
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <span
                  className="pointer-events-none absolute bottom-0 h-[6px] bg-primary-500 transition-[transform,width] duration-300 ease-out"
                  style={{
                    transform: `translateX(${indicatorStyle.left - 6}px)`,
                    width: `${Math.max(0, indicatorStyle.width + 12)}px`,
                  }}
                />
              </div>
            </div>

            <div key={activeTab}>
              {activeTab === 'Reviews' ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-[20px] font-semibold text-ink">
                    <span className="flex items-center gap-2">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-5 w-5 text-[#ffbd27]"
                        fill="currentColor"
                      >
                        <path d="M10 1.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.5z" />
                      </svg>
                      4.5 (25)
                    </span>
                    <span className="text-border-strong">|</span>
                    <span className="text-[20px] font-medium text-muted">
                      {engineer.handle}
                    </span>
                  </div>

                  <div className="space-y-6 border-t border-border pt-6">
                    {reviews.map((review, index) => (
                      <div
                        key={`${review.name}-${index}`}
                        className="space-y-4 border-b border-border pb-6"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={engineer.imageUrl}
                            alt={review.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-[18px] font-medium text-ink">
                              {review.name}
                            </p>
                            <div className="flex items-center gap-3 text-[16px] text-muted">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map(
                                  (_, starIndex) => (
                                    <svg
                                      key={`${review.name}-star-${starIndex}`}
                                      viewBox="0 0 20 20"
                                      className={`h-4 w-4 ${
                                        starIndex < review.rating
                                          ? 'text-[#ffbd27]'
                                          : 'text-border'
                                      }`}
                                      fill="currentColor"
                                    >
                                      <path d="M10 1.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.5z" />
                                    </svg>
                                  ),
                                )}
                              </div>
                              <span className="font-semibold text-ink">
                                {review.rating.toFixed(1)}
                              </span>
                              <span className="text-border-strong">|</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[14px] font-medium text-muted">
                          {review.text}
                        </p>

                        {review.showReadMore ? (
                          <button
                            className="flex items-center gap-1 text-[12px] font-normal text-primary-500"
                            type="button"
                          >
                            Read More
                            <svg
                              viewBox="0 0 20 20"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            >
                              <path d="M6 8l4 4 4-4" />
                            </svg>
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                    <button
                      className="flex items-center gap-2 rounded-[8px] border border-border-strong bg-white px-4 py-2 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                      type="button"
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
                      {['1', '2', '3', '...', '8', '9', '10'].map((item) => (
                        <button
                          key={item}
                          className={`flex h-10 w-10 items-center justify-center rounded-[8px] font-inter ${
                            item === '1'
                              ? 'bg-primary-25 text-primary-500'
                              : 'text-muted'
                          }`}
                          type="button"
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <button
                      className="flex items-center gap-2 rounded-[8px] border border-border-strong bg-white px-4 py-2 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(10,13,18,0.05)]"
                      type="button"
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
                  </div>
                </div>
              ) : activeTab === 'Portfolio' ? (
                portfolioSection
              ) : activeTab === 'Services' ? (
                servicesSection
              ) : (
                aboutMeSection
              )}
            </div>
          </div>
        </section>
      </main>

      {isMessageOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            type="button"
            aria-label="Close message dialog"
            onClick={() => {
              setIsMessageOpen(false)
              setShowMessageSuccess(false)
            }}
          />

          {showMessageSuccess ? (
            <div
              className="relative z-10 w-[90%] max-w-[560px] rounded-[16px] bg-white shadow-[0_20px_50px_rgba(10,13,18,0.2)]"
              role="dialog"
              aria-modal="true"
              aria-label="Message sent"
            >
              <div className="flex items-start justify-between px-6 pb-2 pt-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-25 text-success-500">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 12l2.5 2.5L16 9" />
                    </svg>
                  </span>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-gray-50"
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                    setIsMessageOpen(false)
                    setShowMessageSuccess(false)
                  }}
                >
                  ×
                </button>
              </div>

              <div className="px-6 pb-6">
                <h3 className="text-[18px] font-semibold text-ink">
                  Message Sent
                </h3>
                <p className="mt-2 text-[14px] text-muted">
                  Your enquiry has been sent to this engineer, you can continue
                  with your booking while awaiting reply from this engineer.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <button
                    className="flex-1 rounded-[12px] bg-primary-25 py-3 text-[14px] font-semibold text-primary-500"
                    type="button"
                    onClick={() => {
                      setIsMessageOpen(false)
                      setShowMessageSuccess(false)
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="flex-1 rounded-[12px] bg-primary-500 py-3 text-[14px] font-semibold text-white"
                    type="button"
                    onClick={() => {
                      setIsMessageOpen(false)
                      setShowMessageSuccess(false)
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative z-10 w-[90%] max-w-[720px] overflow-hidden rounded-[16px] bg-white shadow-[0_20px_50px_rgba(10,13,18,0.2)]"
              role="dialog"
              aria-modal="true"
              aria-label="Submit message request"
            >
              <div className="flex items-center justify-between border-b border-border bg-gray-50 px-6 py-5">
                <h3 className="text-[18px] font-semibold text-ink">
                  Submit message request
                </h3>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-gray-50"
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                    setIsMessageOpen(false)
                    setShowMessageSuccess(false)
                  }}
                >
                  ×
                </button>
              </div>

              <div className="px-6 py-5">
                <textarea
                  className="h-40 w-full resize-none rounded-[12px] border border-border bg-white px-4 py-3 text-[14px] text-ink outline-none placeholder:text-subtle"
                  placeholder="Enter a message details..."
                  maxLength={500}
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                />
                <div className="mt-2 text-[12px] font-medium text-muted">
                  {messageText.length}/500
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 pb-6">
                <button
                  className="flex-1 rounded-[12px] bg-[#F2EBFD] py-3 text-[14px] font-semibold text-primary-500"
                  type="button"
                  onClick={() => {
                    setIsMessageOpen(false)
                    setShowMessageSuccess(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`flex-1 rounded-[12px] py-3 text-[14px] font-semibold ${
                    messageText.trim().length === 0
                      ? 'cursor-not-allowed bg-[#E9EAEB] text-[#A4A7AE]'
                      : 'bg-primary-500 text-white'
                  }`}
                  type="button"
                  disabled={messageText.trim().length === 0}
                  onClick={() => {
                    if (messageText.trim().length === 0) return
                    setShowMessageSuccess(true)
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {isShareOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            type="button"
            aria-label="Close share dialog"
            onClick={() => setIsShareOpen(false)}
          />

          <div
            className="relative z-10 w-[90%] max-w-[469px] overflow-hidden rounded-[12px] bg-white shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03)]"
            role="dialog"
            aria-modal="true"
            aria-label="Share profile"
          >
            <div className="flex items-center justify-between bg-gray-50 px-4 py-4">
              <span className="text-[20px] font-bold text-ink">
                Share Profile
              </span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-gray-100"
                type="button"
                aria-label="Close"
                onClick={() => setIsShareOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[16px] font-semibold text-ink">
                    Share this profile to
                  </p>
                  <div className="flex flex-nowrap items-start gap-6 overflow-x-auto pb-1">
                    {shareLinks.map((item) => (
                      <button
                        key={item.label}
                        className="flex w-[70px] flex-col items-center gap-2 text-[12px] font-medium text-ink"
                        type="button"
                        onClick={() => {
                          const href =
                            typeof item.href === 'function'
                              ? item.href(shareUrl)
                              : item.href
                          window.open(href, '_blank', 'noopener,noreferrer')
                        }}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-gray-50">
                          {item.icon}
                        </span>
                        {item.label.replace(' (Twitter)', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-[16px] font-semibold text-ink">
                    Copy profile link
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-[8px] bg-gray-50 px-4 py-2">
                    <span className="truncate text-[14px] font-medium text-ink">
                      {shareUrl}
                    </span>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-[6px] text-muted hover:bg-white"
                      type="button"
                      aria-label="Copy link"
                      onClick={handleCopyShareLink}
                    >
                      {hasCopied ? (
                        <svg
                          viewBox="0 0 20 20"
                          className="h-4 w-4 text-success-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4.5 10l3 3 8-8" />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M9 9h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {hasCopied ? (
                    <p className="mt-2 text-[12px] font-medium text-success-600">
                      Link copied to clipboard
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default EngineerProfile
