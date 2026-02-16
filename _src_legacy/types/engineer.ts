export interface Engineer {
  id: string
  name: string
  handle: string
  title: string
  location: string
  rating: number
  reviewCount: number
  hourlyRate: string
  description: string
  tags: string[]
  badges: string[]
  bookedCount: number
  imageUrl: string
  availability: 'Available' | 'Limited' | 'Offline'
}
