#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create client directory if it doesn't exist
const clientDir = path.join(__dirname, 'client');
if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true });
}

// Updated HTML template with proper React routing support
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electric Home Hub - Smart Device Management Platform</title>
    <meta name="description" content="The smart platform empowering anyone to seamlessly manage all their electric hardware. Universal device tracking, centralized documentation, and proactive monitoring.">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Electric Home Hub - Smart Device Management">
    <meta property="og:description" content="Universal device tracking, centralized documentation, and proactive monitoring for all your electric hardware.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dogoodbenice.github.io/electrichomehub/">
    
    <style>
        :root {
            --background: 0 0% 3.9%;
            --foreground: 0 0% 98%;
            --card: 0 0% 3.9%;
            --card-foreground: 0 0% 98%;
            --popover: 0 0% 3.9%;
            --popover-foreground: 0 0% 98%;
            --primary: 0 0% 9%;
            --primary-foreground: 0 0% 98%;
            --secondary: 0 0% 14.9%;
            --secondary-foreground: 0 0% 98%;
            --muted: 0 0% 14.9%;
            --muted-foreground: 0 0% 63.9%;
            --accent: 0 0% 14.9%;
            --accent-foreground: 0 0% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 0 0% 98%;
            --border: 0 0% 14.9%;
            --input: 0 0% 14.9%;
            --ring: 0 0% 83.1%;
            --chart-1: 12 76% 61%;
            --chart-2: 173 58% 39%;
            --chart-3: 197 37% 24%;
            --chart-4: 43 74% 66%;
            --chart-5: 27 87% 67%;
            --radius: 0.5rem;
        }
        
        * {
            border-color: hsl(var(--border));
        }
        
        body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        
        .brand-red {
            color: #ff3333;
        }
        
        .bg-brand-red {
            background-color: #ff3333;
        }
        
        .border-brand-red {
            border-color: #ff3333;
        }
        
        .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            text-align: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 2rem;
        }
        
        .logo-icon {
            width: 3rem;
            height: 3rem;
            background-color: #ff3333;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .loading-text {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .loading-subtext {
            color: hsl(var(--muted-foreground));
            margin-bottom: 2rem;
        }
        
        .spinner {
            width: 2rem;
            height: 2rem;
            border: 2px solid hsl(var(--muted));
            border-top-color: #ff3333;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .navigation-links {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .nav-link {
            padding: 0.5rem 1rem;
            background-color: hsl(var(--secondary));
            border: 1px solid hsl(var(--border));
            border-radius: 6px;
            color: hsl(var(--foreground));
            text-decoration: none;
            transition: all 0.2s;
        }
        
        .nav-link:hover {
            border-color: #ff3333;
            background-color: rgba(255, 51, 51, 0.1);
        }
        
        .error-message {
            background-color: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            max-width: 600px;
        }
    </style>
</head>
<body>
    <div id="root">
        <div class="loading-container">
            <div class="logo">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
                    </svg>
                </div>
                <h1 class="loading-text">Electric Home Hub</h1>
            </div>
            <p class="loading-subtext">Loading your smart device management platform...</p>
            <div class="spinner"></div>
            
            <div class="navigation-links">
                <a href="/electrichomehub/developer.html" class="nav-link">Developer API</a>
                <a href="/electrichomehub/tracking.html" class="nav-link">Device Tracking</a>
                <a href="/electrichomehub/documentation.html" class="nav-link">Documentation</a>
                <a href="/electrichomehub/monitoring.html" class="nav-link">Issue Monitoring</a>
                <a href="/electrichomehub/data-export.html" class="nav-link">Data Export</a>
                <a href="/electrichomehub/faq.html" class="nav-link">FAQ</a>
            </div>
            
            <div id="error-container" style="display: none;">
                <div class="error-message">
                    <h3>Loading Issue Detected</h3>
                    <p>If the application doesn't load within 10 seconds, you can access the static pages directly using the links above.</p>
                </div>
            </div>
        </div>
    </div>
    
    <script type="module">
        // Show error message after 10 seconds if React app hasn't loaded
        setTimeout(() => {
            if (document.getElementById('root').children.length === 1) {
                document.getElementById('error-container').style.display = 'block';
            }
        }, 10000);
        
        // Set initial route for React app if it loads
        const path = window.location.pathname.replace('/electrichomehub', '');
        if (path && path !== '/') {
            window.__INITIAL_ROUTE__ = path;
        }
    </script>
    
    <!-- React App will mount here when available -->
    <script type="module" src="./src/main.tsx"></script>
</body>
</html>`;

// Write the main index.html
fs.writeFileSync(path.join(clientDir, 'index.html'), htmlTemplate);

// Create a simple 404.html for GitHub Pages
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electric Home Hub - Page Not Found</title>
    <style>
        body {
            background-color: #000;
            color: #fff;
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 2rem;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .logo {
            color: #ff3333;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 2rem;
        }
        .navigation {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        .nav-link {
            padding: 0.75rem 1.5rem;
            background-color: #1a1a1a;
            border: 1px solid #333;
            border-radius: 6px;
            color: #fff;
            text-decoration: none;
            transition: all 0.2s;
        }
        .nav-link:hover {
            border-color: #ff3333;
            background-color: rgba(255, 51, 51, 0.1);
        }
    </style>
</head>
<body>
    <div class="logo">Electric Home Hub</div>
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist. Navigate to one of our main sections:</p>
    
    <div class="navigation">
        <a href="/electrichomehub/" class="nav-link">Home</a>
        <a href="/electrichomehub/developer.html" class="nav-link">Developer API</a>
        <a href="/electrichomehub/tracking.html" class="nav-link">Device Tracking</a>
        <a href="/electrichomehub/documentation.html" class="nav-link">Documentation</a>
        <a href="/electrichomehub/monitoring.html" class="nav-link">Issue Monitoring</a>
        <a href="/electrichomehub/data-export.html" class="nav-link">Data Export</a>
        <a href="/electrichomehub/faq.html" class="nav-link">FAQ</a>
    </div>
    
    <script>
        // Try to redirect to React app with intended route
        const path = window.location.pathname.replace('/electrichomehub', '');
        if (path && path !== '/') {
            sessionStorage.setItem('intended-route', path);
            window.location.href = '/electrichomehub/';
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(clientDir, '404.html'), notFoundHtml);

console.log('✓ Generated static files for GitHub Pages');
console.log('✓ Created index.html with React app fallback');
console.log('✓ Created 404.html for routing');
console.log('✓ All files ready for GitHub Pages deployment');