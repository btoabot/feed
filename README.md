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

## Build analizer
