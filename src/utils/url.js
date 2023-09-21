/**
 * @description api 路由 prefixUrl 與 url
 */
/**
 * @description backStage prefixUrl
 */
const prefixApiAdminUrl = '/api/admin';
const prefixApiAdminBasicUrl = prefixApiAdminUrl + '/basic';
const prefixApiAdminUserUrl = prefixApiAdminUrl + '/user';
const prefixApiAdminPermissionsUrl = prefixApiAdminUrl + '/permissions';
const prefixApiAdminCustomerUrl = prefixApiAdminUrl + '/customer';
const prefixApiAdminProductUrl = prefixApiAdminUrl + '/product';
const prefixApiAdminOrderItemUrl = prefixApiAdminUrl + '/orderItem';
module.exports = {
  /**
   * @description backStage prefixUrl 基礎( /api/admin/basic )
   */
  prefixApiAdminBasicUrl,
  /**
   * @description 使用者登入( POST /api/admin/basic/login )
   */
  apiAdminBasicLoginUrl: prefixApiAdminBasicUrl + '/login',
  /**
   * @description 使用者登出( POST /api/admin/basic/logout )
   */
  apiAdminBasicLogoutUrl: prefixApiAdminBasicUrl + '/logout',
  /**
   * @description 驗證 JWT Token( POST /api/admin/basic/verifyJWT )
   */
  apiAdminBasicVerifyJWTUrl: prefixApiAdminBasicUrl + '/verifyJWT',

  /**
   * @description backStage prefixUrl 人員( /api/admin/user )
   */
  prefixApiAdminUserUrl,
  /**
   * @description 新增單筆人員( POST /api/admin/user )
   */
  apiAdminUserUrl: prefixApiAdminUserUrl,
  /**
   * @description 取得單筆人員( GET /api/admin/user/findOne )
   */
  apiAdminUserFindOneUrl: prefixApiAdminUserUrl + '/findOne',
  /**
   * @description 刪除單筆人員( DELETE /api/admin/user/delete )
   */
  apiAdminUserDeleteUrl: prefixApiAdminUserUrl + '/delete',
  /**
   * @description 取得多筆人員( GET /api/admin/user/findAll )
   */
  apiAdminUserFindAllUrl: prefixApiAdminUserUrl + '/findAll',

  /**
   * @description backStage prefixUrl 權限( /api/admin/permissions )
   */
  prefixApiAdminPermissionsUrl,
  /**
   * @description 取得多筆人員角色( GET /api/admin/permissions/getUsersForRole )
   */
  apiAdminPermissionsGetUsersForRoleUrl:
    prefixApiAdminPermissionsUrl + '/getUsersForRole',
  /**
   * @description 新增單筆人員角色( POST /api/admin/permissions/addRoleForUser )
   */
  apiAdminPermissionsAddRoleForUserUrl:
    prefixApiAdminPermissionsUrl + '/addRoleForUser',
  /**
   * @description 刪除單筆人員角色( DELETE /api/admin/permissions/deleteRoleForUser )
   */
  apiAdminPermissionsDeleteRoleForUserUrl:
    prefixApiAdminPermissionsUrl + '/deleteRoleForUser',
  /**
   * @description 取得多筆角色權限( GET /api/admin/permissions/getPermissionsForUser )
   */
  apiAdminPermissionsGetPermissionsForUserUrl:
    prefixApiAdminPermissionsUrl + '/getPermissionsForUser',
  /**
   * @description 新增單筆人員角色( POST /api/admin/permissions/addPermissionForUser )
   */
  apiAdminPermissionsAddPermissionForUserUrl:
    prefixApiAdminPermissionsUrl + '/addPermissionForUser',
  /**
   * @description 刪除單筆人員角色( DELETE /api/admin/permissions/deletePermissionForUser )
   */
  apiAdminPermissionsDeletePermissionForUserUrl:
    prefixApiAdminPermissionsUrl + '/deletePermissionForUser',

  /**
   * @description backStage prefixUrl 客戶( /api/admin/customer )
   */
  prefixApiAdminCustomerUrl,
  /**
   * @description 新增單筆客戶( POST /api/admin/customer )
   */
  apiAdminCustomerUrl: prefixApiAdminUserUrl,
  /**
   * @description 取得單筆客戶( GET /api/admin/customer/findOne )
   */
  apiAdminCustomerFindOneUrl: prefixApiAdminUserUrl + '/findOne',
  /**
   * @description 刪除單筆客戶( DELETE /api/admin/customer/delete )
   */
  apiAdminCustomerDeleteUrl: prefixApiAdminUserUrl + '/delete',
  /**
   * @description 取得多筆客戶( GET /api/admin/customer/findAll )
   */
  apiAdminCustomerFindAllUrl: prefixApiAdminUserUrl + '/findAll',

  /**
   * @description backStage prefixUrl 商品( /api/admin/product )
   */
  prefixApiAdminProductUrl,
  /**
   * @description 新增單筆商品( POST /api/admin/product )
   */
  apiAdminProductUrl: prefixApiAdminProductUrl,
  /**
   * @description 取得單筆商品( GET /api/admin/product/findOne )
   */
  apiAdminProductFindOneUrl: prefixApiAdminProductUrl + '/findOne',
  /**
   * @description 刪除單筆商品( DELETE /api/admin/product/delete )
   */
  apiAdminProductDeleteUrl: prefixApiAdminProductUrl + '/delete',
  /**
   * @description 取得多筆商品( GET /api/admin/product/findAll )
   */
  apiAdminProductFindAllUrl: prefixApiAdminProductUrl + '/findAll',

  /**
   * @description backStage prefixUrl 訂單項目( /api/admin/orderItem )
   */
  prefixApiAdminOrderItemUrl,
  /**
   * @description 新增單筆訂單項目( POST /api/admin/orderItem )
   */
  apiAdminOrderItemUrl: prefixApiAdminOrderItemUrl,
  /**
   * @description 取得單筆訂單項目( GET /api/admin/orderItem/findOne )
   */
  apiAdminOrderItemFindOneUrl: prefixApiAdminOrderItemUrl + '/findOne',
  /**
   * @description 刪除單筆訂單項目( DELETE /api/admin/orderItem/delete )
   */
  apiAdminOrderItemDeleteUrl: prefixApiAdminOrderItemUrl + '/delete',
  /**
   * @description 取得多筆訂單項目( GET /api/admin/orderItem/findAll )
   */
  apiAdminOrderItemFindAllUrl: prefixApiAdminOrderItemUrl + '/findAll',
};
