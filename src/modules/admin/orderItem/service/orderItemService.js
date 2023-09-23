const prismaClientService = require('../../../../ormService/prismaClientService');
const dateTimeApi = require('../../../../api/dateTimeApi');
const { SuccessResponse } = require('../../../../base/base.response');
const errorLogger = require('../../../../plugin/logger');
const { StatusCodes } = require('http-status-codes');
/**
 * @description orderItem service
 */
class OrderItemService {
  /**
   * @description 新增單筆訂單項目
   * @param { string } orderId 訂單 ID
   * @param { string } productId 商品 ID
   * @param { string } quantity 數量
   * @returns { Object } JSON
   */
  async create(orderId, productId, quantity) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const insertData = {
        data: {
          orderId: +orderId,
          productId: +productId,
          quantity: +quantity,
        },
      };
      const data =
        await prismaClientService.prisma.orderItem.create(insertData);
      const productData = await prismaClientService.prisma.product.findUnique({
        select: {
          id: true,
          name: true,
          price: true,
        },
        where: {
          id: +productId,
        },
      });
      const productPrice = +productData.price * +quantity;
      const orderData = await prismaClientService.prisma.order.findUnique({
        select: {
          id: true,
          totalAmount: true,
        },
        where: {
          id: +orderId,
        },
      });
      const totalAmount = +orderData.totalAmount + productPrice;
      const updateOrderData = await prismaClientService.prisma.order.update({
        where: {
          id: +orderId,
        },
        data: {
          totalAmount: totalAmount,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆訂單項目
   * @param { string } id 訂單項目 ID
   * @returns { Object } JSON
   */
  async delete(id) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const orderItemData =
        await prismaClientService.prisma.orderItem.findUnique({
          select: {
            id: true,
            orderId: true,
            productId: true,
            quantity: true,
          },
          where: {
            id: +id,
          },
        });
      const data = await prismaClientService.prisma.orderItem.delete({
        where: {
          id: +id,
        },
      });
      const { orderId, productId, quantity } = orderItemData;
      const productData = await prismaClientService.prisma.product.findUnique({
        select: {
          id: true,
          name: true,
          price: true,
        },
        where: {
          id: +productId,
        },
      });
      const productPrice = +productData.price * +quantity;
      const orderData = await prismaClientService.prisma.order.findUnique({
        select: {
          id: true,
          totalAmount: true,
        },
        where: {
          id: +orderId,
        },
      });
      const totalAmount = +orderData.totalAmount - productPrice;
      const updateOrderData = await prismaClientService.prisma.order.update({
        where: {
          id: +orderId,
        },
        data: {
          totalAmount: totalAmount,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆訂單項目
   * @returns { Object } JSON
   */
  async findAll() {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.orderItem.findMany({
        select: {
          id: true,
          orderId: true,
          productId: true,
          quantity: true,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆訂單項目
   * @param { string } id 訂單項目 ID
   * @returns { Object } JSON
   */
  async findOne(id) {
    try {
      const data = await prismaClientService.prisma.orderItem.findUnique({
        select: {
          id: true,
          orderId: true,
          productId: true,
          quantity: true,
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

module.exports = OrderItemService;
