const BaseController = require('../../../../base/base.controller');
const errorLogger = require('../../../../plugin/logger');
const ProductService = require('../service/productService');
/**
 * @description product controller
 */
class ProductController extends BaseController {
  constructor() {
    super();
    this.productService = new ProductService();
  }
  /**
   * @description 新增單筆商品
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async create(request) {
    try {
      const { name, description, price } = request.body;
      return await this.productService.create(name, description, price);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆商品
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async delete(request) {
    try {
      const { id } = request.body;
      return await this.productService.delete(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆商品
   * @returns { Object } json
   */
  async findAll() {
    try {
      return await this.productService.findAll();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆商品
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async findOne(request) {
    try {
      const { id } = request.query;
      return await this.productService.findOne(id);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = ProductController;
