/**
 * @description casbin plugin
 */

const fastifyPlugin = require('fastify-plugin');
const fastifyCasbin = require('fastify-casbin');
const fastifyCasbinRest = require('fastify-casbin-rest');
const { join } = require('path');
const { PrismaAdapter } = require('casbin-prisma-adapter');
const prismaClientService = require('../ormService/prismaClientService');
const { permissionDeniedInfo } = require('../utils/errorInfo');
const errorLogger = require('../plugin/logger');
async function casbinConnector(fastify, opts, done) {
  const model = join(__dirname, '../casbin/rbac', 'rbac_model.conf');
  const adapter = await PrismaAdapter.newAdapter(prismaClientService.prisma);
  const options = {
    model: model, // the model configuration
    adapter: adapter, // the adapter
  };
  fastify.register(fastifyCasbin, options);
  fastify.register(fastifyCasbinRest, {
    onDeny: (reply, { sub, obj, act }) => {
      const message = `${sub} 無 ${act} ${obj} 權限`;
      reply.code(403).send({
        statusCode: permissionDeniedInfo.statusCode,
        code: permissionDeniedInfo.code,
        error: permissionDeniedInfo.error,
        message: message,
      });
      errorLogger.error(message);
    },
  });
  done();
}

module.exports = fastifyPlugin(casbinConnector);
