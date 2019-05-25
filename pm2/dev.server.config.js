module.exports = {
  apps: [
    {
      name: 'dev.server',
      script: './build/server/server.js',
      env: {
        PORT: 3003,
        NODE_ENV: 'development',
      },
      error_file: './pm2/logs/dev.server.error.log',
      out_file: './pm2/logs/dev.server.console.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      watch: './build/server/server.js',
    },
  ],
};
