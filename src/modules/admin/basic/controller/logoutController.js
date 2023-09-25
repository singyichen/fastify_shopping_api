const errorLogger = require('../../../../plugin/logger');
const LogoutService = require('../service/logoutService');
const BaseController = require('../../../../base/base.controller');
/**
 * @description logout controller
 */
class LogoutController extends BaseController {
  constructor() {
    super();
    this.logoutService = new LogoutService();
  }
  /**
   * @description 使用者登出
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async logout(request) {
    try {
      const { id } = request.body;
      return await this.logoutService.logout(id).then();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = LogoutController;
