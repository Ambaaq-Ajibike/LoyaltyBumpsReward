# LoyaltyBumpsReward

## Introduction
LoyaltyBumpsReward is a full-stack loyalty and rewards platform designed for motorcycle dealerships. The Laravel API powers achievements, badges, cashback rules, and purchase tracking, while the React + Vite client lets riders monitor progress, review past purchases, and unlock new rewards in real time.

## Prerequisites
- PHP 8.2 or newer with required PHP extensions for Laravel
- Composer 2.x
- Postgresql (or another database supported by Laravel) or SQLite for local development
- Node.js 20.x and npm 10.x (ships with Node 20)
- Git for version control
- Optional: Docker Desktop if you prefer containerized services

## Quick Start
1. Clone the repository and move into the project root.
2. Follow the API setup instructions to configure the backend.
3. Follow the client setup instructions to configure the React interface.
4. Run both servers and visit the frontend to interact with the platform.

## Backend (Laravel API) Setup
1. Change into the API directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Copy the example environment file and update database/mail credentials:
   ```bash
   cp .env.example .env
   ```
4. Generate the Laravel application key:
   ```bash
   php artisan key:generate
   ```
5. Configure your database connection inside `.env`, then run migrations and seeds:
   ```bash
   php artisan migrate --seed
   ```
6. If you plan to use queues, start a queue worker in a separate terminal:
   ```bash
   php artisan queue:work
   ```
7. Serve the API locally (default port 8000):
   ```bash
   php artisan serve
   ```

### API Testing
- Run the PHPUnit suite:
  ```bash
  php artisan test
  ```
- API documentation is generated under `storage/api-docs` and can be exposed via the configured route.

## Frontend (React Client) Setup
1. Change into the client directory:
   ```bash
   cd client
   ```
2. Install JavaScript dependencies:
   ```bash
   npm install
   ```
3. Create an environment file (optional but recommended) for API endpoints:
   ```bash
   cp .env.example .env
   ```
   Populate values such as `VITE_API_BASE_URL` with your Laravel server URL.
4. Start the development server (default port 5173):
   ```bash
   npm run dev
   ```
5. Build production assets when ready to deploy:
   ```bash
   npm run build
   ```

### Frontend Quality Checks
- Run linting:
  ```bash
  npm run lint
  ```
- Run the mocked formatting and type-check scripts (placeholders for now):
  ```bash
  npm run format
  npm run type-check
  ```

## Running the Full Stack
- Ensure the Laravel API (`php artisan serve`) and React client (`npm run dev`) are both running.
- Visit `http://localhost:5173` in your browser.
- Log in with an existing user or seed users to explore achievements, badges, and purchases.

## Additional Notes
- Queued jobs, events, and listeners handle achievement/badge processing; keep the queue worker active for real-time updates.
- Update `config/services.php` and related configuration files if you integrate external payment providers.
- Tailwind CSS powers the client styling; adjust `tailwind.config.js` to extend the design system.
