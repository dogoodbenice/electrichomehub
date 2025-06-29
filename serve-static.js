#!/usr/bin/env node

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// Handle specific routes for HTML pages
const routes = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/developer.html': 'developer.html',
  '/tracking.html': 'tracking.html',
  '/documentation.html': 'documentation.html', 
  '/monitoring.html': 'monitoring.html',
  '/data-export.html': 'data-export.html',
  '/faq.html': 'faq.html'
};

Object.entries(routes).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', file));
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'client', '404.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Electric Home Hub serving on port ${port}`);
  console.log('Available pages:');
  Object.keys(routes).forEach(route => {
    console.log(`  http://localhost:${port}${route}`);
  });
});