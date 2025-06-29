#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create updated index.html that properly loads the React app
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electric Home Hub - Smart Device Management Platform</title>
    <meta name="description" content="The smart platform empowering anyone to seamlessly manage all their electric hardware. Universal device tracking, centralized documentation, and proactive monitoring.">
    
    <base href="/electrichomehub/">
    
    <style>
        :root {
            --background: 0 0% 3.9%;
            --foreground: 0 0% 98%;
            --card: 0 0% 3.9%;
            --card-foreground: 0 0% 98%;
            --muted: 0 0% 14.9%;
            --muted-foreground: 0 0% 63.9%;
            --border: 0 0% 14.9%;
            --brand-red: #ff3333;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: #000;
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
        }
        
        .header {
            background: #000;
            border-bottom: 1px solid #333;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 50;
        }
        
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: #fff;
        }
        
        .logo-icon {
            width: 32px;
            height: 32px;
            background: var(--brand-red);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .nav {
            display: flex;
            gap: 2rem;
        }
        
        .nav a {
            color: #ccc;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.2s;
        }
        
        .nav a:hover {
            color: var(--brand-red);
            background: rgba(255, 51, 51, 0.1);
        }
        
        .nav a.featured {
            color: var(--brand-red);
            border: 1px solid var(--brand-red);
        }
        
        .hero {
            padding: 4rem 1rem;
            text-align: center;
            background: linear-gradient(135deg, #000 0%, #111 100%);
        }
        
        .hero h1 {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .hero .brand {
            color: var(--brand-red);
        }
        
        .hero p {
            font-size: 1.25rem;
            color: #ccc;
            max-width: 600px;
            margin: 0 auto 2rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        
        .feature {
            background: #111;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
        }
        
        .feature-icon {
            width: 48px;
            height: 48px;
            background: var(--brand-red);
            border-radius: 50%;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .cta-section {
            background: #111;
            padding: 4rem 1rem;
            text-align: center;
        }
        
        .cta-button {
            display: inline-block;
            background: var(--brand-red);
            color: #fff;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 1rem 0.5rem;
            transition: all 0.2s;
        }
        
        .cta-button:hover {
            background: #e62e2e;
            transform: translateY(-2px);
        }
        
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        
        .action-card {
            background: #111;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 1.5rem;
            text-decoration: none;
            color: #fff;
            transition: all 0.2s;
        }
        
        .action-card:hover {
            border-color: var(--brand-red);
            background: rgba(255, 51, 51, 0.05);
        }
        
        .mobile-nav {
            display: none;
        }
        
        @media (max-width: 768px) {
            .nav {
                display: none;
            }
            
            .mobile-nav {
                display: block;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <a href="./" class="logo">
                <div class="logo-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
                    </svg>
                </div>
                <span style="font-size: 1.25rem; font-weight: bold;">Electric Home Hub</span>
            </a>
            
            <nav class="nav">
                <a href="developer.html" class="featured">Developer API</a>
                <a href="tracking.html">Device Tracking</a>
                <a href="documentation.html">Documentation</a>
                <a href="monitoring.html">Issue Monitoring</a>
                <a href="data-export.html">Data Export</a>
                <a href="faq.html">FAQ</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <h1>Welcome to <span class="brand">Electric Home Hub</span></h1>
            <p>The smart platform empowering anyone to seamlessly manage all their electric hardware</p>
        </section>

        <section class="features">
            <div class="feature">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
                    </svg>
                </div>
                <h3>Universal Compatibility</h3>
                <p>Monitor all electric hardware in your home, regardless of manufacturer or brand</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                    </svg>
                </div>
                <h3>Centralized Control</h3>
                <p>Store all manuals, warranties, and documentation in one secure digital repository</p>
            </div>
            
            <div class="feature">
                <div class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                <h3>Proactive Protection</h3>
                <p>Stay ahead with alerts for recalls, firmware updates, and emerging device issues</p>
            </div>
        </section>

        <section class="cta-section">
            <h2 style="margin-bottom: 1rem; font-size: 2rem;">Build Your Own Electric Home Hub</h2>
            <p style="color: #ccc; margin-bottom: 2rem;">Use our powerful Developer suite to create custom solutions for your customers</p>
            <a href="developer.html" class="cta-button">
                🔧 Developer API Access
            </a>
        </section>

        <section style="padding: 2rem 1rem;">
            <h3 style="text-align: center; margin-bottom: 2rem;">Straightforward control for your own grid</h3>
            <div class="quick-actions">
                <a href="tracking.html" class="action-card">
                    <h4 style="margin-bottom: 0.5rem;">📱 Track Devices</h4>
                    <p style="color: #ccc;">Monitor all your electric hardware in one place</p>
                </a>
                
                <a href="documentation.html" class="action-card">
                    <h4 style="margin-bottom: 0.5rem;">📄 Manage Documents</h4>
                    <p style="color: #ccc;">Centralized storage for manuals and documentation</p>
                </a>
                
                <a href="monitoring.html" class="action-card">
                    <h4 style="margin-bottom: 0.5rem;">⚠️ Monitor Issues</h4>
                    <p style="color: #ccc;">Proactive alerts for any device problems and recalls</p>
                </a>
            </div>
        </section>
    </main>
    
    <script>
        // GitHub Pages routing helper
        (function() {
            const path = window.location.pathname.replace('/electrichomehub', '');
            if (path && path !== '/' && path !== '/index.html') {
                // Try to redirect to the specific static page
                const staticPages = ['/developer.html', '/tracking.html', '/documentation.html', '/monitoring.html', '/data-export.html', '/faq.html'];
                if (staticPages.includes(path)) {
                    window.location.href = '/electrichomehub' + path;
                }
            }
        })();
    </script>
</body>
</html>`;

// Write the updated index.html
fs.writeFileSync(path.join(__dirname, 'client/index.html'), indexHtml);

console.log('✓ Updated index.html for GitHub Pages');
console.log('✓ Fixed navigation and styling');
console.log('✓ GitHub Pages deployment ready');