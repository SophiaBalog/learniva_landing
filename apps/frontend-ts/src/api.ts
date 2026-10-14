import type { Page, PageSlug, Course, MediaRef } from './types'

const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) throw new ApiError(`Помилка запиту: ${res.status}`, res.status)
  return (await res.json()) as T
};

export const getPage = (slug: PageSlug): Promise<Page> =>
  fetchJson<Page>(`/api/page-by-slug/${encodeURIComponent(slug)}`)

export const getFeaturedCourses = (limit: number): Promise<Course[]> =>
  fetchJson<Course[]>(`/api/featured-courses?limit=${limit}`)

export const mediaUrl = (url: string): string =>
  url.startsWith('http') ? url : `${API_URL}${url}`

export function mediaSrcSet(m: MediaRef): string {
  const { thumbnail, tablet } = m.sizes ?? {}
  const parts: string[] = []
  if (thumbnail?.url && thumbnail.width) parts.push(`${mediaUrl(thumbnail.url)} ${thumbnail.width}w`)
  if (tablet?.url && tablet.width) parts.push(`${mediaUrl(tablet.url)} ${tablet.width}w`)
  return parts.join(', ')
}