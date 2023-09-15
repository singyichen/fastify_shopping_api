const BaseController = require('../../../../base/base.controller');
const errorLogger = require('../../../../plugin/logger');
const PermissionsService = require('../service/permissionsService');
/**
 * @description permissions controller
 */
class PermissionsController extends BaseController {
  constructor() {
    super();
    this.permissionsService = new PermissionsService();
  }
  /**
   * @description 取得多筆角色權限
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async getPermissionsForUser(request) {
    try {
      const { role } = request.query;
      return await this.permissionsService.getPermissionsForUser(role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 新增單筆角色權限
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async addPermissionForUser(request) {
    try {
      const { role, feature, method } = request.body;
      const permission = [feature, method];
      return await this.permissionsService.addPermissionForUser(
        role,
        permission,
      );
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆角色權限
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async deletePermissionForUser(request) {
    try {
      const { role, feature, method } = request.body;
      const permission = [feature, method];
      return await this.permissionsService.deletePermissionForUser(
        role,
        permission,
      );
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆人員角色
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async getUsersForRole(request) {
    try {
      const { role } = request.query;
      return await this.permissionsService.getUsersForRole(role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 新增單筆人員角色
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async addRoleForUser(request) {
    try {
      const { id, role } = request.body;
      return await this.permissionsService.addRoleForUser(id, role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆人員角色
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async deleteRoleForUser(request) {
    try {
      const { id, role } = request.body;
      return await this.permissionsService.deleteRoleForUser(id, role);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = PermissionsController;
