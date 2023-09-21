/**
 * @description user API 路由
 */

const UserController = require('../../../../modules/admin/user/controller/userController');
const userSchema = require('../../../../modules/admin/user/validator/user');
const findOneUserSchema = require('../../../../modules/admin/user/validator/findOneUser');
const errorLogger = require('../../../../plugin/logger');
const deleteUserSchema = require('../../../../modules/admin/user/validator/deleteUser');
const findAllUserSchema = require('../../../../modules/admin/user/validator/findAllUser');
const userController = new UserController();
const {
  apiAdminUserUrl,
  apiAdminUserDeleteUrl,
  apiAdminUserFindAllUrl,
  apiAdminUserFindOneUrl,
} = require('../../../../utils/url');
/**
 * @description 人員路由( api/admin/user )
 */
async function router(fastify, opts) {
  /**
   * @description 新增單筆人員路由( POST api/admin/user )
   */
  fastify.post('/', {
    // user 資料格式驗證
    schema: {
      body: userSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminUserUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await userController.create(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆人員路由( DELETE api/admin/user/delete )
   */
  fastify.delete('/delete', {
    // deleteUser 資料格式驗證
    schema: {
      body: deleteUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminUserDeleteUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await userController.delete(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得多筆人員路由( GET api/admin/user/findAll )
   */
  fastify.get('/findAll', {
    // findAllUser 資料格式驗證
    schema: {
      query: findAllUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminUserFindAllUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await userController.findAll(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得單筆人員路由( GET api/admin/user/findOne )
   */
  fastify.get('/findOne', {
    // findOneUser 資料格式驗證
    schema: {
      query: findOneUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminUserFindOneUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await userController.findOne(request);
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
