#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create docs directory for GitHub Pages deployment
const docsDir = path.join(__dirname, 'docs');
const clientDir = path.join(__dirname, 'client');

// Clean and create docs directory
if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true });
}
fs.mkdirSync(docsDir, { recursive: true });

// Copy all HTML files
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

console.log('Copying HTML files to docs directory...');
for (const file of htmlFiles) {
    const srcPath = path.join(clientDir, file);
    const destPath = path.join(docsDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${file}`);
    }
}

// Copy static assets
const staticFiles = [
    'styles.css',
    'scripts.js',
    'developer.js',
    'tracking.js',
    'documentation.js',
    'favicon.svg'
];

console.log('\nCopying static assets...');
for (const file of staticFiles) {
    const srcPath = path.join(clientDir, file);
    const destPath = path.join(docsDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${file}`);
    }
}

console.log('\n✓ All files copied to docs/ directory');
console.log('✓ Ready for GitHub Pages deployment from /docs folder');