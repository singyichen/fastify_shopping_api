const prismaClientService = require('../../../../ormService/prismaClientService');
const dateTimeApi = require('../../../../api/dateTimeApi');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../../../../base/base.response');
const errorLogger = require('../../../../plugin/logger');
const {
  createUserFailedUserIsExistInfo,
  updateUserFailedEmailIsExistInfo,
} = require('../../../../utils/errorInfo');
const { StatusCodes } = require('http-status-codes');
const PermissionsService = require('../../permissions/service/permissionsService');
const VerificationService = require('../../basic/service/verificationService');
/**
 * @description user service
 */
class UserService {
  constructor() {
    this.permissionsService = new PermissionsService();
    this.verificationService = new VerificationService();
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
      const encryptedPassword =
        await this.verificationService.encryptPassword(password);
      const data = await prismaClientService.prisma.user.create({
        select: {
          id: true,
          email: true,
          name: true,
        },
        data: {
          email: email,
          name: name,
          password: encryptedPassword,
        },
      });
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
        select: {
          id: true,
          email: true,
          name: true,
        },
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
   * @param { string } email 電郵
   * @returns { Object } JSON
   */
  async findOne(email) {
    try {
      const data = await prismaClientService.prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
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

  /**
   * @description 取得單筆人員
   * @param { string } id 人員 ID
   * @returns { Object } JSON
   */
  async findOneByID(id) {
    try {
      const data = await prismaClientService.prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          token: true,
        },
        where: {
          id: id,
        },
      });
      return data || false;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }

  /**
   * @description 編輯單筆人員
   * @param { string } id 人員 ID
   * @param { string } email 電郵
   * @param { string } name 姓名
   * @param { string } password 密碼
   * @returns { Object } JSON
   */
  async update(id, email, name, password) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const checkEmailIsExist = await this.findOne(email);
      if (checkEmailIsExist && checkEmailIsExist.id !== id) {
        return new ErrorResponse(
          updateUserFailedEmailIsExistInfo,
          twDateTimeData,
        );
      }
      const encryptedPassword =
        await this.verificationService.encryptPassword(password);
      const data = await prismaClientService.prisma.user.update({
        select: {
          id: true,
          email: true,
          name: true,
        },
        where: {
          id: id,
        },
        data: {
          email: email,
          name: name,
          password: encryptedPassword,
        },
      });
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = UserService;
