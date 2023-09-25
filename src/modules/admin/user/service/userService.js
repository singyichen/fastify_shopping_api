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
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
/**
 * @description user service
 */
class UserService {
  constructor() {
    this.permissionsService = new PermissionsService();
  }
  /**
   * @description 使用 SHA512 對明文密碼進行哈希並加鹽處理
   * @param { string } password 密碼
   * @returns { string } bcryptHash 加鹽過後的密碼
   */
  async encryptWithSHA512(password) {
    try {
      // 生成一個用於每個用戶的鹽
      // 成本因子可以根據你的需求進行調整，鹽的複雜度，數字越高，加密強度越高，但處理時間也越長
      const salt = bcrypt.genSaltSync(10);
      // 使用 SHA512 對明文密碼進行哈希
      const sha512Hash = CryptoJS.SHA512(password).toString();
      // 將明文密碼的 SHA512 哈希值和鹽值進行哈希加密，得到加鹽過後的密碼
      const bcryptHash = await bcrypt.hash(sha512Hash, salt);
      return bcryptHash;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }

  /**
   * @description 使用 AES256 和一個秘密的值 pepper 對 bcryptHash 進行加密
   * @param { string } bcryptHash 加鹽過後的密碼
   * @param { string } pepper 秘密的值 pepper
   * @returns { string } encryptedHash 加密過後的加鹽密碼
   */
  async encryptWithAES256(bcryptHash, pepper) {
    try {
      // 將 pepper 轉換為 key，key 用於加密過程中的金鑰
      const key = CryptoJS.enc.Utf8.parse(pepper);
      // 使用 key 對 bcryptHash 進行 AES256 加密，並指定加密模式為 ECB
      const encryptedHash = CryptoJS.AES.encrypt(bcryptHash, key, {
        mode: CryptoJS.mode.ECB,
      }).toString();
      return encryptedHash;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 對密碼進行加密
   * @param { string } password 密碼
   * @returns { string } encryptedPassword 加密後的密碼
   */
  async encryptPassword(password) {
    try {
      const bcryptHash = await this.encryptWithSHA512(password);
      const encryptedPassword = await this.encryptWithAES256(
        bcryptHash,
        process.env.PEPPER,
      );
      return encryptedPassword;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
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
      const encryptedPassword = await this.encryptPassword(password);
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
      const encryptedPassword = await this.encryptPassword(password);
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
