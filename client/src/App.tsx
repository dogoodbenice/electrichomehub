import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Redirect to static HTML pages if not on root
    const path = window.location.pathname;
    
    // Check if we're trying to access a specific page
    const staticPages = {
      '/developer': '/developer.html',
      '/tracking': '/tracking.html',
      '/documentation': '/documentation.html',
      '/monitoring': '/monitoring.html',
      '/data-export': '/data-export.html',
      '/faq': '/faq.html'
    };
    
    if (staticPages[path]) {
      window.location.href = staticPages[path];
      return;
    }
    
    // Remove React app root after redirect attempt
    const root = document.getElementById('root');
    if (root && path !== '/') {
      root.style.display = 'none';
    }
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          width: '3rem',
          height: '3rem', 
          backgroundColor: '#ff3333',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
          </svg>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Electric Home Hub
        </h1>
        <p style={{ color: '#ccc', marginBottom: '2rem' }}>
          Navigate using the links in the header menu
        </p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '1rem', 
        justifyContent: 'center' 
      }}>
        <a href="/developer.html" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #ff3333',
          borderRadius: '6px',
          color: '#ff3333',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>Developer API</a>
        <a href="/tracking.html" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '6px',
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>Device Tracking</a>
        <a href="/documentation.html" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '6px',
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>Documentation</a>
        <a href="/monitoring.html" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '6px',
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>Issue Monitoring</a>
        <a href="/data-export.html" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '6px',
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>Data Export</a>
        <a href="/faq.html" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '6px',
          color: '#fff',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}>FAQ</a>
      </div>
    </div>
  );
}

export default App;
