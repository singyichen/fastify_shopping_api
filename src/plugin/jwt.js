/**
 * @description jwt plugin
 */

const fastifyPlugin = require('fastify-plugin');
const { createVerifier } = require('fast-jwt');
const UserService = require('../modules/admin/user/service/userService');
const errorLogger = require('./logger');
const {
  registerUserJwtInvalidInfo,
  registerUserJwtNotExistInfo,
  registerUserJwtExpiredInfo,
  registerUserJwtSignatureInvalidInfo,
} = require('../utils/errorInfo');
const dateTimeApi = require('../api/dateTimeApi');
const { ErrorResponse } = require('../base/base.response');
const userService = new UserService();
const R = require('ramda');
const { StatusCodes } = require('http-status-codes');

async function jwtConnector(fastify, opts, done) {
  // 註冊驗證策略 'verifyJWT'
  fastify.decorate('verifyJWT', async function (request, reply, done) {
    const twDateTimeData = (await dateTimeApi()).data;
    try {
      const verifySync = createVerifier({
        key: process.env.JWT_PASSPORT_SECRET,
      });
      const doVerifyJWT = R.pipe(
        R.ifElse(
          (req) => req.headers.authorization,
          async () => {
            const headers = request.headers.authorization.toString().split(' ');
            const authorizationToken = headers[1];
            // JWT 驗證 (會檢查 Signature 是否合法 與 Token 是否過期)
            const payload = verifySync(authorizationToken);
            const userTokenInfo = await userService.findOneByID(payload.id);
            const token = userTokenInfo.token;
            return {
              authorizationToken: authorizationToken,
              token: token,
            };
          },
          () =>
            Promise.resolve(
              done(
                new ErrorResponse(registerUserJwtNotExistInfo, twDateTimeData),
              ),
            ),
        ),
        R.andThen(
          R.ifElse(
            (verifyJWTobj) => {
              if (verifyJWTobj) {
                // 與 DB token 比對
                return verifyJWTobj.authorizationToken === verifyJWTobj.token;
              } else {
                return false;
              }
            },
            () => Promise.resolve(),
            () =>
              Promise.resolve(
                done(
                  new ErrorResponse(registerUserJwtInvalidInfo, twDateTimeData),
                ),
              ),
          ),
        ),
      );
      return await doVerifyJWT(request).then();
    } catch (err) {
      errorLogger.error(err);
      switch (err.code) {
        case 'FAST_JWT_EXPIRED':
          return done(
            new ErrorResponse(registerUserJwtExpiredInfo, twDateTimeData),
          );
        case 'FAST_JWT_INVALID_SIGNATURE':
          return done(
            new ErrorResponse(
              registerUserJwtSignatureInvalidInfo,
              twDateTimeData,
            ),
          );
        default:
          reply.code(StatusCodes.UNAUTHORIZED).send(err);
      }
    }
  });
  done();
}

module.exports = fastifyPlugin(jwtConnector);
