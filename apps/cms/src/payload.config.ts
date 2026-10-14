import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import {Courses} from './collections/Courses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const webUrl = process.env.WEB_URL || 'http://localhost:5173'
const cmsUrl = process.env.CMS_URL || 'http://localhost:3000'
const allowedOrigins = [webUrl, cmsUrl]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media,Pages,Courses],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  endpoints: [
    {
      path: '/featured-courses',
      method: 'get',
      handler: async (req) => {
        const limit = Number(req.query?.limit) || 6
        const result = await req.payload.find({
          collection: 'courses',
          where: { featured: { equals: true } },
          limit,
          depth: 1,
        })
        return Response.json(result.docs)
      },
    },
    {
      path: '/page-by-slug/:slug',
      method: 'get',
      handler: async (req) => {
        const slug = String(req.routeParams?.slug ?? '')
        const result = await req.payload.find({
          collection: 'pages',
          where: { slug: { equals: slug } },
          limit: 1,
          depth: 2,
        })
        const page = result.docs[0]
        if (!page) return Response.json({ message: 'Page not found' }, { status: 404 })
        return Response.json(page)
      },
    },
  ],
})
