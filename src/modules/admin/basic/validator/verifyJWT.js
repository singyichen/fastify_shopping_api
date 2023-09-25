/**
 * @description verifyJWT 資料格式驗證
 */
const verifyJWTSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['token'],
};

module.exports = verifyJWTSchema;
