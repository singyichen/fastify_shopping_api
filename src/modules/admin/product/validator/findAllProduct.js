/**
 * @description findAllProduct 資料格式驗證
 */
const findAllProductSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id'],
};

module.exports = findAllProductSchema;
