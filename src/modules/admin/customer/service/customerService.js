const prismaClientService = require('../../../../ormService/prismaClientService');
const dateTimeApi = require('../../../../api/dateTimeApi');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../../../../base/base.response');
const errorLogger = require('../../../../plugin/logger');
const {
  createCustomerFailedCustomerIsExistInfo,
} = require('../../../../utils/errorInfo');
const { StatusCodes } = require('http-status-codes');
const PermissionsService = require('../../permissions/service/permissionsService');
/**
 * @description customer service
 */
class CustomerService {
  constructor() {
    this.permissionsService = new PermissionsService();
  }
  /**
   * @description 新增單筆客戶
   * @param { string } email 電郵
   * @param { string } name 姓名
   * @param { string } address 地址
   * @returns { Object } JSON
   */
  async create(email, name, address) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const checkEmailIsExist = await this.findOne(email);
      if (checkEmailIsExist) {
        return new ErrorResponse(
          createCustomerFailedCustomerIsExistInfo,
          twDateTimeData,
        );
      }
      const insertData = {
        data: {
          email: email,
          name: name,
          address: address,
        },
      };
      const data = await prismaClientService.prisma.customer.create(insertData);
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆客戶
   * @param { string } id 客戶 ID
   * @returns { Object } JSON
   */
  async delete(id) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.customer.delete({
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
   * @description 取得多筆客戶
   * @returns { Object } JSON
   */
  async findAll() {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.customer.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          address: true,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆客戶
   * @param { string } email 客戶 電郵
   * @returns { Object } JSON
   */
  async findOne(email) {
    try {
      const data = await prismaClientService.prisma.customer.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
        },
        where: {
          email: email,
        },
      });
      return data || false;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = CustomerService;
