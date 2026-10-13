import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'price', type: 'number' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}