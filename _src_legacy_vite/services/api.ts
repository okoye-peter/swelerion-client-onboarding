import { API_BASE_URL, API_MESSAGES } from '../constants'

type ApiErrorPayload = {
  message?: string
}

const buildUrl = (path: string) => {
  if (path.startsWith('http')) return path
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

const parseError = async (response: Response) => {
  try {
    const data = (await response.json()) as ApiErrorPayload
    return data?.message || API_MESSAGES.requestFailed
  } catch {
    return API_MESSAGES.requestFailed
  }
}

export const initializePayment = async (payload: {
  email: string
  amount: number
  currency?: string
  reference?: string
  callbackUrl?: string
  metadata?: Record<string, unknown>
}) => {
  const response = await fetch(buildUrl('/payments/initialize'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return (await response.json()) as {
    authorizationUrl: string
    accessCode: string
    reference: string
    gateway: string
  }
}

export const verifyPayment = async (reference: string) => {
  const response = await fetch(
    buildUrl(`/payments/verify/${encodeURIComponent(reference)}`),
  )

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return (await response.json()) as {
    status: string
    paid: boolean
    reference: string
    amount: number
    currency: string
    paidAt: string | null
    channel: string | null
    customerEmail: string | null
    gateway: string
  }
}

export const uploadAudio = async (
  file: File,
  metadata?: {
    projectId?: string
    serviceType?: string
    notes?: string
    referenceUrl?: string
  },
) => {
  const formData = new FormData()
  formData.append('file', file)

  if (metadata?.projectId) formData.append('projectId', metadata.projectId)
  if (metadata?.serviceType) formData.append('serviceType', metadata.serviceType)
  if (metadata?.notes) formData.append('notes', metadata.notes)
  if (metadata?.referenceUrl) formData.append('referenceUrl', metadata.referenceUrl)

  const response = await fetch(buildUrl('/uploads/audio'), {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return (await response.json()) as {
    bucket: string
    key: string
    url: string
    size: number
    contentType: string
    originalName: string
    uploadedAt: string
    metadata: Record<string, unknown>
    storageProvider: 's3' | 'mock'
  }
}

export const fetchProjects = async (params?: {
  status?: string
  search?: string
  page?: number
  pageSize?: number
}) => {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set('status', params.status)
  if (params?.search) searchParams.set('search', params.search)
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.pageSize)
    searchParams.set('pageSize', params.pageSize.toString())

  const queryString = searchParams.toString()
  const response = await fetch(
    buildUrl(`/projects${queryString ? `?${queryString}` : ''}`),
  )

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return (await response.json()) as {
    items: Array<{
      id: string
      name: string
      projectId: string
      serviceType: string
      status: string
    }>
    page: number
    pageSize: number
    total: number
  }
}

export const fetchProject = async (projectId: string) => {
  const response = await fetch(
    buildUrl(`/projects/${encodeURIComponent(projectId)}`),
  )

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return (await response.json()) as {
    id: string
    name: string
    projectId: string
    serviceType: string
    status: string
    genre: string | null
    addOns: string[]
    orderTotal: number | null
  }
}

export const createDraftProject = async (payload: {
  name?: string
  serviceType?: string
  genre?: string
  addOns?: string[]
  orderTotal?: number
}) => {
  const response = await fetch(buildUrl('/projects'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return (await response.json()) as {
    id: string
    name: string
    projectId: string
    serviceType: string
    status: string
  }
}
