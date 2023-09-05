/**
 * @description cors plugin
 */

const fastifyPlugin = require('fastify-plugin');
const cors = require('@fastify/cors');

async function corsConnector(fastify, opts, done) {
  // 組態跨網域
  const corsOptions = {
    // 設定授權使用 api 的網域
    origin: [process.env.BACKEND_IP],
    // 設定所允許的 HTTP 請求方法
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // 設定本次請求的有效期，單位為秒
    maxAge: 60,
    // 設定哪些 HTTP 標頭可以於實際請求中使用
    allowedHeaders: ['Content-Type', 'Authorization'],
    hideOptionsRoute: false,
  };
  fastify.register(cors, corsOptions);

  done();
}

module.exports = fastifyPlugin(corsConnector);
