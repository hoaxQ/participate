/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      MODEL_FACTORY_INJECTIONS: true
    },

    APP: {
      API_HOST: '/'
      // API_HOST_PROXY: 'http://api.pixelhandler.com/',
    },

    contentSecurityPolicy: {
      'script-src':  "'self' 'unsafe-eval'",
      'style-src':   "'self' 'unsafe-inline' *",
      'font-src': "'self' data: fonts.gstatic.com",
    },

    torii: {
      providers: {
        'facebook-oauth2': {
          clientId: '1583083701926004'
        }
      }
    },

    'simple-auth': {
      authenticationRoute: 'login',
      authorizer: 'simple-auth-authorizer:oauth2-bearer',
      routeAfterAuthentication: 'internal.dashboard',
      routeIfAlreadyAuthenticated: 'internal.dashboard'
    },

    'simple-auth-oauth2': {
      serverTokenEndpoint: '/tokens'
    }
  };

  if (environment === 'development') {
    ENV.APP.API_HOST = 'http://localhost:4200/'
    ENV.contentSecurityPolicy['default-src'] = "'self'";
    ENV.contentSecurityPolicy['connect-src'] = "'self' http://localhost:4200 http://localhost:3000";

    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  if (environment === 'test') {
    ENV.contentSecurityPolicy['default-src'] = "'self'";
    ENV.contentSecurityPolicy['style-src'] = "'self' data:";
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['simple-auth'].store = 'simple-auth-session-store:ephemeral';
  }

  if (environment === 'production') {

  }

  return ENV;
};
