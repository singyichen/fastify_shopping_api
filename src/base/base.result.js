/**
 * @description result 的數據模型
 */

/**
 * @description 基礎模塊
 */
class BaseResult {
  constructor({ data, result, message }) {
    this.result = result;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * @description 成功的 result 數據模型
 */
class SuccessResult extends BaseResult {
  constructor(result, data) {
    super({
      result,
      data,
    });
  }
}

/**
 * @description 失敗的 result 數據模型
 */
class ErrorResult extends BaseResult {
  constructor(result, message) {
    super({
      result,
      message,
    });
  }
}

module.exports = {
  SuccessResult,
  ErrorResult,
};
