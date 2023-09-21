const BaseController = require('../../../../base/base.controller');
const errorLogger = require('../../../../plugin/logger');
const CustomerService = require('../service/customerService');
/**
 * @description customer controller
 */
class CustomerController extends BaseController {
  constructor() {
    super();
    this.customerService = new CustomerService();
  }
  /**
   * @description 新增單筆客戶
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async create(request) {
    try {
      const { email, name, address } = request.body;
      return await this.customerService.create(email, name, address);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆客戶
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async delete(request) {
    try {
      const { id } = request.body;
      return await this.customerService.delete(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆客戶
   * @returns { Object } json
   */
  async findAll() {
    try {
      return await this.customerService.findAll();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆客戶
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async findOne(request) {
    try {
      const { email } = request.query;
      return await this.customerService.findOne(email);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = CustomerController;
