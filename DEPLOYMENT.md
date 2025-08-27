# Contact Manager Deployment Guide

## Overview
This is a full-stack contact manager application with a React frontend and Express.js backend.

## Project Structure
```
contact/
├── index.html          # Frontend (React app)
├── config.js           # Configuration file
├── server.js           # Backend (Express.js)
├── package.json        # Dependencies
└── contacts.db         # SQLite database
```

## Local Development

### 1. Start Backend Server
```bash
npm install
npm start
```
The backend will run on `http://localhost:3000`

### 2. Serve Frontend
```bash
python -m http.server 8000
```
The frontend will be available at `http://localhost:8000`

## Deployment Options

### Option 1: Deploy Both Frontend and Backend to Vercel

#### Backend Deployment
1. Create a new Vercel project
2. Upload your project files
3. Vercel will automatically detect it as a Node.js app
4. Your backend will be available at `https://your-project.vercel.app`

#### Frontend Deployment
1. Update `config.js` with your backend URL:
```javascript
const config = {
  local: {
    backendUrl: 'http://localhost:3000'
  },
  production: {
    backendUrl: 'https://your-project.vercel.app'  // Update this!
  }
};
```

2. Deploy the frontend to Vercel or any static hosting service

### Option 2: Backend on Vercel, Frontend on Netlify

#### Backend (Vercel)
- Deploy `server.js` to Vercel
- Get your backend URL: `https://your-backend.vercel.app`

#### Frontend (Netlify)
- Update `config.js` with your Vercel backend URL
- Deploy `index.html` and `config.js` to Netlify

### Option 3: Backend on Railway/Render, Frontend on Vercel

#### Backend (Railway/Render)
- Deploy `server.js` to Railway or Render
- Get your backend URL: `https://your-backend.railway.app`

#### Frontend (Vercel)
- Update `config.js` with your Railway/Render backend URL
- Deploy frontend files to Vercel

## Configuration

### Update config.js
```javascript
const config = {
  local: {
    backendUrl: 'http://localhost:3000'
  },
  production: {
    backendUrl: 'https://your-actual-backend-url.com'  // Update this!
  }
};
```

### Environment Variables (Optional)
You can also use environment variables in your backend:
```javascript
// In server.js
const port = process.env.PORT || 3000;
```

## Database Considerations

### SQLite (Current)
- Good for development and small apps
- File-based, no external dependencies
- Limited for production scaling

### For Production
Consider migrating to:
- **PostgreSQL** (Vercel, Railway, Render)
- **MongoDB** (MongoDB Atlas)
- **MySQL** (PlanetScale, Railway)

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your backend has CORS enabled (already configured)

2. **Backend Not Found**
   - Check the URL in `config.js`
   - Verify your backend is deployed and running

3. **Database Issues**
   - For SQLite: Ensure the database file is writable
   - For cloud databases: Check connection strings and credentials

### Debug Mode
The app includes debug information:
- Check browser console for connection logs
- Debug panel shows current status
- Error messages are displayed clearly

## Testing

### Test API Connection
Use the included `test.html` file to test your backend connection:
```bash
# Open test.html in browser
# Click "Test API Connection" button
# Check if backend responds correctly
```

## Security Notes

- The current setup is for development/demo purposes
- For production, consider:
  - Adding authentication
  - Input validation
  - Rate limiting
  - HTTPS enforcement
  - Environment variable management

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your backend URL in `config.js`
3. Ensure your backend is running and accessible
4. Check CORS settings if needed
