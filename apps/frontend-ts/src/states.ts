export const loadingHtml = (): string => `
  <div class="state">
    <div class="spinner"></div>
    <p>Завантаження…</p>
  </div>`

export const notFoundHtml = (): string => `
  <div class="state">
    <h2>404</h2>
    <p>Такої сторінки не існує</p>
  </div>`

export const errorHtml = (message: string): string => `
  <div class="state state--error">
    <h2>Щось пішло не так</h2>
    <p>${message}</p>
    <button class="btn" id="retry">Спробувати ще</button>
  </div>`