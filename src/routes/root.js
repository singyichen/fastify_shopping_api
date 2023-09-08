'use strict';
/**
 * @description root API 路由
 */
const errorLogger = require('../plugin/logger');
async function router(fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      if (!(await fastify.casbin.enforce('alice', 'data1', 'write'))) {
        reply.send(new Error('Forbidden'));
      }
      console.log(request);
      reply.send({ hello: 'world' });
    } catch (error) {
      errorLogger.error(error);
      reply.send({ status: -1, message: error.message });
      console.log(error);
    }
  });
}

module.exports = router;
