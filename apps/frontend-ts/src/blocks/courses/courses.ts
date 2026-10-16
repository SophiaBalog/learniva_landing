import './courses.css'
import type { CourseListBlock, Course } from '../../types'
import { getFeaturedCourses, mediaUrl } from '../../api'


function courseCard(c: Course):string{
    const imageUrl = c.image?.url ? mediaUrl(c.image.url) : ''
    return `
        <article class="course-card">
            <img src="${imageUrl}" alt="${c.image?.alt}}">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <strong>${c.price}</strong>
        </article>
    `;
}


export function courseList(block: CourseListBlock): string {
  return `
    <section class="courses container">
      ${block.title ? `<h2>${block.title}</h2>` : ''}
      <div class="courses__grid" data-limit="${block.limit ?? 3}">
        <div class="state"><div class="spinner"></div></div>
      </div>
    </section>`
}


export async function loadCourses(): Promise<void> {
  const grids = document.querySelectorAll<HTMLElement>('.courses__grid')

  for (const grid of grids) {
    try {
      const list = await getFeaturedCourses(Number(grid.dataset.limit))
      grid.innerHTML = list.map(courseCard).join('')
    } catch {
      grid.innerHTML = '<p class="state--error">Не вдалося завантажити курси</p>'
    }
  }
}