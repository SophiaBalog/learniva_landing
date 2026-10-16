import './styles/global.css'
import { getPage, ApiError } from './api'
import { renderBlocks } from './render'
import { loadCourses } from './blocks/courses/courses'
import { loadingHtml, notFoundHtml, errorHtml } from './states'
import type { PageState } from './types'
import { renderHeader } from './components/header'
import { initSignupModal } from './components/modals'

const app = document.querySelector<HTMLDivElement>('#app')!


const getSlug = (): string =>
  window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home'


function render(state: PageState): void {
  switch (state.status) {
    case 'loading':
      app.innerHTML = loadingHtml()
      break
    case 'notFound':
      app.innerHTML = notFoundHtml()
      break
    case 'error':
      app.innerHTML = errorHtml(state.message)
      document.querySelector('#retry')?.addEventListener('click', load)
      break
    case 'success':
      app.innerHTML = renderBlocks(state.data.layout)
      loadCourses()
      break
  }
}

async function load(): Promise<void> {
  render({ status: 'loading' })
  try {
    const page = await getPage(getSlug())
    render({ status: 'success', data: page })
  } catch (err: unknown) {
    if (err instanceof ApiError && err.status === 404) {
      render({ status: 'notFound' })
    } else {
      render({
        status: 'error',
        message: err instanceof Error ? err.message : 'Невідома помилка',
      })
    }
  }
}

renderHeader()
initSignupModal()
load()
load()