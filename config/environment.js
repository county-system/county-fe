'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'county-fe',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },
    'ember-google-maps': {
      language: 'en',
      key: process.env.GOOGLE_MAPS_API_KEY, // Using .env files in this example
      libraries: ['geometry', 'places'], // Optional libraries
    },

    backend: {
      BACKEND_API: process.env.BACKEND_API,
      BACKEND_API_VERSION: process.env.BACKEND_API,
    },

    flashMessageDefaults: {
      extendedTimeout: 500,
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      API_HOST: process.env.BACKEND_API,
    },
    'ember-simple-auth': {
      authorizer: 'authorizer:token',
      authenticationRoute: 'login',
    },
    'ember-simple-auth-token': {
      refreshTokenPropertyName: 'refresh',
      tokenPropertyName: 'token',
      serverTokenEndpoint: process.env.BACKEND_API + '/api/v2/auth/login',
      serverTokenRefreshEndpoint: process.env.BACKEND_API + '/api/v2/refresh',
      refreshAccessTokens: true,
      refreshLeeway: 300, // refresh 5 minutes (300 seconds) before expiration
    },
  };
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
