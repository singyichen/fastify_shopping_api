/**
 * @description product API 路由
 */

const ProductController = require('../../../../modules/admin/product/controller/productController');
const productSchema = require('../../../../modules/admin/product/validator/product');
const findOneProductSchema = require('../../../../modules/admin/product/validator/findOneProduct');
const findAllProductSchema = require('../../../../modules/admin/product/validator/findAllProduct');
const errorLogger = require('../../../../plugin/logger');
const deleteProductSchema = require('../../../../modules/admin/product/validator/deleteProduct');
const productController = new ProductController();
const {
  apiAdminProductUrl,
  apiAdminProductDeleteUrl,
  apiAdminProductFindAllUrl,
  apiAdminProductFindOneUrl,
} = require('../../../../utils/url');
/**
 * @description 商品路由( api/admin/product )
 */
async function router(fastify, opts) {
  /**
   * @description 新增單筆商品路由( POST api/admin/product )
   */
  fastify.post('/', {
    // product 資料格式驗證
    schema: {
      body: productSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminProductUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await productController.create(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆商品路由( DELETE api/admin/product/delete )
   */
  fastify.delete('/delete', {
    // deleteProduct 資料格式驗證
    schema: {
      body: deleteProductSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminProductDeleteUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await productController.delete(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得多筆商品路由( GET api/admin/product/findAll )
   */
  fastify.get('/findAll', {
    // findAllProduct 資料格式驗證
    schema: {
      query: findAllProductSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminProductFindAllUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await productController.findAll(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得單筆商品路由( GET api/admin/product/findOne )
   */
  fastify.get('/findOne', {
    // findOneProduct 資料格式驗證
    schema: {
      query: findOneProductSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminProductFindOneUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await productController.findOne(request);
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
