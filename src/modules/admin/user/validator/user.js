/**
 * @description user 資料格式驗證
 */
const userSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
    email: {
      type: 'string',
      minLength: 0,
      format: 'email',
    },
    name: {
      type: 'string',
      minLength: 0,
    },
    password: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'email', 'name', 'password'],
};

module.exports = userSchema;
