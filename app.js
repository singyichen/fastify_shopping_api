'use strict';
/**
 * @description import
 */
// import Dependencies
const fastify = require('fastify');
const fastifyAuth = require('@fastify/auth');
// import plugin
const fastifyCorsPlugin = require('./src/plugin/cors');
const fastifyRouterPlugin = require('./src/plugin/router');
const fastifyEnvPlugin = require('./src/plugin/env');
const fastifyLoggerPlugin = require('./src/plugin/logger');
const fastifyJwtPlugin = require('./src/plugin/jwt');
const fastifyCasbinPlugin = require('./src/plugin/casbin');

function build() {
  // init app
  const app = fastify({
    // 使用 logger plugin
    logger: fastifyLoggerPlugin,
  });
  /**
   * @description plugin
   */
  // plugin
  // 取得 .env 中的環境變數
  app.register(fastifyEnvPlugin).after((err) => {
    if (err) console.log(err);
  });
  app.register(fastifyCorsPlugin);
  // 將 http 類型 log 寫入 info 日誌
  app.addHook('onResponse', (request, reply, done) => {
    fastifyLoggerPlugin.info({
      request: {
        method: request.method,
        url: request.url,
        user_agent: request.headers['user-agent'],
        hostname: request.hostname,
        remoteAddress: request.ip,
        remotePort: request.socket.remotePort,
      },
      reply: {
        statusCode: reply.statusCode,
        statusMessage: reply.raw.statusMessage,
      },
    });
    done();
  });
  // auth
  app.register(fastifyAuth);
  // jwt
  app.register(fastifyJwtPlugin);
  // casbin
  app.register(fastifyCasbinPlugin);
  // router
  app.register(fastifyRouterPlugin);

  return app;
}
const server = build();
// restful api server
server.listen({ port: process.env.PORT, host: '0.0.0.0' }, function (err) {
  console.log(
    `Welcome to e_shopping_api app listening at http://${process.env.IP_ADDRESS}:${process.env.PORT}`,
  );
  if (err) {
    // 紀錄全域狀態下的 error 到日誌
    fastifyLoggerPlugin.error(err);
    console.log(err);
  }
});
module.exports.build = build;
module.exports.server = server;
