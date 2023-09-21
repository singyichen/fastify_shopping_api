const prismaClientService = require('../../../../ormService/prismaClientService');
const dateTimeApi = require('../../../../api/dateTimeApi');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../../../../base/base.response');
const errorLogger = require('../../../../plugin/logger');
const {
  createUserFailedUserIsExistInfo,
} = require('../../../../utils/errorInfo');
const { StatusCodes } = require('http-status-codes');
const PermissionsService = require('../../permissions/service/permissionsService');
/**
 * @description user service
 */
class UserService {
  constructor() {
    this.permissionsService = new PermissionsService();
  }
  /**
   * @description 新增單筆人員
   * @param { string } email 電郵
   * @param { string } name 姓名
   * @param { string } password 密碼
   * @returns { Object } JSON
   */
  async create(email, name, password) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const checkEmailIsExist = await this.findOne(email);
      if (checkEmailIsExist) {
        return new ErrorResponse(
          createUserFailedUserIsExistInfo,
          twDateTimeData,
        );
      }
      const insertData = {
        data: {
          email: email,
          name: name,
          password: password,
        },
      };
      const data = await prismaClientService.prisma.user.create(insertData);
      const findOneData = await this.findOne(email);
      const id = findOneData.id;
      await this.permissionsService.addRoleForUser(id, 'user');
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 刪除單筆人員
   * @param { string } id 人員 ID
   * @returns { Object } JSON
   */
  async delete(id) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      await this.permissionsService.deleteRoleForUser(id, 'user');
      const data = await prismaClientService.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得多筆人員
   * @returns { Object } JSON
   */
  async findAll() {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const data = await prismaClientService.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得單筆人員
   * @param { string } email 人員 電郵
   * @returns { Object } JSON
   */
  async findOne(email) {
    try {
      const data = await prismaClientService.prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          token: true,
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

module.exports = UserService;
