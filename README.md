# Electric Home Hub

A developer-focused smart home management platform with compact icon-based device tiles, prominent API tools, document management, and data visualization featuring a clean black/white/red design.

## Features

- **Universal Device Tracking**: Monitor all electric hardware regardless of manufacturer
- **Centralized Documentation**: Store manuals, warranties, and documentation
- **Proactive Issue Monitoring**: Alerts for recalls, firmware updates, and device issues  
- **Developer API**: White-label solutions for building custom Electric Home Hub implementations
- **Data Export & Visualization**: Comprehensive analytics and reporting

## Tech Stack

- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js + Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query
- **Routing**: Wouter

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment using GitHub Actions.

### Setup

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The deployment workflow will automatically run on pushes to `main`

### Build Process

The GitHub Actions workflow will:
- Install dependencies
- Build the static frontend
- Deploy to GitHub Pages

Note: For GitHub Pages deployment, this becomes a frontend-only application. For full-stack functionality with the API, deploy to platforms like Vercel, Netlify, or Replit.

## Project Structure

```
├── client/           # React frontend
├── server/           # Express backend  
├── shared/           # Shared types and schemas
├── .github/workflows/ # GitHub Actions
└── dist/             # Build output
```

## API Documentation

The Developer API provides endpoints for:
- Device management
- Document storage
- Alert monitoring
- Data export

Visit `/developer-api` in the application for full documentation and examples.

## White Label Solutions

Build custom Electric Home Hub solutions using our API:
- Custom branding and UI
- Seamless integration with existing systems
- Enterprise support and custom features

## License

MIT License