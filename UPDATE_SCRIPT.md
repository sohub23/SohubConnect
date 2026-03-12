# Update SOHUB Connect Landing - Deployment Script

## Command
```bash
update-connect-landing
```

## What It Does
Automatically pulls the latest code from GitHub and deploys to production.

### Steps Performed:
1. ✅ Navigates to `/var/www/html/websites/connect.sohub.com.bd`
2. ✅ Fetches latest changes from GitHub
3. ✅ Resets to `origin/main` (hard reset)
4. ✅ Installs npm dependencies
5. ✅ Builds production bundle (`npm run build`)
6. ✅ Restarts PM2 process (`sohub-connect`)
7. ✅ Displays success message

## Usage

### Simple Update
```bash
update-connect-landing
```

### With sudo (if needed)
```bash
sudo update-connect-landing
```

## Script Location
`/usr/local/bin/update-connect-landing`

## GitHub Repository
- **URL**: https://github.com/sohub23/SohubConnect.git
- **Branch**: main
- **Authentication**: GitHub Personal Access Token (configured)

## Output
```
Fetching origin
HEAD is now at [commit-hash] [commit-message]
[npm install output]
[build output]
[PM2 restart output]
✅ SOHUB Connect Landing page updated successfully!
```

## Notes
- Script uses GitHub access token for authentication
- Performs hard reset (discards local changes)
- Automatically handles dependencies
- Restarts Node.js server via PM2
- Safe to run multiple times
- SSR application (requires PM2 restart)

## Troubleshooting

### If build fails
```bash
cd /var/www/html/websites/connect.sohub.com.bd
npm install
npm run build
pm2 restart sohub-connect
```

### Check PM2 status
```bash
pm2 status sohub-connect
pm2 logs sohub-connect
```

### Check Apache logs
```bash
tail -f /var/log/apache2/connect-sohub-error.log
```

## Related Commands
- `update-sohub-landing` - Updates SOHUB main landing page
- `update-emp-landing` - Updates EMP landing page
- `pm2 restart sohub-connect` - Restart app manually

## Last Updated
March 11, 2026
