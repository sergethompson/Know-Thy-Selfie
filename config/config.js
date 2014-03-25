var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'know-thy-selfie'
    },
    port: 3000,
    db: 'mongodb://localhost/know-thy-selfie-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'know-thy-selfie'
    },
    port: 3000,
    db: 'mongodb://localhost/know-thy-selfie-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'know-thy-selfie'
    },
    port: 3000,
    db: 'mongodb://localhost/know-thy-selfie-production'
  }
};

module.exports = config[env];
