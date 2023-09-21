const prismaClientService = require('../../../../ormService/prismaClientService');
const dateTimeApi = require('../../../../api/dateTimeApi');
const { SuccessResponse } = require('../../../../base/base.response');
const errorLogger = require('../../../../plugin/logger');
const { StatusCodes } = require('http-status-codes');
/**
 * @description product service
 */
class ProductService {
  /**
   * @description 新增單筆商品
   * @param { string } name 商品名稱
   * @param { string } description 說明
   * @param { float } price 價格
   * @returns { Object } JSON
   */
  async create(name, description, price) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const insertData = {
        data: {
          name: name,
          description: description,
          price: +price,
        },
      };
      const data = await prismaClientService.prisma.product.create(insertData);
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆商品
   * @param { string } id 商品 ID
   * @returns { Object } JSON
   */
  async delete(id) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.product.delete({
        where: {
          id: +id,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆商品
   * @returns { Object } JSON
   */
  async findAll() {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆商品
   * @param { string } id 商品 ID
   * @returns { Object } JSON
   */
  async findOne(id) {
    try {
      const data = await prismaClientService.prisma.product.findUnique({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
        where: {
          id: +id,
        },
      });
      return data || false;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = ProductService;
