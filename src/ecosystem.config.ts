// import { StartOptions } from 'pm2';

const apps = [
  {
    name: 'my-app',
    script: './dist/app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      PORT: 3000,
    },
  },
];

export default {
  apps,
};
