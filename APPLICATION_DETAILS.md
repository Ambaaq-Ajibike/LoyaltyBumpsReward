# Application Architecture & Flow

## Platform Overview
LoyaltyBumpsReward is a loyalty management platform for motorcycle dealerships. It comprises a Laravel-powered REST API and a React + Redux client. Together they manage user authentication, purchase tracking, badge progression, and achievement notifications.

```
┌──────────────────────┐     HTTPS      ┌─────────────────────┐
│ React Client (Vite)  │◀──────────────▶│ Laravel API (REST)  │
│ • Auth state (Redux) │               │ • Controllers       │
│ • UI components      │               │ • Events & Listeners│
│ • Bike catalog       │               │ • Jobs & Queues      │
└──────────────────────┘               └─────────────────────┘
          │                                      │
          ▼                                      ▼
┌──────────────────────┐             ┌────────────────────────┐
│ Local Storage (JWT)  │             │ MySQL / MariaDB / SQL  │
└──────────────────────┘             └────────────────────────┘
```

## Domain Model Snapshot
| Entity | Description | Key Relations |
| ------ | ----------- | ------------- |
| `users` | Rider accounts with credentials and profile info | Primary actor for purchases and achievements |
| `purchases` | Individual transactions captured via MockPaymentProvider | Belongs to a user; triggers progression |
| `achievements` | Catalog of milestones (e.g., first purchase) | Many-to-many with users via `user_achievements` |
| `badges` | Tiered loyalty levels rewarding cumulative points | Many-to-many with users via `user_badges` |

## Backend Architecture (Laravel)
- **Routing**: API routes live in `api/routes/api.php`, grouped under versioned namespaces.
- **Controllers**: Handle request validation, invoke services, and return JSON resources.
- **Events & Listeners**: `PurchaseMade`, `AchievementUnlocked`, and `BadgeUnlocked` encapsulate domain events. Listeners (`ProcessPurchases`, `ProcessAchievements`, `ProcessBadges`, `ProcessCashback`) perform side-effect logic, enabling horizontal scaling via queues.
- **Jobs & Queues**: When configured, heavy processing runs asynchronously. Queue workers are essential for real-time badge updates.
- **Services**: `MockPaymentProvider` simulates payment processing, abstracting external payment gateways.
- **OpenAPI Docs**: `api/app/OpenApi/OpenApi.php` defines schema metadata consumed by `l5-swagger`.
- **Config & Providers**: `AppServiceProvider` binds interfaces, registers observers, and can publish API docs in non-production environments.

### Data Flow: Purchase to Reward
1. Client submits a purchase through `POST /api/purchases`.
2. Controller validates payload and records a `Purchase` entry.
3. `PurchaseMade` event fires, enqueuing `ProcessAchievements` and `ProcessBadges` listeners.
4. Listeners compute new totals, unlock achievements, and adjust badge tiers.
5. Resulting models create or update `user_achievements` / `user_badges` pivot tables.
6. Notifications are sent via toasts (frontend) and optional emails/SMS (extensible).

## Frontend Architecture (React + Redux Toolkit)
- **Entry Point**: `client/src/main.jsx` hydrates the React tree and mounts `App`.
- **State Management**: `client/src/store` uses Redux Toolkit slices:
  - `authSlice`: login, logout, token persistence, current user fetch
  - `achievementSlice`: async fetch of achievements, error and loading states
  - `purchaseSlice`: purchase list retrieval, totals aggregation, new purchase submissions
  - `toastSlice`: transient toast notifications for success/error feedback
- **UI Components**: Located in `client/src/components` with Tailwind CSS for styling.
- **Pages**: `Dashboard.jsx` orchestrates data fetching, displays achievements, renders bike catalog modal, and surfaces user status.
- **Services**: `client/src/services` wraps Axios for API calls, centralizing base URLs and interceptors.
- **Routing**: Currently single-page with conditional rendering; can be extended with React Router.

### Client Data Lifecycle
1. App bootstraps, reading JWT/token from `localStorage` if present.
2. `authSlice` loads current user via `GET /api/me`.
3. When the user lands on the dashboard:
   - `fetchAchievements` and `fetchPurchases` dispatch concurrently.
   - Loading state renders `LoadingSpinner` until promises resolve.
   - Error states show `ErrorBoundary`, allowing manual retries.
4. Primary widgets (`BadgeCard`, `ProgressBar`, `AchievementItem`) render derived metrics (totals, remaining points, badge cashback).
5. When the user initiates a bike purchase:
   - `BikePurchaseModal` collects selection and dispatches `createPurchase`.
   - Optimistic UI closes the modal on success and triggers a `fetchAchievements` refresh to display new rewards.

## Authentication & Security
- Tokens are stored client-side; API expects bearer tokens on protected routes.
- Laravel guards enforce auth and can attach middleware for rate limiting or scopes.
- CSRF is mitigated via stateless APIs; ensure HTTPS in production.
- User passwords are hashed with Laravel's default `bcrypt`.

## Error Handling Strategy
- **Backend**: Controllers return standardized JSON error objects with status codes; exceptions bubble through Laravel's handler for logging.
- **Frontend**: Async thunks catch errors, dispatch toast notifications, and store user-readable messages in slice state.
- **Retry Logic**: Refresh button triggers `fetchAchievements({ showSuccessToast: true })` to re-attempt after transient failures.

## Caching & Performance
- Laravel leverages cache drivers as configured in `config/cache.php`. Use Redis or Memcached in production for achievement computations.
- React client memoizes currency formatting and expensive derived values via `useMemo`.
- API pagination is available for purchases; current UI slices the first four for dashboard display.

## Extensibility Roadmap
- Replace `MockPaymentProvider` with a live payment gateway integration via service contracts.
- Introduce WebSockets or Laravel Echo for real-time achievement updates without manual refresh.
- Implement dedicated admin panel for managing achievements and badge criteria.
- Add unit and feature tests for Redux slices using Jest/React Testing Library.

## Deployment Considerations
- **Backend**: Deploy Laravel with PHP-FPM + Nginx; configure `.env` for production database, mail, queues, and cache drivers.
- **Frontend**: Use `npm run build` to produce static assets; host on Vercel, Netlify, or S3/CloudFront. Set `VITE_API_BASE_URL` to the production API URL.
- **CI/CD**: Implement workflows that lint, test, and build both the API and client before deploying.

## Monitoring & Observability
- Enable Laravel logging (`storage/logs/laravel.log`) and pipe to centralized systems in production.
- Add analytics and error tracking (e.g., Sentry) on the frontend to capture runtime exceptions.
- Track domain metrics: total purchases, badge unlock counts, and queue processing times.

## Summary
LoyaltyBumpsReward combines a robust Laravel backend with a modern React frontend to deliver a responsive loyalty experience. Events, listeners, and queues keep rewards logic scalable, while Redux slices and Tailwind components present data-rich dashboards that encourage continued engagement.
