export type PageSlug = string

type ImageSize = {
  url?: string | null
  width?: number | null
  height?: number | null
}

export type MediaRef = {
  id: number
  alt: string
  url: string
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: ImageSize
    tablet?: ImageSize
  }
}

type BaseBlock = {
  id?: string | null
  blockName?: string | null
}


export type HeroBlock = BaseBlock & {
  blockType: 'hero'
  heading: string
  subheading?: string | null
  image?: MediaRef | null
}

export type TextBlock = BaseBlock & {
  blockType: 'text'
  title?: string | null
  body: string
}

export type CourseListBlock = BaseBlock & {
  blockType: 'courseList'
  title?: string | null
  limit?: number | null
}

export type GalleryBlock = BaseBlock & {
  blockType: 'gallery'
  images: Array<{
    id?: string | null
    image: MediaRef
  }>
}

export type CtaBlock = BaseBlock & {
  blockType: 'cta'
  text: string
  buttonLabel: string
  buttonUrl: string
}
