const { SuccessResponse, ErrorResponse } = require('./base.response');
const { StatusCodes } = require('http-status-codes');
/**
 * @description base controller
 */
class BaseController {
  /**
   * @description For select
   */
  respondOk(data, dateTime, response) {
    if (response) {
      response.body = this.respond(StatusCodes.OK, data, dateTime);
      return response.body;
    }
    return this.respond(StatusCodes.OK, data, dateTime);
  }

  /**
   * @description For create
   */
  respondCreated(id, dateTime, response) {
    if (response) {
      response.body = this.respond(StatusCodes.OK, { id }, dateTime);
      return response.body;
    }
    return this.respond(StatusCodes.OK, { id }, dateTime);
  }

  /**
   * @description For update or delete
   */
  respondNoContent(response, dateTime) {
    if (response) {
      response.body = this.respond(StatusCodes.OK, null);
      return response.body;
    }
    return this.respond(StatusCodes.OK, null, dateTime);
  }

  /**
   * @description For error
   */
  respondError(response, dateTime) {
    return new ErrorResponse(response, dateTime);
  }

  /**
   * @description For respond
   */
  respond(statusCode, data, dateTime) {
    return new SuccessResponse(statusCode, data, dateTime);
  }
}

module.exports = BaseController;
