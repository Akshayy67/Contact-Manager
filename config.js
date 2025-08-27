// Configuration file for Contact Manager
// Update these URLs based on your deployment

const config = {
  // Local development
  local: {
    backendUrl: 'http://localhost:3000'
  },
  
  // Development/Staging environment
  development: {
    backendUrl: 'https://contact-manager-r6f8jinhf-akshays-projects-06aa4db7.vercel.app'
  },
  
  // Production environment
  production: {
    backendUrl: 'https://contact-manager-r6f8jinhf-akshays-projects-06aa4db7.vercel.app'
  }
};

// Auto-detect environment
const getConfig = () => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return config.local;
  } else if (hostname.includes('vercel.app') || hostname.includes('netlify.app')) {
    return config.production;
  } else {
    return config.development;
  }
};

// Export for use in HTML
window.contactManagerConfig = getConfig();
