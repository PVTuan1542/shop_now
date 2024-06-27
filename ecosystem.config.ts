// import { StartOptions } from 'pm2';

const apps = [
  {
    name: 'my-app',
    script: './src/app.ts',
    watch: true,
    interpreter: 'node',
    interpreter_args: '--require ts-node/register',
    env: {
      PORT: 3000,
    },
  },
];

export default {
  apps,
};
