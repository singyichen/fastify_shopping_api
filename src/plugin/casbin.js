/**
 * @description casbin plugin
 */

const fastifyPlugin = require('fastify-plugin');
const fastifyCasbin = require('fastify-casbin');
const { join } = require('path');

async function casbinConnector(fastify, opts, done) {
  const options = {
    model: join(__dirname, '../casbin/rbac', 'rbac_model.conf'), // the model configuration
    adapter: join(__dirname, '../casbin/rbac', 'rbac_policy.csv'), // the adapter
  };
  fastify.register(fastifyCasbin, options);

  done();
}

module.exports = fastifyPlugin(casbinConnector);
