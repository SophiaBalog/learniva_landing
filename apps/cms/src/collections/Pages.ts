import type { CollectionConfig } from 'payload'
import { Hero, TextBlock, Gallery, Cta } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'layout', type: 'blocks', required: true, blocks: [Hero, TextBlock, Gallery, Cta] },
  ],
}