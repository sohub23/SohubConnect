module.exports = {
  apps: [
    {
      name: 'sohub-connect',
      script: 'npm',
      args: 'run start -- --host 0.0.0.0 --port 9931',
      cwd: process.cwd(),
      env: {
        PORT: 9931,
        NODE_ENV: 'production'
      },
      watch: false,
      autorestart: true,
      max_memory_restart: '1G'
    }
  ]
};
