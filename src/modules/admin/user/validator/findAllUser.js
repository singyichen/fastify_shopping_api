/**
 * @description findAllUser 資料格式驗證
 */
const findAllUserSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id'],
};

module.exports = findAllUserSchema;
