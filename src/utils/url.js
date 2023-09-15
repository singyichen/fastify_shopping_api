/**
 * @description api 路由 prefixUrl 與 url
 */
/**
 * @description backStage prefixUrl
 */
const prefixApiAdminUrl = '/api/admin';
const prefixApiAdminBasicUrl = prefixApiAdminUrl + '/basic';
const prefixApiAdminUserUrl = prefixApiAdminUrl + '/user';
const prefixApiAdminPermissionsAgentUrl = prefixApiAdminUrl + '/permissions';

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
  prefixApiAdminPermissionsAgentUrl,
  /**
   * @description 取得多筆人員角色( GET /api/admin/permissions/getUsersForRole )
   */
  apiAdminPermissionsGetUsersForRoleUrl:
    prefixApiAdminPermissionsAgentUrl + '/getUsersForRole',
  /**
   * @description 新增單筆人員角色( POST /api/admin/permissions/addRoleForUser )
   */
  apiAdminPermissionsAddRoleForUserUrl:
    prefixApiAdminPermissionsAgentUrl + '/addRoleForUser',
  /**
   * @description 刪除單筆人員角色( DELETE /api/admin/permissions/deleteRoleForUser )
   */
  apiAdminPermissionsDeleteRoleForUserUrl:
    prefixApiAdminPermissionsAgentUrl + '/deleteRoleForUser',
  /**
   * @description 取得多筆角色權限( GET /api/admin/permissions/getPermissionsForUser )
   */
  apiAdminPermissionsGetPermissionsForUserUrl:
    prefixApiAdminPermissionsAgentUrl + '/getPermissionsForUser',
  /**
   * @description 新增單筆人員角色( POST /api/admin/permissions/addPermissionForUser )
   */
  apiAdminPermissionsAddPermissionForUserUrl:
    prefixApiAdminPermissionsAgentUrl + '/addPermissionForUser',
  /**
   * @description 刪除單筆人員角色( DELETE /api/admin/permissions/deletePermissionForUser )
   */
  apiAdminPermissionsDeletePermissionForUserUrl:
    prefixApiAdminPermissionsAgentUrl + '/deletePermissionForUser',
};
