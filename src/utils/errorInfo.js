/**
 * @description 失敗訊息集合，包括 statusCode、code、error、error_title、message
 */
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

module.exports = {
  /**
   * @description 系統：帳號或密碼錯誤，請重新嘗試。
   */
  registerUserIDNotExistInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40101,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: '系統：帳號或密碼錯誤，請重新嘗試。',
  },
  /**
   * @description 該帳號不存在，請重新輸入。
   */
  registerUserAdIDNotExistInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40102,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: '該帳號不存在，請重新輸入。',
  },
  /**
   * @description AD：帳號或密碼錯誤，請重新嘗試。
   */
  registerUserAdIDOrPasswordNotCorrectInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40103,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: 'AD：帳號或密碼錯誤，請重新嘗試。',
  },
  /**
   * @description 連線逾時，請重新登入。
   */
  registerUserJwtExpiredInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40104,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: '連線逾時，請重新登入。',
  },
  /**
   * @description 連線逾時，Token 簽章不合法
   */
  registerUserJwtSignatureInvalidInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40105,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: '連線逾時，Token 簽章不合法',
  },
  /**
   * @description 系統偵測已重複登入，請重新登入。
   */
  registerUserJwtInvalidInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40106,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: '系統偵測已重複登入，請重新登入。',
  },
  /**
   * @description 連線逾時，無 Token
   */
  registerUserJwtNotExistInfo: {
    statusCode: StatusCodes.UNAUTHORIZED,
    code: 40107,
    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    message: '連線逾時，無 Token',
  },
  /**
   * @description 人員已存在，勿重複新增。
   */
  createUserFailedUserIsExistInfo: {
    statusCode: StatusCodes.EXPECTATION_FAILED,
    code: 41701,
    error: getReasonPhrase(StatusCodes.EXPECTATION_FAILED),
    message: '人員已存在，勿重複新增。',
  },
  /**
   * @description 此休假資料已存在，請重新填寫欄位，或是刪除已存在的休假後再重新新增。
   */
  createHolidayAgentFailedHolidayAgentIsExistInfo: {
    statusCode: StatusCodes.EXPECTATION_FAILED,
    code: 41702,
    error: getReasonPhrase(StatusCodes.EXPECTATION_FAILED),
    message:
      '此休假資料已存在，請重新填寫欄位，或是刪除已存在的休假後再重新新增。',
  },
  /**
   * @description 此飲水輪值人員資料已存在，勿重複新增。
   */
  createWaterShiftFailedWaterShiftIsExistInfo: {
    statusCode: StatusCodes.EXPECTATION_FAILED,
    code: 41703,
    error: getReasonPhrase(StatusCodes.EXPECTATION_FAILED),
    message: '此飲水輪值人員資料已存在，勿重複新增。',
  },
  /**
   * @description 此機房輪值人員資料已存在，勿重複新增。
   */
  createEngineShiftFailedEngineShiftIsExistInfo: {
    statusCode: StatusCodes.EXPECTATION_FAILED,
    code: 41704,
    error: getReasonPhrase(StatusCodes.EXPECTATION_FAILED),
    message: '此機房輪值人員資料已存在，勿重複新增。',
  },
  /**
   * @description 請先將該人員在「休假管理」、「飲水輪值管理」和「機房輪值管理」中的資料刪除，再刪除該人員。
   */
  deleteUserFailedOtherRelatedDataIsExistInfo: {
    statusCode: StatusCodes.EXPECTATION_FAILED,
    code: 41705,
    error: getReasonPhrase(StatusCodes.EXPECTATION_FAILED),
    message:
      '請先將該人員在「休假管理」、「飲水輪值管理」和「機房輪值管理」中的資料刪除，再刪除該人員。',
  },
  /**
   * @description 該帳號不存在，請重新輸入。
   */
  createUserFailedUserAdIDNotExistInfo: {
    statusCode: StatusCodes.EXPECTATION_FAILED,
    code: 41706,
    error: getReasonPhrase(StatusCodes.EXPECTATION_FAILED),
    message: '該帳號不存在，請重新輸入。',
  },
  /**
   * @description 無訪問權限。
   */
  permissionDeniedInfo: {
    statusCode: StatusCodes.FORBIDDEN,
    code: 40301,
    error: getReasonPhrase(StatusCodes.FORBIDDEN),
    message: '無訪問權限。',
  },
};
