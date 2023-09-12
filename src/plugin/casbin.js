/**
 * @description casbin plugin
 */

const fastifyPlugin = require('fastify-plugin');
const fastifyCasbin = require('fastify-casbin');
const { join } = require('path');
const { PrismaAdapter } = require('casbin-prisma-adapter');
const prismaClientService = require('../ormService/prismaClientService');

async function casbinConnector(fastify, opts, done) {
  const model = join(__dirname, '../casbin/rbac', 'rbac_model.conf');
  const adapter = await PrismaAdapter.newAdapter(prismaClientService.prisma);
  const options = {
    model: model, // the model configuration
    adapter: adapter, // the adapter
  };
  fastify.register(fastifyCasbin, options);

  done();
}

module.exports = fastifyPlugin(casbinConnector);
