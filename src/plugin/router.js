/**
 * @description router plugin
 */

const fastifyPlugin = require('fastify-plugin');
// import routes
const rootRouter = require('../routes/root');
async function routerConnector(fastify, opts, done) {
  // 初始化路由
  fastify.register(rootRouter);

  done();
}

module.exports = fastifyPlugin(routerConnector);
