# MockGen

Easily generate modern App Store & Google Play screenshots with customizable mockups.

## Features

- Mockup generation for iOS and Android
- Custom backgrounds, text, images, and templates
- Drag-and-drop support to organize screenshots
- High-resolution export (PNG, WebP, AVIF)
- Real-time preview
- Multiple templates and formats supported

## Development

Set the required environment variables in your `.env.local`:

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

## Useful Links

- [Live site](https://mockgen.click)

MIT License
