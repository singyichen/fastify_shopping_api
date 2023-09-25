const R = require('ramda');
const errorLogger = require('../../../../plugin/logger');
const VerificationService = require('./verificationService');
const { SuccessResponse } = require('../../../../base/base.response');
const dateTimeApi = require('../../../../api/dateTimeApi');
const { StatusCodes } = require('http-status-codes');
/**
 * @description logout service
 */
class LogoutService {
  constructor() {
    this.verificationService = new VerificationService();
  }
  /**
   * @description 使用者登出
   * @param { string } id 使用者 ID
   * @returns { Object } JSON include logout_date and logout_time and logout_day
   */
  async logout(id) {
    try {
      const twDateTimeData = (await dateTimeApi()).data;
      const twDate = twDateTimeData.tw_date;
      const twTime = twDateTimeData.tw_time;
      const twDay = twDateTimeData.tw_day;
      const data = {
        logout_date: twDate,
        logout_time: twTime,
        logout_day: twDay,
      };
      const doLogout = R.pipe(
        this.verificationService.updateUserToken,
        R.andThen(
          R.ifElse(
            (userObj) => userObj,
            () =>
              Promise.resolve(
                new SuccessResponse(StatusCodes.OK, data, twDateTimeData),
              ),
            () => Promise.reject(),
          ),
        ),
      );
      // 清空 user 中的 token 資料
      return await doLogout(id, '').then();
    } catch (error) {
      errorLogger.error(error);
      console.log(error);
    }
  }
}

module.exports = LogoutService;
