# Electric Home Hub - Demo Platform

🚀 **This is a fully functional demonstration** of the Electric Home Hub platform, showcasing a comprehensive smart home management solution with rich example data and interactive features.

## Demo Highlights

Experience all five core features with realistic example data:

### 📱 Universal Device Tracking
- **6 Example Devices**: Smart Fridge, EV Charger, Solar Panels, Heat Pump, Smart Thermostat, Battery Storage
- Interactive device tiles with warranty status, installation dates, and location tracking
- Multi-manufacturer support (Samsung, Tesla, SunPower, Mitsubishi, Nest, Enphase)

### 📋 Document Management  
- **5+ Sample Documents**: Device manuals, warranty certificates, installation guides
- Upload interface with drag-and-drop functionality
- Organized by device with quick access and search

### 🚨 Proactive Issue Monitoring
- **4 Active Alerts**: Firmware updates, warranty expiration, recall notices, maintenance reminders
- Priority-based alert system (High, Medium, Low)
- Real-time notification interface with detailed alert descriptions

### 🔧 Developer API
- **Complete API Documentation**: Interactive endpoints for all features
- Code examples in multiple languages (JavaScript, Python, cURL)
- Authentication and rate limiting examples
- White-label integration guides

### 📊 Data Export & Visualization
- **Interactive Charts**: Device distribution, warranty timeline, alert trends
- Export capabilities for CSV, JSON, and PDF formats
- Comprehensive analytics dashboard with filtering options

## Try the Demo

**🌐 Live Demo**: [https://dogoodbenice.github.io/electrichomehub/](https://dogoodbenice.github.io/electrichomehub/)

Explore the complete platform with pre-loaded example data demonstrating real-world smart home scenarios. No setup required - all features are immediately accessible.

## Key Demo Data Examples

**Sample Devices Include:**
- Samsung Smart Fridge (RF28R7351) - Kitchen, warranty expires 2026
- Tesla Wall Connector EV Charger - Garage, installed 2023
- SunPower Solar Panel System - Roof, 10kW capacity
- Mitsubishi Heat Pump - Living Room, energy efficient heating/cooling
- Nest Learning Thermostat - Smart temperature control
- Enphase Battery Storage - Basement, 13.5kWh capacity

**Sample Alerts Include:**
- High Priority: Tesla firmware update available
- Medium Priority: Smart Fridge warranty expiring in 6 months
- Low Priority: Quarterly HVAC maintenance reminder
- Information: New energy efficiency report available

**Sample Documents Include:**
- Installation manuals for all devices
- Warranty certificates with expiration tracking
- Energy efficiency reports and compliance documents
- Maintenance schedules and service records

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

## Demo Deployment

This demonstration is automatically deployed to GitHub Pages, showcasing the complete Electric Home Hub experience with realistic data.

### Static Demo Architecture

The demo uses a sophisticated dual-mode system:
- **Static Deployment**: Serves pre-loaded example data for immediate exploration
- **Development Mode**: Full-stack functionality with live API when running locally
- **Smart Environment Detection**: Seamlessly switches between modes based on deployment context

### Deployment Features

- Automatic deployment via GitHub Actions on code changes
- Optimized static build with comprehensive example data
- Mobile-responsive design with dark theme
- Full navigation and feature demonstration without backend requirements

## Project Structure

```
├── client/           # React frontend
├── server/           # Express backend  
├── shared/           # Shared types and schemas
├── .github/workflows/ # GitHub Actions
└── dist/             # Build output
```

## For Developers

The demo includes a complete Developer API section with:
- **Interactive API Documentation**: Test endpoints directly in the browser
- **Code Examples**: JavaScript, Python, and cURL implementations
- **Authentication Examples**: API key management and security
- **Integration Guides**: White-label solutions and custom implementations

Perfect for exploring how to build custom Electric Home Hub solutions with your own branding and features.

## Demo vs Production

This demonstration showcases the complete Electric Home Hub platform capabilities:

**Demo Features (GitHub Pages):**
- Static deployment with comprehensive example data
- All UI components and interactions fully functional
- Complete feature demonstration across all five core areas
- Mobile-responsive design with dark theme

**Production Features (Full Stack):**
- Live API with database persistence
- Real-time data updates and synchronization
- User authentication and multi-tenant support
- Advanced analytics and reporting
- Enterprise integrations and custom features

## License

MIT License