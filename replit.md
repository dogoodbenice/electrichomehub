# Electric Home Hub - Concept Overview

## Overview

Electric Home Hub is a full-stack web application designed to centralize smart home device management across all brands and platforms. The platform provides device tracking, documentation management, proactive issue monitoring, and developer APIs to simplify the fragmented experience of managing devices from multiple manufacturers.

## System Architecture

### Frontend Architecture
- **Framework**: Vanilla JavaScript with HTML5 for maximum compatibility
- **Styling**: Custom CSS with CSS variables for theming (black background, white text, red #ff3333 accents)
- **Components**: Modular JavaScript functions with DOM manipulation
- **State Management**: Local state management with localStorage persistence
- **Build Tool**: No build process required - direct static file serving
- **Interactivity**: Native DOM events and modern JavaScript features

### Deployment Architecture
- **Static Hosting**: GitHub Pages with direct HTML/CSS/JS files
- **Data Strategy**: Client-side data management with demonstration datasets
- **File Structure**: Self-contained HTML pages with shared CSS and JavaScript modules
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
- June 29, 2025: Complete static site reconstruction for GitHub Pages deployment
  - Removed all React/TypeScript infrastructure and build dependencies
  - Created clean directory structure: css/, js/, images/
  - Built comprehensive API documentation with webhooks, error handling, and multi-language examples
  - Eliminated 95% of dependencies (105 packages → minimal static files)
  - Added package-lock.json to resolve GitHub Actions build requirements
  - All five core features preserved: device tracking, documentation, monitoring, API, data export
  - Ready for direct GitHub Pages deployment without build process
- Earlier: Complete vanilla JavaScript reconstruction for static hosting
  - Rebuilt entire application using vanilla JavaScript and HTML for maximum GitHub Pages compatibility
  - Created comprehensive static pages: index.html, developer.html, tracking.html, documentation.html
  - Implemented complete CSS styling with Electric Home Hub theme (black background, white text, red #ff3333 accents)
  - Added interactive JavaScript modules: scripts.js, developer.js, tracking.js, documentation.js
  - Features include: mobile navigation, device filtering, file upload simulation, modal dialogs
  - All functionality works without build process or external dependencies
  - Maintains electric-themed dividers, animated elements, and responsive design
- Earlier: Complete static HTML page implementation with improved navigation
  - Created comprehensive static pages with full content and consistent styling
  - Removed "Dashboard" from navigation menu for cleaner structure
  - All pages work correctly at https://dogoodbenice.github.io/electrichomehub/[page].html
- Earlier: Complete static GitHub Pages demo with enhanced styling
  - Fixed DeviceTile component to display proper warranty status badges (Active/Expiring/Expired)
  - Added animated demo section with blue/purple gradient background below electric divider
  - Created "INTERACTIVE DEMO" badge with pulsing elements to distinguish demo content
- Earlier: Implemented static HTML pages for GitHub Pages routing
  - Added device warranty status diversity (2 active, 2 expiring soon, 2 expired)
  - Enhanced JSON API files with clear example data comments for demonstration
  - Fixed logo navigation and updated all links for GitHub Pages deployment
- Implemented comprehensive static hosting solution for GitHub Pages
- Complete dual-mode architecture supporting both development and static deployment
- Environment-aware query client serving appropriate data sources
- Maintained full feature compatibility across deployment modes