/**
 * @description order API 路由
 */

const OrderController = require('../../../../modules/admin/order/controller/orderController');
const orderSchema = require('../../../../modules/admin/order/validator/order');
const findOneOrderSchema = require('../../../../modules/admin/order/validator/findOneOrder');
const findAllOrderSchema = require('../../../../modules/admin/order/validator/findAllOrder');
const errorLogger = require('../../../../plugin/logger');
const deleteOrderSchema = require('../../../../modules/admin/order/validator/deleteOrder');
const orderController = new OrderController();
const {
  apiAdminOrderUrl,
  apiAdminOrderDeleteUrl,
  apiAdminOrderFindAllUrl,
  apiAdminOrderFindOneUrl,
} = require('../../../../utils/url');
/**
 * @description 訂單項目路由( api/admin/order )
 */
async function router(fastify, opts) {
  /**
   * @description 新增單筆訂單路由( POST api/admin/order )
   */
  fastify.post('/', {
    // order 資料格式驗證
    schema: {
      body: orderSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminOrderUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderController.create(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆訂單路由( DELETE api/admin/order/delete )
   */
  fastify.delete('/delete', {
    // deleteOrder 資料格式驗證
    schema: {
      body: deleteOrderSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminOrderDeleteUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderController.delete(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得多筆訂單路由( GET api/admin/order/findAll )
   */
  fastify.get('/findAll', {
    // findAllOrder 資料格式驗證
    schema: {
      query: findAllOrderSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminOrderFindAllUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderController.findAll(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得單筆訂單路由( GET api/admin/order/findOne )
   */
  fastify.get('/findOne', {
    // findOneOrder 資料格式驗證
    schema: {
      query: findOneOrderSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminOrderFindOneUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderController.findOne(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
}

module.exports = router;
