module.exports = {
  apps: [{
    name: 'client',
    script: 'build/main.js',
    env: {
      COMMON_VARIABLE: 'true'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    out_file: './log/pm2-out.log',
    error_file: '/log/pm2-error.log'
  }],
  deploy: {
    production: {
      user: 'root',
      host: 'blog',
      ref: 'origin/master',
      repo: 'git@github.com:Jhaidi/blog-front.git',
      path: '/usr/local/blog-front',
      'post-deploy': 'git pull && npm run build &&pm2 startOrReload ecosystem.config.js --env production'
    }
  }
}
