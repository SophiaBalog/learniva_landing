import './modals.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateEmail(value: string): string {
  const email = value.trim()
  if (!email) return 'Введіть email'
  if (!EMAIL_RE.test(email)) return 'Невірний формат email'
  return ''
}

export function initSignupModal(): void {
  const dialog = document.createElement('dialog')
  dialog.className = 'modal'
  dialog.innerHTML = `
    <div class="modal__box">
      <h2 class="modal__title">Запис на пробне заняття</h2>
      <label class="modal__label" for="signup-email">Ваш email</label>
      <input class="modal__input" id="signup-email" type="email"
             placeholder="name@example.com" autocomplete="email">
      <p class="modal__error" role="alert"></p>
      <button class="btn modal__close" type="button">Записатись</button>
    </div>`
  document.body.append(dialog)

  const input = dialog.querySelector<HTMLInputElement>('.modal__input')!
  const error = dialog.querySelector<HTMLParagraphElement>('.modal__error')!
  const submitBtn = dialog.querySelector<HTMLButtonElement>('.modal__close')!

  const showError = (message: string): void => {
    error.textContent = message
    input.classList.toggle('modal__input--invalid', message !== '')
  }


  submitBtn.addEventListener('click', () => {
    const message = validateEmail(input.value)
    if (message) {
      showError(message)
      input.focus()
      return
    }
    dialog.close()
  })

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') submitBtn.click()
  })

  input.addEventListener('input', () => showError(''))

  dialog.addEventListener('click', (e: MouseEvent) => {
    if (e.target === dialog) dialog.close()
  })

  dialog.addEventListener('close', () => {
    input.value = ''
    showError('')
  })

  document.addEventListener('click', (e: MouseEvent) => {
    const link = (e.target as HTMLElement).closest('a[href="#contact"]')
    if (!link) return
    e.preventDefault()
    dialog.showModal()
  })
}