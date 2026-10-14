import './text.css'
import type { TextBlock } from '../../types'

export function text(block:TextBlock){
    return `
        <section class="text container">
            <h2>${block.title}</h2>
            <p>${block.body}</p>
        </section>
    `;

}