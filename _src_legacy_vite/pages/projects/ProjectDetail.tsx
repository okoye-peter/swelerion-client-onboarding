import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SiteHeader from '../../components/SiteHeader'
import { fetchProject } from '../../services/api'
import {
  CURRENCY_SYMBOL,
  PROJECT_DETAIL_COPY,
  PROJECT_DETAIL_REVIEW_ITEMS,
  PROJECT_DETAIL_TIMELINE,
  PROJECT_STATUS,
  PROJECT_STATUS_LABELS,
} from '../../constants'

type ProjectDetail = {
  id: string
  name: string
  projectId: string
  serviceType: string
  status: string
  genre: string | null
  addOns: string[]
  orderTotal: number | null
}

type TimelineState = 'done' | 'current' | 'upcoming'

const statusBadgeStyles: Record<string, string> = {
  [PROJECT_STATUS.ongoing]: 'bg-[#FFFAEB] text-[#B54708]',
  [PROJECT_STATUS.draft]: 'bg-[#F5F5F5] text-[#414651]',
  [PROJECT_STATUS.completed]: 'bg-[#ECFDF3] text-[#027A48]',
}

const statusDotStyles: Record<string, string> = {
  [PROJECT_STATUS.ongoing]: 'bg-[#F79009]',
  [PROJECT_STATUS.draft]: 'bg-[#717680]',
  [PROJECT_STATUS.completed]: 'bg-[#12B76A]',
}

const timelineStateByStatus: Record<string, Record<string, TimelineState>> = {
  [PROJECT_STATUS.draft]: {
    create: 'done',
    payment: 'upcoming',
    upload: 'upcoming',
    revision_1: 'upcoming',
    revision_2: 'upcoming',
    delivery: 'upcoming',
  },
  [PROJECT_STATUS.ongoing]: {
    create: 'done',
    payment: 'current',
    upload: 'upcoming',
    revision_1: 'upcoming',
    revision_2: 'upcoming',
    delivery: 'upcoming',
  },
  [PROJECT_STATUS.completed]: {
    create: 'done',
    payment: 'done',
    upload: 'current',
    revision_1: 'upcoming',
    revision_2: 'upcoming',
    delivery: 'upcoming',
  },
}

const ProjectDetailPage = () => {
  const navigate = useNavigate()
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!projectId) return
    setIsLoading(true)
    setError('')
    fetchProject(projectId)
      .then((data) => setProject(data))
      .catch((err) => {
        const message =
          err instanceof Error ? err.message : PROJECT_DETAIL_COPY.loadError
        setError(message)
      })
      .finally(() => setIsLoading(false))
  }, [projectId])

  const bannerCopy = useMemo(() => {
    if (!project) {
      return {
        title: PROJECT_DETAIL_COPY.reviewBannerTitle,
        body: PROJECT_DETAIL_COPY.reviewBannerBody,
      }
    }
    if (project.status === PROJECT_STATUS.draft) {
      return {
        title: PROJECT_DETAIL_COPY.draftBannerTitle,
        body: PROJECT_DETAIL_COPY.draftBannerBody,
      }
    }
    if (project.status === PROJECT_STATUS.completed) {
      return {
        title: PROJECT_DETAIL_COPY.completedBannerTitle,
        body: PROJECT_DETAIL_COPY.completedBannerBody,
      }
    }
    return {
      title: PROJECT_DETAIL_COPY.reviewBannerTitle,
      body: PROJECT_DETAIL_COPY.reviewBannerBody,
    }
  }, [project])

  const timelineStates = useMemo(() => {
    if (!project) return timelineStateByStatus[PROJECT_STATUS.ongoing]
    return (
      timelineStateByStatus[project.status] ??
      timelineStateByStatus[PROJECT_STATUS.ongoing]
    )
  }, [project])

  const revisionBadgeText =
    project?.status === PROJECT_STATUS.draft
      ? PROJECT_DETAIL_COPY.paymentRequiredBadge
      : PROJECT_DETAIL_COPY.revisionsAvailable

  const paymentStatusLabel =
    project?.status === PROJECT_STATUS.completed
      ? PROJECT_DETAIL_COPY.paid
      : PROJECT_DETAIL_COPY.notPaid

  const isDraft = project?.status === PROJECT_STATUS.draft

  return (
    <div className="min-h-screen bg-white text-ink">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-4 py-10 sm:px-6 lg:px-[80px]">
        <div className="mb-10 flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F5F5]"
            onClick={() => navigate('/my-projects')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="#252B37"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-lg font-medium text-ink">
            {PROJECT_DETAIL_COPY.backToProjects}
          </span>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-[30px] font-semibold text-ink">
              {project?.name || PROJECT_DETAIL_COPY.placeholderTitle}
            </h1>
            <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
            <span className="font-display text-[30px] font-medium text-[#717680]">
              {project?.projectId || PROJECT_DETAIL_COPY.placeholderTitle}
            </span>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-xl border border-[#E9EAEB] bg-white p-6 text-sm text-muted">
            {PROJECT_DETAIL_COPY.loadingText}
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between gap-6 rounded-2xl bg-[#341864] px-6 py-4 text-white">
              <div>
                <h2 className="text-xl font-semibold">{bannerCopy.title}</h2>
                <p className="text-sm text-[#FAFAFA]">{bannerCopy.body}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#F3FAE8] px-4 py-2 text-sm font-medium text-[#78BA14]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#D9EFB7]">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10a6 6 0 0 1 10.392-4.162L16 4.23V8h-3.77l1.71-1.61A4 4 0 1 0 14 10h2a6 6 0 0 1-12 0Z"
                      fill="#78BA14"
                    />
                  </svg>
                </span>
                {revisionBadgeText}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[340px_1fr_340px]">
              <div className="rounded-2xl border border-[#E9EAEB] bg-[#FAFAFA] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-ink">
                    {PROJECT_DETAIL_COPY.timelineTitle}
                  </h3>
                  {project ? (
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                        statusBadgeStyles[project.status] ||
                        statusBadgeStyles[PROJECT_STATUS.ongoing]
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          statusDotStyles[project.status] ||
                          statusDotStyles[PROJECT_STATUS.ongoing]
                        }`}
                      />
                      {PROJECT_STATUS_LABELS[project.status as keyof typeof PROJECT_STATUS_LABELS]}
                    </span>
                  ) : null}
                </div>
                <div className="space-y-4">
                  {PROJECT_DETAIL_TIMELINE.map((item, index) => {
                    const state = timelineStates[item.id] ?? 'upcoming'
                    const isDone = state === 'done'
                    const isCurrent = state === 'current'
                    const bulletColor = isDone || isCurrent ? 'bg-[#D9EFB7]' : 'bg-[#E9EAEB]'
                    const lineColor = isDone ? 'border-[#D9EFB7]' : 'border-[#E9EAEB]'
                    const lineStyle = isDone ? 'border-solid' : 'border-dashed'

                    return (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full ${bulletColor}`}>
                            {isDone ? (
                              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M5 10l3 3 7-7"
                                  stroke="#78BA14"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <span className="h-2 w-2 rounded-full bg-[#78BA14]" />
                            )}
                          </span>
                          {index < PROJECT_DETAIL_TIMELINE.length - 1 ? (
                            <span className={`h-14 w-px border ${lineColor} ${lineStyle}`} />
                          ) : null}
                        </div>
                        <div className="flex-1 rounded-xl bg-white px-4 py-3">
                          <div className="flex items-center justify-between text-sm font-semibold text-ink">
                            <span>{item.title}</span>
                            <span className="text-xs text-[#A4A7AE]">
                              {PROJECT_DETAIL_COPY.timelineEta}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-[#717680]">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-[#E9EAEB] bg-[#FAFAFA] p-6">
                <h3 className="mb-4 text-lg font-semibold text-ink">
                  {PROJECT_DETAIL_COPY.revisionTitle}
                </h3>
                {isDraft ? (
                  <div className="rounded-xl bg-white p-6">
                    <h4 className="text-sm font-semibold text-ink">
                      {PROJECT_DETAIL_COPY.draftBannerTitle}
                    </h4>
                    <p className="mt-2 text-sm text-[#717680]">
                      {PROJECT_DETAIL_COPY.draftBannerBody}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 inline-flex rounded-lg bg-[#D9EFB7] px-4 py-2 text-sm font-semibold text-[#5E9110]">
                      {PROJECT_DETAIL_COPY.versionLabel}
                    </div>
                    <div className="rounded-xl bg-white p-6">
                      <div className="mb-4 h-16 w-full rounded-lg bg-[#F5F5F5]" />
                      <div className="flex items-center justify-between text-sm font-semibold text-ink">
                        <span>{PROJECT_DETAIL_COPY.audioStart}</span>
                        <div className="flex items-center gap-3 text-[#84CC16]">
                          <span className="h-4 w-4 rounded-full bg-[#84CC16]/20" />
                          <span className="h-6 w-6 rounded-full bg-[#84CC16]" />
                          <span className="h-4 w-4 rounded-full bg-[#84CC16]/20" />
                        </div>
                        <span>{PROJECT_DETAIL_COPY.audioEnd}</span>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg bg-[#F3FAE8] p-4">
                      <h4 className="text-sm font-semibold text-ink">
                        {PROJECT_DETAIL_COPY.whatReviewedTitle}
                      </h4>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {PROJECT_DETAIL_REVIEW_ITEMS.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm text-[#717680]"
                          >
                            <span className="h-4 w-4 rounded-full bg-[#D9EFB7]" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-ink">
                        {PROJECT_DETAIL_COPY.reviewHelpText}
                      </p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-xl bg-[#5829A8] p-4 text-white">
                        <div className="flex items-center justify-between text-xs font-semibold text-white/80">
                          <span>{PROJECT_DETAIL_COPY.commentAuthor}</span>
                          <span>{PROJECT_DETAIL_COPY.commentAge}</span>
                        </div>
                        <p className="mt-3 text-xs text-white/90">
                          {PROJECT_DETAIL_COPY.commentBody}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="rounded-lg bg-[#E9EAEB] px-4 py-2 text-xs font-semibold text-[#A4A7AE]">
                          {PROJECT_DETAIL_COPY.approveVersion}
                        </button>
                        <button className="rounded-lg bg-[#E9EAEB] px-4 py-2 text-xs font-semibold text-[#A4A7AE]">
                          {PROJECT_DETAIL_COPY.reviewVersion}
                        </button>
                      </div>

                      <div className="rounded-lg border border-[#F5F5F5] bg-white p-3">
                        <input
                          type="text"
                          className="w-full text-xs text-[#A4A7AE] outline-none"
                          placeholder={PROJECT_DETAIL_COPY.commentPlaceholder}
                        />
                        <div className="mt-3 flex items-center justify-between text-xs text-[#7C3AED]">
                          <span>{PROJECT_DETAIL_COPY.sendButton}</span>
                          <span className="rounded-full bg-[#F2EBFD] px-2 py-1">
                            {PROJECT_DETAIL_COPY.sendIcon}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#5E9110]">
                        {PROJECT_DETAIL_COPY.revisitNote}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-[#E9EAEB] bg-[#FAFAFA] p-6">
                <h3 className="mb-4 text-lg font-semibold text-ink">
                  {PROJECT_DETAIL_COPY.projectDetailsTitle}
                </h3>
                <div className="mb-4 rounded-xl bg-white p-4">
                  <h4 className="text-sm font-semibold text-ink">
                    {PROJECT_DETAIL_COPY.versionHistoryTitle}
                  </h4>
                  <div className="mt-3 rounded-lg bg-[#F3FAE8] p-3 text-xs text-[#717680]">
                    <div className="flex items-center justify-between">
                      <span>{PROJECT_DETAIL_COPY.versionLabel}</span>
                      <span className="rounded-full bg-[#FFFAEB] px-2 py-1 text-[10px] text-[#B54708]">
                        {PROJECT_DETAIL_COPY.awaitingReview}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span>{PROJECT_DETAIL_COPY.defaultAudioName}</span>
                      <span className="rounded-full bg-[#D9EFB7] px-2 py-1 text-[10px] text-[#5E9110]">
                        {PROJECT_DETAIL_COPY.playLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 rounded-xl bg-white p-4">
                  <h4 className="text-sm font-semibold text-ink">
                    {PROJECT_DETAIL_COPY.fileUploadsTitle}
                  </h4>
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F3FAE8] px-3 py-2 text-xs text-ink">
                    <span>{PROJECT_DETAIL_COPY.defaultAudioName}</span>
                    <span className="text-[#717680]">({PROJECT_DETAIL_COPY.defaultAudioSize})</span>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 text-sm text-ink">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#717680]">{PROJECT_DETAIL_COPY.genreLabel}</span>
                    <span>{project?.genre || PROJECT_DETAIL_COPY.placeholderValue}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#717680]">{PROJECT_DETAIL_COPY.servicesLabel}</span>
                    <span>{project?.serviceType || PROJECT_DETAIL_COPY.placeholderValue}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#717680]">{PROJECT_DETAIL_COPY.addOnsLabel}</span>
                    <span>
                      {project?.addOns?.length
                        ? project.addOns.join(', ')
                        : PROJECT_DETAIL_COPY.placeholderValue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#717680]">{PROJECT_DETAIL_COPY.deliveryEtaLabel}</span>
                    <span>{PROJECT_DETAIL_COPY.defaultEta}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#717680]">{PROJECT_DETAIL_COPY.totalCostLabel}</span>
                    <span>
                      {project?.orderTotal != null
                        ? `${CURRENCY_SYMBOL}${project.orderTotal.toFixed(2)}`
                        : PROJECT_DETAIL_COPY.placeholderValue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#717680]">{PROJECT_DETAIL_COPY.paymentStatusLabel}</span>
                    <div className="flex items-center gap-2">
                      <span>{paymentStatusLabel}</span>
                      {project?.status === PROJECT_STATUS.completed ? (
                        <button className="rounded-lg bg-[#F2EBFD] px-3 py-1 text-xs font-semibold text-[#7C3AED]">
                          {PROJECT_DETAIL_COPY.viewInvoice}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default ProjectDetailPage
