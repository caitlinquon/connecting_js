const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    connection: settings,
    searchPath: 'knex,public'
  },

  staging: {
    client: 'pg',
    connection: settings,
    searchPath: 'knex,public'
  },

  production: {
    client: 'pg',
    connection: settings,
    searchPath: 'knex,public'
  }

};
