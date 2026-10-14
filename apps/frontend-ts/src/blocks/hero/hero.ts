import './hero.css'
import type { HeroBlock } from '../../types'
import { mediaUrl } from '../../api'

export function hero(block: HeroBlock) {

    const imageUrl = block.image?.url ? mediaUrl(block.image.url) : ''
    const bg = imageUrl ? `style="background-image:url('${imageUrl}')"` : ''

    return `
        <section class="hero" ${bg}>
            <div class="hero__content">
                <h1 class="hero__title">${block.heading}</h1>
                <p class="hero__subtitle">${block.subheading}</p>
            </div>
        </section>
    `
}

