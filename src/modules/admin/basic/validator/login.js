/**
 * @description login 資料格式驗證
 */
const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 0,
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['email', 'password'],
};

module.exports = loginSchema;
