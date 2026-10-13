import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}

export const TextBlock: Block = {
  slug: 'text',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'body', type: 'textarea', required: true },
  ],
}

export const Gallery: Block = {
  slug: 'gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}

export const Cta: Block = {
  slug: 'cta',
  fields: [
    { name: 'text', type: 'text', required: true },
    { name: 'buttonLabel', type: 'text', required: true },
    { name: 'buttonUrl', type: 'text', required: true },
  ],
}

export const CourseList: Block = {
  slug: 'courseList',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Популярні курси' },
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 12 },
  ],
}