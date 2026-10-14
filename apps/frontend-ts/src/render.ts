import type { Block } from './types'
import { hero } from './blocks/hero/hero'
import { text } from './blocks/text/text'
import { gallery } from './blocks/gallery/gallery'
import { cta } from './blocks/cta/cta'
import { courseList } from './blocks/courses/courses'

export function renderBlock(block: Block): string {
  switch (block.blockType) {
    case 'hero':
      return hero(block)
    case 'text':
      return text(block)
    case 'gallery':
      return gallery(block)
    case 'cta':
      return cta(block)
    case 'courseList':
      return courseList(block)
  }
};

export function renderBlocks(blocks: Block[]): string {
  return blocks.map(renderBlock).join('')
};