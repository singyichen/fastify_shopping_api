const BaseController = require('../../../../base/base.controller');
const errorLogger = require('../../../../plugin/logger');
const OrderItemService = require('../service/orderItemService');
/**
 * @description orderItem controller
 */
class OrderItemController extends BaseController {
  constructor() {
    super();
    this.orderItemService = new OrderItemService();
  }
  /**
   * @description 新增單筆訂單項目
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async create(request) {
    try {
      const { orderId, productId, quantity } = request.body;
      return await this.orderItemService.create(orderId, productId, quantity);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆訂單項目
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async delete(request) {
    try {
      const { id } = request.body;
      return await this.orderItemService.delete(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆訂單項目
   * @returns { Object } json
   */
  async findAll() {
    try {
      return await this.orderItemService.findAll();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆訂單項目
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async findOne(request) {
    try {
      const { id } = request.query;
      return await this.orderItemService.findOne(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = OrderItemController;
