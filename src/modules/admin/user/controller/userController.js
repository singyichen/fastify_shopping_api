const BaseController = require('../../../../base/base.controller');
const errorLogger = require('../../../../plugin/logger');
const UserService = require('../service/userService');
/**
 * @description user controller
 */
class UserController extends BaseController {
  constructor() {
    super();
    this.userService = new UserService();
  }
  /**
   * @description 新增單筆人員
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async create(request) {
    try {
      const { email, name, password } = request.body;
      return await this.userService.create(email, name, password);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆人員
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async delete(request) {
    try {
      const { id } = request.body;
      return await this.userService.delete(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆人員
   * @returns { Object } json
   */
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆人員
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async findOne(request) {
    try {
      const { email } = request.query;
      return await this.userService.findOne(email);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = UserController;
