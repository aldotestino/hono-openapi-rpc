[![CI](https://github.com/aldotestino/hono-openapi-rpc/actions/workflows/test.yml/badge.svg)](https://github.com/aldotestino/hono-openapi-rpc/actions/workflows/test.yml)
![GitHub deployments](https://img.shields.io/github/deployments/aldotestino/hono-openapi-rpc/production?logo=railway&label=Deployment)
[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Namq7J?referralCode=tgV_hi)

# hono-openapi-rpc

A modern monorepo for building full-stack applications with [Bun](https://bun.sh), [Hono](https://hono.dev), [OpenAPI](https://swagger.io/specification/), and [TanStack Router](https://tanstack.com/router). This project is organized as a Bun workspace with separate API and Web applications, plus a shared schema package.

## Project Structure

```
hono-openapi-rpc/
  apps/
    api/      # Hono-based API server (OpenAPI, Zod, Bun)
    web/      # React web app (Vite, TanStack Router, Tailwind CSS)
  packages/
    db/       # Shared Drizzle ORM schema and database client for the monorepo
  package.json
  README.md
  bun.lock
  tsconfig.json
```

## Prerequisites

- [Bun](https://bun.sh) v1.2.17 or later
- Node.js (for some tooling, optional)
- [Git](https://git-scm.com/)
- [TypeScript](https://www.typescriptlang.org/) (peer dependency)
- [Neon](https://neon.tech/) project for the PostgreSQL database
- GitHub OAuth app (for authentication) ([create one here](https://github.com/settings/developers))

## Getting Started

Install all dependencies for all workspaces:

```bash
bun install
```

## Running the Applications

### API Server

Runs the Hono API server (on port 4000 by default):

```bash
bun run api
```

- Source: `apps/api`
- Main entry: `src/index.ts`
- Serves OpenAPI endpoints under `/api`
- Serves static files from `apps/api/public` for non-API routes

### Web App

Runs the React web app (Vite dev server on port 3000):

```bash
bun run web
```

- Source: `apps/web`
- Main entry: `src/main.tsx`
- Uses TanStack Router, React Query, Tailwind CSS, and shadcn/ui
- Proxies API requests to the API server

## Building for Production

Build the web app (output to `apps/api/public` for static serving):

```bash
bun run build
```

## Starting in Production

Start the API server (serves both API and built static web):

```bash
bun run start
```

## Workspace Scripts

From the root, you can use these scripts:

| Script         | Description                                                      |
|----------------|------------------------------------------------------------------|
| `api`          | Run the API server in dev mode                                   |
| `web`          | Run the web app in dev mode                                      |
| `build`        | Build the web app for production                                 |
| `start`        | Start the API server (serves static + API)                       |
| `db:generate`  | Generate database migrations (from `packages/db`)              |
| `db:migrate`   | Run database migrations (from `packages/db`)                     |
| `db:push`      | Push schema changes to the database (from `packages/db`)         |
| `db:studio`    | Open database studio UI (from `packages/db`)                     |
| `test`         | Run API tests (from `apps/api`)                                  |
| `format`       | Format codebase using Biome/Ultracite                            |

## Packages

### apps/api

- Hono v4 (API framework)
- Zod (validation)
- OpenAPI (via @hono/zod-openapi)
- Serves static files from `public/`
- Exposes OpenAPI docs and reference
- Uses Bun for fast startup

### apps/web

- React 19
- Vite 6
- TanStack Router & Query
- Tailwind CSS 4
- shadcn/ui components
- Proxies `/api` requests to the API server

### packages/db

- Shared Drizzle ORM schema and database client for the monorepo
- Provides schema definitions for users, notes, accounts, sessions, and verification
- Exports Zod schemas for type-safe validation and OpenAPI generation
- Used by both API and Web for consistent data modeling and validation

## Development Notes

- All apps and packages use TypeScript modules.
- Use `bun install` to install dependencies across all workspaces.
- The web app builds to `apps/api/public` for seamless static serving by the API server.
- API routes are namespaced under `/api` (see `BASE_PATH`).
- Static files are served for all other routes.

## Customization

- Add new API endpoints in `apps/api/src/routes/`
- Add new React routes in `apps/web/src/routes/`
- Add or update shared schemas in `packages/schema/`

## Acknowledgements

- [Bun](https://bun.sh)
- [Hono](https://hono.dev)
- [TanStack Router](https://tanstack.com/router)
- [Zod](https://zod.dev)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Neon](https://neon.tech/)
- [better-auth](https://www.better-auth.com/)
