import './gallery.css'
import type { GalleryBlock } from '../../types'
import { mediaUrl, mediaSrcSet } from '../../api'

export function gallery(block: GalleryBlock): string {
  const imgs = block.images
    .map(({ image }) => `
      <img
        src="${mediaUrl(image.url)}"
        srcset="${mediaSrcSet(image)}"
        sizes="(max-width: 768px) 100vw, 33vw"
        alt="${image.alt}"
        loading="lazy">`)
    .join('')

  return `
    <section class="gallery container">
      ${imgs}
    </section>`
}