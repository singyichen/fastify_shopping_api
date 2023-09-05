/**
 * @description env plugin
 */

const fastifyPlugin = require('fastify-plugin');
const fastifyEnv = require('@fastify/env');

const schema = {
  type: 'object',
};
const options = {
  schema: schema,
  dotenv: true, // will read .env in root folder
};
async function envConnector(fastify, opts, done) {
  fastify.register(fastifyEnv, options);

  done();
}

module.exports = fastifyPlugin(envConnector);
