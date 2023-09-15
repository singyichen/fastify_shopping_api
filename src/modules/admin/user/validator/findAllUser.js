/**
 * @description findOneUser 資料格式驗證
 */
const findOneUserSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id'],
};

module.exports = findOneUserSchema;
