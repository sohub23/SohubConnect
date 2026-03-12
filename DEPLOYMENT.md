# Connect.sohub.com.bd Deployment Summary

## ✅ Deployment Complete

**Domain**: https://connect.sohub.com.bd  
**Date**: March 11, 2026  
**Status**: Live and Running

---

## Deployment Details

### Repository
- **Source**: https://github.com/sohub23/SohubConnect.git
- **Location**: `/var/www/html/websites/connect.sohub.com.bd`
- **Build Output**: `/var/www/html/websites/connect.sohub.com.bd/build`

### Technology Stack
- **Framework**: React Router v7 (SSR)
- **Language**: TypeScript/JavaScript
- **UI Library**: Chakra UI + Radix UI + Tailwind CSS
- **Build Tool**: Vite
- **Runtime**: Node.js (PM2)
- **Port**: 9931

### Architecture
- **Type**: Server-Side Rendered (SSR) React application
- **Server**: Node.js Express server via React Router
- **Proxy**: Apache reverse proxy to Node.js app
- **Process Manager**: PM2

### PM2 Configuration
**Config File**: `ecosystem.config.cjs`
```javascript
{
  name: 'sohub-connect',
  script: 'npm run start',
  port: 9931,
  cwd: '/var/www/html/websites/connect.sohub.com.bd'
}
```

### Apache Configuration

**HTTP Config**: `/etc/apache2/sites-available/connect.sohub.com.bd.conf`
- Proxies to `http://127.0.0.1:9931`
- Redirects HTTP to HTTPS

**HTTPS Config**: `/etc/apache2/sites-available/connect.sohub.com.bd-le-ssl.conf`
- SSL Certificate: Let's Encrypt
- Expiry: June 9, 2026 (90 days)
- Proxies to Node.js app on port 9931

### SSL Certificate
```
Certificate Name: connect.sohub.com.bd
Domain: connect.sohub.com.bd
Expiry Date: 2026-06-09 (VALID: 90 days)
Certificate Path: /etc/letsencrypt/live/connect.sohub.com.bd/fullchain.pem
Private Key Path: /etc/letsencrypt/live/connect.sohub.com.bd/privkey.pem
```

---

## Build Process

### Installation
```bash
cd /var/www/html/websites/connect.sohub.com.bd
npm install
```

### Build Command
```bash
npm run build
```

### Start Server
```bash
npm run start
# or via PM2
pm2 start ecosystem.config.cjs
```

---

## PM2 Management

### View Status
```bash
pm2 status sohub-connect
```

### View Logs
```bash
pm2 logs sohub-connect
```

### Restart
```bash
pm2 restart sohub-connect
```

### Stop
```bash
pm2 stop sohub-connect
```

### Start
```bash
pm2 start sohub-connect
```

---

## Maintenance

### Update from GitHub
```bash
cd /var/www/html/websites/connect.sohub.com.bd
git pull origin main
npm install
npm run build
pm2 restart sohub-connect
```

### Check Apache Logs
```bash
# Error logs
tail -f /var/log/apache2/connect-sohub-error.log

# Access logs
tail -f /var/log/apache2/connect-sohub-access.log
```

### Check PM2 Logs
```bash
pm2 logs sohub-connect --lines 100
```

### SSL Certificate Renewal
Automatic renewal via certbot (configured)
```bash
# Manual renewal if needed
certbot renew --cert-name connect.sohub.com.bd
```

---

## Features Configured

✅ React Router SSR (Server-Side Rendering)  
✅ HTTPS with valid SSL certificate  
✅ HTTP to HTTPS redirect  
✅ Apache reverse proxy to Node.js  
✅ PM2 process management  
✅ Auto-restart on failure  
✅ Production build optimized  

---

## URLs

- **Production**: https://connect.sohub.com.bd
- **HTTP** (redirects to HTTPS): http://connect.sohub.com.bd
- **Direct Node.js** (internal): http://localhost:9931

---

## Notes

- This is an SSR application (not static)
- Requires Node.js server running via PM2
- Apache acts as reverse proxy
- All requests are proxied to Node.js app on port 9931
- PM2 ensures the app stays running and auto-restarts on crashes

---

## Status: ✅ PRODUCTION READY

The website is fully deployed, SSL configured, PM2 running, and accessible via HTTPS!
