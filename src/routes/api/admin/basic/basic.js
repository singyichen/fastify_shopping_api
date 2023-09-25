/**
 * @description basic API 路由
 */

const LoginController = require('../../../../modules/admin/basic/controller/loginController');
const errorLogger = require('../../../../plugin/logger');
const loginSchema = require('../../../../modules/admin/basic/validator/login');
const loginController = new LoginController();
const LogoutController = require('../../../../modules/admin/basic/controller/logoutController');
const logoutSchema = require('../../../../modules/admin/basic/validator/logout');
const verifyJWTSchema = require('../../../../modules/admin/basic/validator/verifyJWT');
const logoutController = new LogoutController();
/**
 * @description 基礎路由( POST api/admin/basic )
 */
async function router(fastify, opts) {
  /**
   * @description 使用者登入路由( POST api/admin/basic/login )
   */
  fastify.post('/login', {
    // login 資料格式驗證
    schema: {
      body: loginSchema,
    },
    handler: async (request, reply) => {
      try {
        const res = await loginController.login(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });

  /**
   * @description 使用者登出路由( POST api/admin/basic/logout )
   */
  fastify.post('/logout', {
    // logout 資料格式驗證
    schema: {
      body: logoutSchema,
    },
    // JWT 驗證
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: async (request, reply) => {
      try {
        const res = await logoutController.logout(request);
        reply.send(res);
      } catch (error) {
        errorLogger.error(error);
        reply.send({ status: -1, message: error.message });
        console.log(error);
      }
    },
  });

  /**
   * @description 驗證 JWT Token 路由( POST api/admin/basic/verifyJWT )
   */
  fastify.post('/verifyJWT', {
    // verifyJWT 資料格式驗證
    schema: {
      body: verifyJWTSchema,
    },
    handler: async (request, reply) => {
      try {
        const res = await loginController.verifyJWT(request);
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
