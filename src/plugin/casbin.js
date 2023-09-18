/**
 * @description casbin plugin
 */

const fastifyPlugin = require('fastify-plugin');
const fastifyCasbin = require('fastify-casbin');
const fastifyCasbinRest = require('fastify-casbin-rest');
const { permissionDeniedInfo } = require('../utils/errorInfo');
const errorLogger = require('../plugin/logger');
const createCasbinConfig = require('../../config/casbinConfig');

async function casbinConnector(fastify, opts, done) {
  const options = await createCasbinConfig();
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
