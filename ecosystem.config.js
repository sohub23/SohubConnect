export default {
  apps: [{
    name: 'sohub-connect',
    script: 'npm',
    args: 'run dev',
    cwd: '/var/www/html/websites/Sohub_Connect',
    env: {
      PORT: 9931,
      NODE_ENV: 'development'
    },
    watch: false,
    autorestart: true,
    max_memory_restart: '1G'
  }]
};
