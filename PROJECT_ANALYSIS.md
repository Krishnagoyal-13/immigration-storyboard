# Project Analysis: Immigration Storyboard

## Overview
This repository contains a Next.js App Router application in `ircc-storyboard/` that provides an AI-assisted immigration guidance experience for Canadian IRCC-related workflows.

## Architecture Snapshot
- **Frontend/UI**: Next.js 15 + React 19 with Tailwind and shadcn-style UI components under `src/components`.
- **Routing model**:
  - Public pages (`/`, `/about`, `/contact`, `/knowtheteam`, `/public/auth`)
  - Protected pages under `/private/*` (`prompt`, `storyboard`, `explore`)
- **Backend/API**:
  - `src/app/api/chat/route.ts` calls OpenRouter and expects JSON-array responses.
  - `src/app/api/auth/[...nextauth]/route.ts` wires NextAuth to Google OAuth.
- **Persistence**: Prisma + PostgreSQL with a single `User` model currently defined in `prisma/schema.prisma`.

## Key Strengths
1. **Clear private/public segmentation** via middleware route guarding.
2. **Reasonable LLM output hardening** with response sanitation and JSON parse checks before returning data to UI.
3. **Modern stack cohesion** (Next.js App Router + Prisma + NextAuth).

## Notable Issues / Risks
1. **Auth route mismatch risk**
   - NextAuth custom sign-in page is configured as `/auth` in `authOptions`, while middleware redirects unauthenticated users to `/public/auth`.
   - This could lead to inconsistent navigation behavior depending on entry path.
2. **Lint workflow not bootstrapped for CI**
   - `npm run lint` opens Next.js interactive ESLint setup prompt because no ESLint config is committed.
   - This blocks non-interactive CI quality checks.
3. **Build fragility due to remote Google font fetch**
   - Production build currently fails in restricted/offline environments because `next/font` fetches Geist fonts at build-time.
4. **Data model is minimal**
   - Only `User` exists; no persisted prompt/storyboard/session entities yet, limiting product continuity features (history, saved flows, analytics).
5. **LLM contract brittleness**
   - JSON extraction uses regex-based bracket matching; malformed model output could still pass extraction but fail semantics.

## Immediate Recommendations (High Impact)
1. Unify auth sign-in path configuration between NextAuth and middleware.
2. Commit an ESLint configuration so `npm run lint` is non-interactive.
3. Replace remote Google font dependency with a local/self-hosted font strategy for deterministic builds.
4. Add schema models for `PromptSession` and `StoryboardStep` to support saved user progress.
5. Add runtime schema validation (e.g., Zod) for LLM response structure before client delivery.

## Developer Experience Notes
- Top-level `package.json` is lockfile-only metadata; actual app scripts/deps live in `ircc-storyboard/package.json`.
- Prisma generation currently warns about missing explicit `generator output` (future Prisma 7 compatibility concern).

## Validation Performed
- Attempted lint (`npm run lint`) -> blocked by interactive ESLint initialization prompt.
- Attempted production build (`npm run build`) -> failed due to inability to fetch Geist fonts from Google.
