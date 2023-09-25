/**
 * @description orderItem API 路由
 */

const OrderItemController = require('../../../../modules/admin/orderItem/controller/orderItemController');
const orderItemSchema = require('../../../../modules/admin/orderItem/validator/orderItem');
const findOneOrderItemSchema = require('../../../../modules/admin/orderItem/validator/findOneOrderItem');
const findAllOrderItemSchema = require('../../../../modules/admin/orderItem/validator/findAllOrderItem');
const errorLogger = require('../../../../plugin/logger');
const deleteOrderItemSchema = require('../../../../modules/admin/orderItem/validator/deleteOrderItem');
const orderItemController = new OrderItemController();
const {
  apiAdminOrderItemUrl,
  apiAdminOrderItemDeleteUrl,
  apiAdminOrderItemFindAllUrl,
  apiAdminOrderItemFindOneUrl,
} = require('../../../../utils/url');
/**
 * @description 訂單項目路由( api/admin/orderItem )
 */
async function router(fastify, opts) {
  /**
   * @description 新增單筆訂單項目路由( POST api/admin/orderItem )
   */
  fastify.post('/', {
    // orderItem 資料格式驗證
    schema: {
      body: orderItemSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminOrderItemUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderItemController.create(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆訂單項目路由( DELETE api/admin/orderItem/delete )
   */
  fastify.delete('/delete', {
    // deleteOrderItem 資料格式驗證
    schema: {
      body: deleteOrderItemSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminOrderItemDeleteUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderItemController.delete(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得多筆訂單項目路由( GET api/admin/orderItem/findAll )
   */
  fastify.get('/findAll', {
    // findAllOrderItem 資料格式驗證
    schema: {
      query: findAllOrderItemSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminOrderItemFindAllUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderItemController.findAll(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得單筆訂單項目路由( GET api/admin/orderItem/findOne )
   */
  fastify.get('/findOne', {
    // findOneOrderItem 資料格式驗證
    schema: {
      query: findOneOrderItemSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminOrderItemFindOneUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await orderItemController.findOne(request);
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
