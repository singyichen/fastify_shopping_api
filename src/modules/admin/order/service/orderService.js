const prismaClientService = require('../../../../ormService/prismaClientService');
const dateTimeApi = require('../../../../api/dateTimeApi');
const { SuccessResponse } = require('../../../../base/base.response');
const errorLogger = require('../../../../plugin/logger');
const { StatusCodes } = require('http-status-codes');
/**
 * @description order service
 */
class OrderService {
  /**
   * @description 新增單筆訂單
   * @param { string } customerId 訂單 ID
   * @returns { Object } JSON
   */
  async create(customerId) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const insertData = {
        data: {
          customerId: +customerId,
          totalAmount: 0,
        },
      };
      const data = await prismaClientService.prisma.order.create(insertData);
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆訂單
   * @param { string } id 訂單 ID
   * @returns { Object } JSON
   */
  async delete(id) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.order.delete({
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
   * @description 取得多筆訂單
   * @returns { Object } JSON
   */
  async findAll() {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.order.findMany({
        select: {
          id: true,
          customerId: true,
          orderDate: true,
          totalAmount: true,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆訂單
   * @param { string } id 訂單 ID
   * @returns { Object } JSON
   */
  async findOne(id) {
    try {
      const data = await prismaClientService.prisma.order.findUnique({
        select: {
          id: true,
          customerId: true,
          orderDate: true,
          totalAmount: true,
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

module.exports = OrderService;
