# Electric Home Hub - Concept Overview

## Overview

Electric Home Hub is a full-stack web application designed to centralize smart home device management across all brands and platforms. The platform provides device tracking, documentation management, proactive issue monitoring, and developer APIs to simplify the fragmented experience of managing devices from multiple manufacturers.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **Styling**: CSS variables for theming with dark mode support

### Deployment Architecture
- **Static Hosting**: GitHub Pages with automatic deployment via GitHub Actions
- **Data Strategy**: Dual-mode operation - static JSON files for GitHub Pages, Express API for development
- **Query Layer**: Intelligent query client that detects environment and serves appropriate data source
- **Example Data**: Comprehensive demonstration data showcasing all five core functionalities

### Backend Architecture (Development Mode)
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **Development**: Hot reload with Vite middleware integration

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- `migrations/` - Database migration files

## Key Components

### Database Schema
The application uses four main database tables:
- **devices**: Core device inventory with manufacturer, model, warranty, and location data
- **documents**: File storage references for manuals and documentation
- **alerts**: Proactive monitoring notifications with severity levels
- **apiKeys**: API key management for developer integrations

### API Layer
- RESTful API endpoints for CRUD operations on all entities
- Type-safe request/response handling with Zod validation
- Error handling middleware with structured error responses
- Logging middleware for API request monitoring

### UI Components
- Responsive design with mobile-first approach
- Comprehensive component library using Radix UI primitives
- Dark theme with brand red (#FF0000) accent color
- Form handling with react-hook-form and Zod validation

## Data Flow

### Development Mode
1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes validate requests and interact with storage
3. **Database**: Drizzle ORM handles type-safe database operations
4. **Response**: JSON responses with proper error handling and status codes
5. **UI Updates**: Query cache invalidation triggers automatic UI updates

### Static Deployment (GitHub Pages)
1. **Environment Detection**: Query client detects GitHub Pages deployment
2. **Static JSON Files**: Data served from `/public/api/*.json` files
3. **Fallback System**: In-memory data as backup if JSON files unavailable
4. **Consistent Experience**: Same UI components work across both modes
5. **Demo Functionality**: All five core features fully demonstrated

## Recent Changes
- June 29, 2025: Implemented static HTML pages for GitHub Pages routing
  - Created individual HTML files for each route (documentation.html, tracking.html, etc.)
  - Each static page sets window.__INITIAL_ROUTE__ to specify the React route to load
  - Updated React app to check for __INITIAL_ROUTE__ and navigate accordingly
  - Simplified 404.html to handle true 404 cases only
  - This approach eliminates complex redirects and provides reliable GitHub Pages routing
  - URLs now work directly: /electrichomehub/documentation, /electrichomehub/tracking, etc.
- Earlier: Fixed GitHub Pages navigation and enhanced demo presentation
  - Added device warranty status diversity (3 active, 2 expiring soon, 2 expired)
  - Updated favicon to match header logo design (red background with white lightning bolt)
  - Enhanced JSON API files with clear example data comments for demonstration
  - Fixed logo navigation and updated all links for GitHub Pages deployment
- Implemented comprehensive static hosting solution for GitHub Pages
- Complete dual-mode architecture supporting both development and static deployment
- Environment-aware query client serving appropriate data sources
- Maintained full feature compatibility across deployment modes