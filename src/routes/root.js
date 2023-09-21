'use strict';
/**
 * @description root API 路由
 */
const errorLogger = require('../plugin/logger');
const enforcerCreator = require('../plugin/enforcer');
const { permissionDeniedInfo } = require('../utils/errorInfo');
async function router(fastify, opts) {
  fastify.get('/', {
    handler: async (request, reply) => {
      try {
        reply.send({ hello: 'world' });
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  fastify.get('/rbac', {
    casbin: {
      rest: {
        getSub: (request) => request.query.user_id,
        getObj: '/',
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        reply.send({ hello: 'world' });
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  fastify.get('/abac', {
    handler: async (request, reply) => {
      try {
        const enforcer = await enforcerCreator();
        const query = request.query;
        const p = await enforcer.enforce(query, '/data1', 'read');
        if (!p) {
          const age = query.Age;
          const message = `Age ${age} 無 /data1 read 權限`;
          reply.code(403).send({
            statusCode: permissionDeniedInfo.statusCode,
            code: permissionDeniedInfo.code,
            error: permissionDeniedInfo.error,
            message: message,
          });
        }
        reply.send({ hello: 'abac' });
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
}

module.exports = router;
