/* eslint-env node */

'use strict';

const path = require('path');
module.exports = function (env) {
  let isCI = Boolean(process.env.CI);
  return {
    fastbootAllowedKeys: [],
    enabled: !isCI, // disable for CI
    clientAllowedKeys: [
      'GOOGLE_MAPS_API_KEY',
      'BACKEND_API',
      'GOOGLE_MAPS_API',
    ],
    failOnMissingKey: true,
    path: path.join(path.dirname(__dirname), `.env.${env}`),
  };
};
