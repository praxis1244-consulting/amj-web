# AMJ Ingeniería — Web

Corporate site for AMJ Ingeniería, a cybersecurity consultancy based in Santiago, Chile.

## Stack

- **Frontend**: React 19, Tailwind CSS 4, Framer Motion, Wouter
- **Backend**: Express 5, tRPC, Supabase
- **Build**: Vite 6, TypeScript 5

## Development

```bash
pnpm install
pnpm dev          # client + server
pnpm dev:client   # client only
pnpm build        # production build
```

## Structure

```
client/       → React app (pages, components, styles)
server/       → Express + tRPC API
shared/       → Shared types and schemas
public/       → Static assets (logo, lottie, favicon)
index.html    → Entry point
```
