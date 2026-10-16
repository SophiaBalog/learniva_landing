import './header.css'

export function renderHeader(): void {
  const header = document.querySelector<HTMLElement>('#header')!
  const isAbout = window.location.pathname.replace(/\/+$/, '') === '/about'

  header.innerHTML = `
    <nav class="header__nav">
      <a class="header__logo" href="/">НМТ Старт</a>
      <a class="btn header__btn" href="${isAbout ? '/' : '/about'}">
        ${isAbout ? 'Головна' : 'Про нас'}
      </a>
    </nav>`
}