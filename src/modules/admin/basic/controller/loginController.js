const VerificationService = require('../service/verificationService');
const R = require('ramda');
const errorLogger = require('../../../../plugin/logger');
const BaseController = require('../../../../base/base.controller');
const dateTimeApi = require('../../../../api/dateTimeApi');
/**
 * @description login controller
 */
class LoginController extends BaseController {
  constructor() {
    super();
    this.verificationService = new VerificationService();
  }
  /**
   * @description 使用者登入
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async login(request) {
    try {
      const { email, password } = request.body;
      const twDateTimeData = (await dateTimeApi()).data;
      const loginAccess = R.pipe(
        this.verificationService.systemVerification,
        R.andThen(
          R.ifElse(
            (systemVerificationObj) => systemVerificationObj.result === true,
            async (systemVerificationObj) =>
              await this.verificationService.passwordVerification(
                systemVerificationObj.data.id,
                systemVerificationObj.data.name,
                systemVerificationObj.data.email,
                password,
              ),
            async (systemVerificationObj) => {
              return this.respondError(
                systemVerificationObj.message,
                twDateTimeData,
              );
            },
          ),
        ),
        R.andThen(
          R.ifElse(
            (verifyPasswordObj) => verifyPasswordObj.data,
            async (verifyPasswordObj) => {
              await this.verificationService.updateUserToken(
                verifyPasswordObj.data.id,
                verifyPasswordObj.data.token,
              );
              return verifyPasswordObj;
            },
            async (verifyPasswordObj) => {
              return this.respondError(verifyPasswordObj, twDateTimeData);
            },
          ),
        ),
      );
      return await loginAccess(email).then();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
  /**
   * @description 驗證 JWT Token
   * @param { Object } request 請求
   * @returns { Object } json
   */
  async verifyJWT(request) {
    try {
      const { token } = request.body;
      return await this.verificationService.verifyJWT(token);
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = LoginController;
