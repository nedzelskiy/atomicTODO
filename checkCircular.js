/* eslint-disable no-console */
const madge = require('madge');

madge('./client/client.tsx', {}).then(res => console.log(res.circular(), 'client'));
madge('./server/server.ts', {}).then(res => console.log(res.circular(), 'server'));
madge('./config.js', {}).then(res => console.log(res.circular(), 'config'));
madge('./build_configs/webpack.client.config.js', {}).then(res => console.log(res.circular(), 'webpack client'));
madge('./build_configs/webpack.server.config.js', {}).then(res => console.log(res.circular(), 'webpack server'));
