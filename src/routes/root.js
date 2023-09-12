'use strict';
/**
 * @description root API 路由
 */
const errorLogger = require('../plugin/logger');
async function router(fastify, opts) {
  fastify.get('/', async function (request, reply) {
    try {
      const isAllowed = await fastify.casbin.enforce('11548', 'data1', 'read');
      if (!isAllowed) {
        reply.send(new Error('Forbidden'));
      }
      reply.send({ hello: 'world' });
    } catch (error) {
      errorLogger.error(error);
      reply.send({ status: -1, message: error.message });
      console.log(error);
    }
  });
}

module.exports = router;
