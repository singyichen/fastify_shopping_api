const BaseController = require('../../../../base/base.controller');
const errorLogger = require('../../../../plugin/logger');
const OrderService = require('../service/orderService');
/**
 * @description order controller
 */
class OrderController extends BaseController {
  constructor() {
    super();
    this.orderService = new OrderService();
  }
  /**
   * @description 新增單筆訂單
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async create(request) {
    try {
      const { customerId } = request.body;
      return await this.orderService.create(customerId);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆訂單
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async delete(request) {
    try {
      const { id } = request.body;
      return await this.orderService.delete(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆訂單
   * @returns { Object } json
   */
  async findAll() {
    try {
      return await this.orderService.findAll();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆訂單
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async findOne(request) {
    try {
      const { id } = request.query;
      return await this.orderService.findOne(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = OrderController;
