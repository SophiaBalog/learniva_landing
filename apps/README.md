# НМТ Старт

Fullstack-застосунок «конструктор сторінок» для лендінгу підготовки до НМТ. Редактор збирає сторінки з блоків в адмін-панелі Payload CMS, а клієнтський сайт на Vite отримує їх через API та відображає відвідувачу.

## Стек

| Частина | Технології |
|---|---|
| CMS та API | Payload CMS 3 (Next.js, Node.js), TypeScript |
| База даних | PostgreSQL (хмарна, Neon) |
| Клієнт | Vite, TypeScript (без UI-фреймворків), CSS |

## Архітектура

```
Редактор   →  Payload Admin  →  PostgreSQL (Neon)
                                      ↑
Відвідувач →  Vite-сайт  →  fetch  →  API Payload
```

CMS і сайт розгортаються окремо та спілкуються через HTTP. Для цього в CMS налаштовано CORS і CSRF.

## Структура репозиторію

```
.
├── cms/                 # Payload CMS (адмінка + API)
│   └── src/
│       ├── collections/ # Users, Media, Courses, Pages
│       ├── blocks/      # Hero, Text, Gallery, CTA, CourseList
│       └── payload.config.ts
├── frontend-ts/         # Клієнтський сайт
│   └── src/
│       ├── blocks/      # шаблон + css кожного блока
│       ├── components/  # шапка, модальне вікно
│       ├── styles/      # global.css
│       ├── types.ts     # типи (Alias, Union, Intersection)
│       ├── api.ts       # запити до CMS
│       ├── render.ts    # вибір шаблону за blockType
│       ├── states.ts    # екрани loading / 404 / error
│       └── main.ts      # точка входу
└── README.md
```

## Можливості

- Сторінки збираються з блоків: Hero, Text, Course List, Gallery, CTA. Порядок задає редактор.
- Колекція курсів із позначкою `featured`: блок «Список курсів» показує лише відмічені.
- Адаптивна верстка (mobile-first, брейкпоінти 768 px і 1200 px).
- Обробка станів: завантаження, сторінку не знайдено (404), помилка з кнопкою «Спробувати ще».
- Спливаюче вікно «Записатись» з перевіркою email.
- Типізація на TypeScript: псевдоніми, union, intersection, generic-функція `fetchJson<T>`.

## Локальний запуск

**Вимоги:** Node.js 20 або новіший, npm, акаунт у Neon (або будь-яка PostgreSQL).

1. Клонувати репозиторій:
   ```bash
   git clone <посилання-на-репозиторій>
   cd <назва-папки>
   ```
2. Встановити залежності в обох папках:
   ```bash
   cd cms && npm install
   cd ../frontend-ts && npm install
   ```
3. Створити файли `.env` за зразком `.env.example`:

   **`cms/.env`**
   ```env
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   PAYLOAD_SECRET=довгий-випадковий-рядок
   WEB_URL=http://localhost:5173
   CMS_URL=http://localhost:3000
   ```

   **`frontend-ts/.env`**
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Запустити CMS (порт 3000):
   ```bash
   cd cms
   npm run dev
   ```
   Відкрити `http://localhost:3000/admin` і створити першого адміністратора.
5. В іншому терміналі запустити сайт (порт 5173):
   ```bash
   cd frontend-ts
   npm run dev
   ```
6. У CMS створити зображення, курси та сторінку зі slug `home`, після чого відкрити `http://localhost:5173`.

Після зміни схеми колекцій згенеруйте типи Payload: `npm run generate:types` (у папці `cms`). Перевірка типів клієнта: `npx tsc --noEmit` (у папці `frontend-ts`).

## API

Базова адреса: `http://localhost:3000` (на деплої адреса CMS).

| Метод | Адреса | Опис |
|---|---|---|
| GET | `/api/page-by-slug/:slug` | Сторінка за slug з розгорнутими зображеннями. Якщо сторінки немає, відповідь 404 `{ "message": "Page not found" }` |
| GET | `/api/featured-courses?limit=N` | Курси з позначкою `featured`, не більше N (за замовчуванням 6) |

Також доступний стандартний REST API Payload (`/api/pages`, `/api/courses`, `/api/media`).

## Колекції CMS

| Колекція | Поля |
|---|---|
| `users` | email, password |
| `media` | alt, файл (автоматичні розміри `thumbnail`, `tablet`) |
| `courses` | title, description, price, featured, image |
| `pages` | title, slug (унікальний), layout (масив блоків) |

## Деплой

- CMS: _вставити посилання_
- Сайт: _вставити посилання_

Порядок: БД (Neon) → CMS (змінні `DATABASE_URL`, `PAYLOAD_SECRET`, `WEB_URL`, `CMS_URL`; сховище для зображень у хмарі) → сайт (змінна `VITE_API_URL` на адресу CMS, правило перенаправлення всіх шляхів на `index.html`) → оновити `WEB_URL` у CMS на реальну адресу сайту.

## Скріншоти

| Сценарій | Скріншот |
|---|---|
| Редактор у CMS: сторінка з блоками | `docs/screenshots/cms-page.png` |
| Сайт, десктоп | `docs/screenshots/site-desktop.png` |
| Сайт, мобільна версія | `docs/screenshots/site-mobile.png` |
| Стан завантаження | `docs/screenshots/state-loading.png` |
| Стан 404 | `docs/screenshots/state-404.png` |
| Стан помилки | `docs/screenshots/state-error.png` |

