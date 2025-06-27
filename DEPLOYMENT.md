# Deployment Guide

## GitHub Pages Deployment

This project is ready for GitHub Pages deployment with the included GitHub Actions workflow.

### Quick Setup

1. **Push to GitHub**: Commit your code to a GitHub repository
2. **Enable Pages**: Go to Settings > Pages > Source: "GitHub Actions"  
3. **Automatic Deploy**: Pushes to `main` branch trigger deployment

### Manual Git Setup

Since git operations require expertise, here are the commands to run:

```bash
# Initialize and add files
git add .
git commit -m "Initial commit: Electric Home Hub with developer API focus"

# Connect to GitHub repository
git remote add origin https://github.com/your-username/electric-home-hub.git
git branch -M main
git push -u origin main
```

### Important Notes

- **Frontend Only**: GitHub Pages serves static files, so only the React frontend will be deployed
- **API Limitation**: The Express backend won't run on GitHub Pages
- **Full-Stack Alternative**: For complete functionality, deploy to Vercel, Netlify, or Replit

### Repository Name

If your GitHub repository is named differently than "electric-home-hub", update the `base` path in the deployment workflow.

### Build Output

The workflow builds to `./dist` and serves the React application as a static site.

## Alternative Deployment Options

### Vercel (Recommended for Full-Stack)
- Supports both frontend and backend
- Zero-config deployment
- Automatic deployments from GitHub

### Netlify
- Static site hosting
- Form handling capabilities
- Branch deployments

### Replit (Current Environment)
- Full development environment
- Integrated database
- Live collaboration features