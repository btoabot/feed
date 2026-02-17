# Feed App — Overview

Feed app built with **Next.js (App Router)**.

## How it works

- **`/feed`** is the main page.
- First page of posts is fetched on the **server** (fast first render).
- The feed UI runs on the **client** with **Redux** + **react-window**:
  - Redux stores posts, pagination, loading/error, and scroll position.
  - react-window virtualizes rows (renders only what’s visible).
- Post details live at **`/feed/[id]`**.

## Run locally (macOS / Linux / Windows)

### 1) Install

```bash
npm install
```

### 2) Development

```bash
npm run dev
```

Open:

- http://localhost:3000 (redirects to `/feed`)

### 3) Production (recommended for Lighthouse)

```bash
npm run build
npm run start
```

## Lighthouse

- Run in **production** (`build` + `start`)
- Chrome Incognito → DevTools → Lighthouse

<img width="593" height="746" alt="Image" src="https://github.com/user-attachments/assets/bd0c1911-c826-4c74-9d1f-de13f7bce6de" />

## Build analizer

<img width="1199" height="685" alt="Image" src="https://github.com/user-attachments/assets/22037c79-6089-4ffc-8a82-86cce679384d" />
