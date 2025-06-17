# MockGen

<p>
  <a href="https://github.com/deveix/mockgen/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/deveix/mockgen?style=flat-square" alt="License: MIT" />
  </a>
  <a href="https://github.com/deveix/mockgen/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/deveix/mockgen/ci.yml?branch=main&style=flat-square" alt="Build Status" />
  </a>
  <a href="https://github.com/deveix/mockgen/releases">
    <img src="https://img.shields.io/github/v/release/deveix/mockgen?style=flat-square&label=latest" alt="Latest Release" />
  </a>
</p>

<div style="display: flex; justify-content: center; align-items: center; gap: 32px; margin-bottom: 16px;">
  <a href="https://mockgen.click/" target="_blank">
    <img src="public/samples/logos/imgsrc.png" alt="MockGen Logo" width="300" />
  </a>
  <a href="https://mockgen.click/" target="_blank">
    <img src="public/samples/logos/demo-logo.png" alt="Demo MockGen" width="200" />
  </a>
</div>

Easily generate modern App Store & Google Play screenshots with customizable mockups.

## Features

- Mockup generation for iOS and Android
- Custom backgrounds, text, images, and templates
- Drag-and-drop support to organize screenshots
- High-resolution export (PNG, WebP, AVIF)
- Real-time preview
- Multiple templates and formats supported

<img src="public/samples/logos/preview.gif" alt="Preview of Mockgen" style="display: block; margin: 0 auto" />

## Development

Create a `.env.local` file by copying and filling the file env.example

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Install dependencies and start the app:

```shell
yarn
yarn dev
```

## Build & Production

To build for production:

```shell
yarn build
yarn start
```

## Usage Example

1. Select a template (iOS, Android, Open Graph, etc.)
2. Add your screenshots or images
3. Customize background, text, and colors
4. Reorder images with drag-and-drop
5. Export your ready-to-publish mockups

## Project Structure

- `app/`: Next.js pages and main logic
- `components/`: UI components and forms
- `lib/`: utilities, templates, SEO
- `public/`: static assets (icons, images, examples)
- `stores/`: state management (template stores)
- `types/`: TypeScript types

MIT License
