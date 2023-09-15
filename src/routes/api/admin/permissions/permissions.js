/**
 * @description permissions API 路由
 */

const PermissionsController = require('../../../../modules/admin/permissions/controller/permissionsController');
const errorLogger = require('../../../../plugin/logger');
const permissionsController = new PermissionsController();
const addRoleForUserSchema = require('../../../../modules/admin/permissions/validator/addRoleForUser');
const deleteRoleForUserSchema = require('../../../../modules/admin/permissions/validator/deleteRoleForUser');
const getUsersForRoleSchema = require('../../../../modules/admin/permissions/validator/getUsersForRole');
const addPermissionForUserSchema = require('../../../../modules/admin/permissions/validator/addPermissionForUser');
const getPermissionsForUserSchema = require('../../../../modules/admin/permissions/validator/getPermissionsForUser');
const deletePermissionForUserSchema = require('../../../../modules/admin/permissions/validator/deletePermissionForUser');
const {
  apiAdminPermissionsGetUsersForRoleUrl,
  apiAdminPermissionsAddRoleForUserUrl,
  apiAdminPermissionsDeleteRoleForUserUrl,
  apiAdminPermissionsGetPermissionsForUserUrl,
  apiAdminPermissionsAddPermissionForUserUrl,
  apiAdminPermissionsDeletePermissionForUserUrl,
} = require('../../../../utils/url');
/**
 * @description 權限路由( api/admin/permissions )
 */
async function router(fastify, opts) {
  /**
   * @description 取得多筆角色權限路由( GET api/admin/permissions/getPermissionsForUser )
   */
  fastify.get('/getPermissionsForUser', {
    // getPermissionsForUser 資料格式驗證
    schema: {
      query: getPermissionsForUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminPermissionsGetUsersForRoleUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await permissionsController.getPermissionsForUser(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 新增單筆角色權限路由( GET api/admin/permissions/addPermissionForUser )
   */
  fastify.post('/addPermissionForUser', {
    // addPermissionForUser 資料格式驗證
    schema: {
      body: addPermissionForUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminPermissionsAddRoleForUserUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await permissionsController.addPermissionForUser(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆角色權限路由( DELETE api/admin/permissions/deletePermissionForUser )
   */
  fastify.delete('/deletePermissionForUser', {
    // deletePermissionForUser 資料格式驗證
    schema: {
      body: deletePermissionForUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminPermissionsDeleteRoleForUserUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res =
          await permissionsController.deletePermissionForUser(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 取得多筆人員角色路由( GET api/admin/permissions/getUsersForRole )
   */
  fastify.get('/getUsersForRole', {
    // getUsersForRole 資料格式驗證
    schema: {
      query: getUsersForRoleSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.query.executor_id,
        getObj: apiAdminPermissionsGetPermissionsForUserUrl,
        getAct: 'get',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await permissionsController.getUsersForRole(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 新增單筆人員角色路由( POST api/admin/permissions/addRoleForUser )
   */
  fastify.post('/addRoleForUser', {
    // addRoleForUser 資料格式驗證
    schema: {
      body: addRoleForUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminPermissionsAddPermissionForUserUrl,
        getAct: 'post',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await permissionsController.addRoleForUser(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });
  /**
   * @description 刪除單筆人員角色路由( DELETE api/admin/permissions/deleteRoleForUser )
   */
  fastify.delete('/deleteRoleForUser', {
    // deleteRoleForUser 資料格式驗證
    schema: {
      body: deleteRoleForUserSchema,
    },
    casbin: {
      rest: {
        getSub: (request) => request.body.executor_id,
        getObj: apiAdminPermissionsDeletePermissionForUserUrl,
        getAct: 'delete',
      },
    },
    handler: async (request, reply) => {
      try {
        const res = await permissionsController.deleteRoleForUser(request);
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
