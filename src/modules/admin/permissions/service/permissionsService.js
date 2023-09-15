const errorLogger = require('../../../../plugin/logger');
const enforcerCreator = require('../../../../plugin/enforcer');
/**
 * @description permissions service
 */
class PermissionsService {
  /**
   * @description 取得多筆角色權限
   * @param { string } role 角色
   * @returns { Boolean } Boolean
   */
  async getPermissionsForUser(role) {
    try {
      const enforcer = await enforcerCreator();
      return await enforcer.getPermissionsForUser(role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 新增單筆角色權限
   * @param { string } role 角色
   * @param { array } permission 權限
   * @returns { Boolean } Boolean
   */
  async addPermissionForUser(role, permission) {
    try {
      const enforcer = await enforcerCreator();
      return await enforcer.addPermissionForUser(role, ...permission);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆角色權限
   * @param { string } role 角色
   * @param { array } permission 權限
   * @returns { Boolean } Boolean
   */
  async deletePermissionForUser(role, permission) {
    try {
      const enforcer = await enforcerCreator();
      return await enforcer.deletePermissionForUser(role, ...permission);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆人員角色
   * @param { string } role 角色
   * @returns { Boolean } Boolean
   */
  async getUsersForRole(role) {
    try {
      const enforcer = await enforcerCreator();
      return await enforcer.getUsersForRole(role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 新增單筆人員角色
   * @param { string } id id
   * @param { string } role 角色
   * @returns { Boolean } Boolean
   */
  async addRoleForUser(id, role) {
    try {
      const enforcer = await enforcerCreator();
      return await enforcer.addRoleForUser(id, role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆人員角色
   * @param { string } id id
   * @param { string } role 角色
   * @returns { Boolean } Boolean
   */
  async deleteRoleForUser(id, role) {
    try {
      const enforcer = await enforcerCreator();
      return await enforcer.deleteRoleForUser(id, role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = PermissionsService;
