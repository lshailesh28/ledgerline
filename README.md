# Ledgerline

A subscription revenue admin dashboard built with **Angular 19**, **Signals**, **AG Grid**, and **Chart.js**.

**Live demo:** _add your link_ | **Walkthrough video:** _add your Loom link_

![Dashboard](docs/dashboard.png)
_Add screenshots to `docs/` (dashboard, customers grid, dark theme)._

## What it does

- **Role-based access.** Administrators can suspend and reactivate accounts and open Settings. Viewers get a read-only app, and the Settings route is blocked for them by a route guard, not just hidden.
- **Overview.** Monthly recurring revenue, average per account, trials, and past-due amounts, plus a 12-month revenue chart, revenue by plan, and the past-due accounts to chase.
- **Customers.** An AG Grid table with sorting, per-column filters, quick search, pagination, multi-row selection, and CSV export.
- **Light and dark themes** that follow the system setting and persist. The chart and grid both re-theme.
- **Accessible by default.** Labelled form fields, visible keyboard focus, live-region updates, and reduced-motion support.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Administrator | admin@ledgerline.dev | admin123 |
| Viewer | viewer@ledgerline.dev | viewer123 |

The login screen has one-click buttons for both.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm test           # unit tests (Jest)
npm run e2e        # end-to-end tests (Playwright)
npm run build      # production build in dist/ledgerline/browser
```

For the first end-to-end run, install a browser with `npx playwright install chromium`.

## Technical decisions

- **Signals for state.** Services expose signals and `computed` values (`DataService.kpis`, `AuthService.isAdmin`). There is no NgRx, because the state is small and this is simpler to read.
- **Standalone components and lazy routes.** Every page is lazy-loaded. AG Grid is registered inside the Customers route, so the initial bundle is about 260 kB raw (76 kB transferred).
- **Functional guards.** `authGuard` and `roleGuard('admin')` return a `UrlTree` redirect.
- **Stable row IDs in the grid.** Status changes update rows in place and keep the selection.
- **Theme tokens.** One set of CSS variables drives the app, the AG Grid theme, and the chart colours.

## Tests

- **Unit (Jest):** authentication, role checks, route guards, KPI math, and status updates.
- **End-to-end (Playwright):** login redirect, wrong-password error, viewer blocked from Settings, grid search and selection, and CSV download.
- **CI:** GitHub Actions runs unit tests with coverage and the production build on every push and pull request, then the Playwright suite.

## Deploy

`netlify.toml` and `vercel.json` are included, with SPA rewrites so deep links work. Connect the repository and deploy.

## Project structure

```
src/app/
  core/      auth, guards, theme, settings, data service, models
  layout/    app shell (sidebar and navigation)
  pages/     login, dashboard, customers, settings
  shared/    revenue chart
e2e/         Playwright tests
```

## Honest limits

- Customer data is generated sample data (seeded, so it is the same on every load), and the 12-month revenue series is illustrative.
- Authentication is a demo. Replace `AuthService` with calls to a real API and token handling before using this for anything real.

## Ideas for next steps

Connect a real backend (NestJS or Firebase), add server-side pagination to the grid, and add an audit log for status changes.
