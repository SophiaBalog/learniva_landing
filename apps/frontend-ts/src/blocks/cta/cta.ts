import './cta.css'
import type { CtaBlock } from '../../types'

export function cta(block:CtaBlock): string{
    return `
        <section class="cta container">
            <h2>${block.text}</h2>
            <a class="btn" href="${block.buttonUrl}">${block.buttonLabel}</a>
        </section>

    `;
}