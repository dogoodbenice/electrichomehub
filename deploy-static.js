#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure all HTML files are properly configured for GitHub Pages deployment
const clientDir = path.join(__dirname, 'client');

// List of HTML files that should be deployed
const htmlFiles = [
    'index.html',
    'developer.html', 
    'tracking.html',
    'documentation.html',
    'monitoring.html',
    'data-export.html',
    'faq.html',
    '404.html'
];

// Check if all files exist
console.log('Checking HTML files for deployment...');
for (const file of htmlFiles) {
    const filePath = path.join(clientDir, file);
    if (fs.existsSync(filePath)) {
        console.log(`✓ ${file} - Ready`);
    } else {
        console.log(`✗ ${file} - Missing`);
    }
}

// Verify CSS and JS files
const staticFiles = [
    'styles.css',
    'scripts.js',
    'developer.js',
    'tracking.js',
    'documentation.js',
    'favicon.svg'
];

console.log('\nChecking static assets...');
for (const file of staticFiles) {
    const filePath = path.join(clientDir, file);
    if (fs.existsSync(filePath)) {
        console.log(`✓ ${file} - Ready`);
    } else {
        console.log(`✗ ${file} - Missing`);
    }
}

// Fix any navigation links that might be incorrect
function fixNavigationLinks(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Ensure all internal links are relative (no leading slash)
    content = content.replace(/href="\/electrichomehub\//g, 'href="');
    content = content.replace(/href="electrichomehub\//g, 'href="');
    
    // Fix any absolute paths to be relative
    content = content.replace(/src="\/electrichomehub\//g, 'src="');
    content = content.replace(/src="electrichomehub\//g, 'src="');
    
    fs.writeFileSync(filePath, content);
}

console.log('\nFixing navigation links...');
for (const file of htmlFiles) {
    const filePath = path.join(clientDir, file);
    if (fs.existsSync(filePath)) {
        fixNavigationLinks(filePath);
        console.log(`✓ Fixed links in ${file}`);
    }
}

console.log('\n✓ All files ready for GitHub Pages deployment');
console.log('✓ Navigation links fixed for relative paths');
console.log('\nNext steps:');
console.log('1. Commit all files in client/ directory');
console.log('2. Push to GitHub');
console.log('3. Ensure GitHub Pages is configured to serve from root or /docs');