/**
 * @description res 的數據模型
 */

/**
 * @description 基礎模塊
 */
class BaseResponse {
  constructor({
    data,
    statusCode,
    code,
    error,
    error_title,
    message,
    dateTime,
  }) {
    this.code = code;
    this.dateTime = dateTime;
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (data) {
      this.data = data;
    }
    if (error) {
      this.error = error;
    }
    if (error_title) {
      this.error_title = error_title;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * @description 成功的 res 數據模型
 */
class SuccessResponse extends BaseResponse {
  constructor(statusCode, data, dateTime) {
    super({
      statusCode,
      data,
      dateTime,
    });
  }
}

/**
 * @description 失敗的 res 數據模型
 */
class ErrorResponse extends BaseResponse {
  constructor(errorInfo, dateTime) {
    super({
      statusCode: errorInfo.statusCode,
      code: errorInfo.code,
      error: errorInfo.error,
      error_title: errorInfo.error_title,
      message: errorInfo.message,
      dateTime,
    });
  }
}

module.exports = {
  SuccessResponse,
  ErrorResponse,
};
