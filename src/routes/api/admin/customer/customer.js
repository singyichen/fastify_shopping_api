/**
 * @description customer API 路由
 */

const CustomerController = require('../../../../modules/admin/customer/controller/customerController');
const customerSchema = require('../../../../modules/admin/customer/validator/customer');
const findOneCustomerSchema = require('../../../../modules/admin/customer/validator/findOneCustomer');
const findAllCustomerSchema = require('../../../../modules/admin/customer/validator/findAllCustomer');
const errorLogger = require('../../../../plugin/logger');
const deleteCustomerSchema = require('../../../../modules/admin/customer/validator/deleteCustomer');
const customerController = new CustomerController();
const {
  apiAdminCustomerUrl,
  apiAdminCustomerDeleteUrl,
  apiAdminCustomerFindAllUrl,
  apiAdminCustomerFindOneUrl,
} = require('../../../../utils/url');
/**
 * @description 客戶路由( api/admin/customer )
 */
async function router(fastify, opts) {
  /**
   * @description 新增單筆客戶路由( POST api/admin/customer )
   */
  fastify.post('/', {
    // customer 資料格式驗證
    schema: {
      body: customerSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminCustomerUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await customerController.create(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆客戶路由( DELETE api/admin/customer/delete )
   */
  fastify.delete('/delete', {
    // deleteCustomer 資料格式驗證
    schema: {
      body: deleteCustomerSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminCustomerDeleteUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await customerController.delete(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得多筆客戶路由( GET api/admin/customer/findAll )
   */
  fastify.get('/findAll', {
    // findAllCustomer 資料格式驗證
    schema: {
      query: findAllCustomerSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminCustomerFindAllUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await customerController.findAll(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得單筆客戶路由( GET api/admin/customer/findOne )
   */
  fastify.get('/findOne', {
    // findOneCustomer 資料格式驗證
    schema: {
      query: findOneCustomerSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminCustomerFindOneUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await customerController.findOne(request);
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
