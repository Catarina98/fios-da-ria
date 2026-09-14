# Component showcase (temporary)

A lightweight, Storybook-style gallery of every primitive in
`src/components/ui/*`, so designers can browse and test components in the
running app during development. Components are listed in a sidebar; clicking
one swaps the preview pane on the right without a full page reload. The
sidebar also has a dark-mode toggle scoped to the showcase, so each
component's dark-mode styling can be checked in place.

## What it is

| Path                                        | Purpose                                                    |
| ------------------------------------------- | ---------------------------------------------------------- |
| `src/showcase/registry.ts`                  | The list of components (slug, name, summary, group).       |
| `src/showcase/demos/<slug>.tsx`             | One file per demo — default-exports its render.            |
| `src/showcase/demos/_shared.tsx`            | Helpers and fixtures used by more than one demo.           |
| `src/showcase/demos/index.ts`               | The `demoMap` — one lazy `next/dynamic` chunk per slug.    |
| `src/showcase/ShowcaseShell.tsx`            | Sidebar + preview layout, owns the dark-mode toggle state. |
| `src/showcase/ShowcaseSidebar.tsx`          | The grouped nav list and the dark-mode toggle button.      |
| `src/showcase/ShowcaseContent.tsx`          | A single component's demo, heading and summary.            |
| `src/app/[locale]/showcase/layout.tsx`      | Wraps every `/showcase/*` route in `<ShowcaseShell />`.    |
| `src/app/[locale]/showcase/[slug]/page.tsx` | The `/showcase/<slug>` route.                              |
| `src/app/[locale]/page.tsx`                 | Temporarily redirects `/` to the first showcase entry.     |

Copy is inline English on purpose — this is throwaway tooling and is not
translated through `next-intl`.

## Adding a component

1. Add an entry to `showcaseList` in `registry.ts` (set `group: 'Foundations'`
   for a token/primitive entry — everything else defaults to `'Components'`).
   Keep the list **alphabetical by `slug`** within each group.
2. Add `src/showcase/demos/<slug>.tsx` (filename = the registry slug) with a
   `default` export of `() => ReactNode`, then register it in `demoMap`
   (`demos/index.ts`) as `<slug>: dynamic(() => import('./<slug>'))`. Keep
   `demoMap` **alphabetical by slug** too.
3. Helpers or fixtures shared by more than one demo go in `demos/_shared.tsx`;
   single-use ones stay in the demo file. `_shared.tsx` must never import a
   demo (import cycle).

## Removing the showcase

```bash
rm -rf src/showcase src/app/[locale]/showcase
git checkout -- src/app/[locale]/page.tsx   # or restore the real homepage
```

Then check `src/app/[locale]/__tests__/page.test.tsx` still matches the
homepage.
