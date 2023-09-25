/**
 * @description updateOneUser 資料格式驗證
 */
const updateOneUserSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
    id: {
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
  required: ['executor_id', 'id', 'email', 'name', 'password'],
};

module.exports = updateOneUserSchema;
