/**
 * @description router plugin
 */

const fastifyPlugin = require('fastify-plugin');
// import routes
const rootRouter = require('../routes/root');
// backStage
const adminBasicAPIRouter = require('../routes/api/admin/basic/basic');
const adminUserAPIRouter = require('../routes/api/admin/user/user');
const adminPermissionsAPIRouter = require('../routes/api/admin/permissions/permissions');
const adminCustomerAPIRouter = require('../routes/api/admin/customer/customer');
const adminProductAPIRouter = require('../routes/api/admin/product/product');
const adminOrderItemAPIRouter = require('../routes/api/admin/orderItem/orderItem');
const adminOrderAPIRouter = require('../routes/api/admin/order/order');
const {
  prefixApiAdminBasicUrl,
  prefixApiAdminUserUrl,
  prefixApiAdminPermissionsUrl,
  prefixApiAdminCustomerUrl,
  prefixApiAdminProductUrl,
  prefixApiAdminOrderItemUrl,
  prefixApiAdminOrderUrl,
} = require('../utils/url');

async function routerConnector(fastify, opts, done) {
  // 初始化路由
  fastify.register(rootRouter);
  /**
   * @description 後台( backStage )
   */
  // 基礎( basic )
  fastify.register(adminBasicAPIRouter, {
    prefix: prefixApiAdminBasicUrl,
  });
  // 人員( user )
  fastify.register(adminUserAPIRouter, {
    prefix: prefixApiAdminUserUrl,
  });
  // 權限( permissions )
  fastify.register(adminPermissionsAPIRouter, {
    prefix: prefixApiAdminPermissionsUrl,
  });
  // 客戶( customer )
  fastify.register(adminCustomerAPIRouter, {
    prefix: prefixApiAdminCustomerUrl,
  });
  // 商品( product )
  fastify.register(adminProductAPIRouter, {
    prefix: prefixApiAdminProductUrl,
  });
  // 訂單項目( orderItem )
  fastify.register(adminOrderItemAPIRouter, {
    prefix: prefixApiAdminOrderItemUrl,
  });
  // 訂單( order )
  fastify.register(adminOrderAPIRouter, {
    prefix: prefixApiAdminOrderUrl,
  });
  done();
}

module.exports = fastifyPlugin(routerConnector);
