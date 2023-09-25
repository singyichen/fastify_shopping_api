const prismaClientService = require('../../../../ormService/prismaClientService');
const { createSigner } = require('fast-jwt');
const dateTimeApi = require('../../../../api/dateTimeApi');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../../../../base/base.response');
const { SuccessResult, ErrorResult } = require('../../../../base/base.result');
const {
  registerUserIDNotExistInfo,
  registerUserJwtInvalidInfo,
  registerUserJwtExpiredInfo,
  registerUserJwtSignatureInvalidInfo,
  registerUserIDOrPasswordNotCorrectInfo,
} = require('../../../../utils/errorInfo');
const R = require('ramda');
const errorLogger = require('../../../../plugin/logger');
const { createVerifier } = require('fast-jwt');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
/**
 * @description verification service
 */
class VerificationService {
  /**
   * @description 使用 pepper 對 bcryptHash 進行解密
   * @param { string } encryptedHash 加密過後的加鹽密碼
   * @param { string } pepper 秘密的值 pepper
   * @returns { string } decryptedHash 解密過後的加鹽密碼
   */
  decryptWithAES256(encryptedHash, pepper) {
    try {
      // 將 pepper 轉換為 key，key 用於解密過程中的金鑰
      const key = CryptoJS.enc.Utf8.parse(pepper);
      // 使用 key 對 bcryptHash 進行 AES256 解密，並指定解密模式為 ECB
      const decrypted = CryptoJS.AES.decrypt(encryptedHash, key, {
        mode: CryptoJS.mode.ECB,
      });
      const decryptedHash = CryptoJS.enc.Utf8.stringify(decrypted);
      return decryptedHash;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 驗證密碼
   * @param { string } email 電郵
   * @param { string } password 密碼
   * @returns { Boolean } 密碼是否相符
   */
  async verifyPassword(email, password) {
    try {
      const userData = await prismaClientService.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      // 解密過後的哈希值（從 DB 中取得的加密密碼）
      const decryptedHash = this.decryptWithAES256(
        userData.password,
        process.env.PEPPER,
      );
      // 將明文密碼轉換為 SHA512 哈希值
      const sha512Hash = CryptoJS.SHA512(password).toString();
      // 將使用者輸入的哈希值與解密後的哈希值進行比較
      const isMatch = bcrypt.compareSync(sha512Hash, decryptedHash);
      return isMatch;
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 進行系統驗證
   * @param { string } id 使用者 ID
   * @returns { Object } JSON include id 、 name or ErrorResult
   */
  async systemVerification(email) {
    try {
      const selectOpt = {
        select: {
          id: true,
          name: true,
          email: true,
        },
        where: {
          email: email,
        },
      };
      const verificationAccess = R.pipe(
        prismaClientService.prisma.user.findUnique,
        R.andThen(
          R.ifElse(
            (userObj) => userObj,
            (userObj) => new SuccessResult(true, userObj),
            () => {
              const errorRes = new ErrorResponse(registerUserIDNotExistInfo);
              return new ErrorResult(false, errorRes);
            },
          ),
        ),
      );
      return await verificationAccess(selectOpt).then();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 取得 JWT
   * @param { string } id 使用者 ID
   * @param { string } name 使用者名稱
   * @returns { Object } JSON include id 、 name 、 token 、 login_date 、 login_day 、 login_time 、 dateTime
   */
  async getJwtToken(id, name) {
    try {
      const payload = { id: id };
      const secret = process.env.JWT_PASSPORT_SECRET;
      // expiresIn 過期時間(單位為毫秒)
      const expiresIn = +process.env.JWT_EXPIRESIN;
      const signSync = createSigner({ key: secret, expiresIn: expiresIn });
      const token = signSync(payload);
      const twDateTimeData = (await dateTimeApi()).data;
      const data = {
        id: id,
        name: name,
        token: token,
        login_date: twDateTimeData.tw_date,
        login_day: twDateTimeData.tw_day,
        login_time: twDateTimeData.tw_time,
      };
      return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }

  /**
   * @description 更新單筆人員存取令牌
   * @param { string } id 使用者 ID
   * @param { Object } token JwtToken
   * @returns { Object } JSON include id 、 name 、 token
   */
  async updateUserToken(id, token) {
    try {
      return await prismaClientService.prisma.user.update({
        select: {
          id: true,
          name: true,
          token: true,
        },
        where: {
          id: id,
        },
        data: {
          token: token,
        },
      });
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }

  /**
   * @description 進行密碼驗證
   * @param { string } userID 使用者 ID
   * @param { string } userName 使用者姓名
   * @param { string } password 使用者密碼
   * @returns { Object } verificationData
   */
  async passwordVerification(id, name, email, password) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const isMatch = await this.verifyPassword(email, password);
      if (isMatch) {
        return await this.getJwtToken(id, name);
      } else {
        return new ErrorResponse(
          registerUserIDOrPasswordNotCorrectInfo,
          twDateTimeData,
        );
      }
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }

  /**
   * @description 驗證 JWT Token
   * @param { string } token JwtToken
   * @returns { Object } verificationData
   */
  async verifyJWT(token) {
    const twDateTimeData = (await dateTimeApi()).data;
    try {
      const verifySync = createVerifier({
        key: process.env.JWT_PASSPORT_SECRET,
      });
      // JWT 驗證 (會檢查 Signature 是否合法 與 Token 是否過期)
      const payload = verifySync(token);
      const userTokenInfo = await prismaClientService.prisma.user.findUnique({
        select: {
          id: true,
          token: true,
        },
        where: {
          id: payload.id,
        },
      });
      const tokenIDFromDB = userTokenInfo?.token ?? '';
      const doVerifyJWT = R.pipe(
        R.ifElse(
          (tokenIDCheck, tokenIDFromDBCheck) =>
            tokenIDCheck === tokenIDFromDBCheck,
          () => {
            const data = {
              token: token,
            };
            return new SuccessResponse(StatusCodes.OK, data, twDateTimeData);
          },
          () => {
            return new ErrorResponse(
              registerUserJwtInvalidInfo,
              twDateTimeData,
            );
          },
        ),
      );
      return doVerifyJWT(token, tokenIDFromDB);
    } catch (err) {
      errorLogger.error(err);
      switch (err.code) {
        case 'FAST_JWT_EXPIRED':
          return new ErrorResponse(registerUserJwtExpiredInfo, twDateTimeData);
        case 'FAST_JWT_INVALID_SIGNATURE':
          return new ErrorResponse(
            registerUserJwtSignatureInvalidInfo,
            twDateTimeData,
          );
        default:
          return err;
      }
    }
  }
}

module.exports = VerificationService;
