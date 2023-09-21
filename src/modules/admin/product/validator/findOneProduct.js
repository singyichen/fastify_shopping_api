/**
 * @description findOneProduct 資料格式驗證
 */
const findOneProductSchema = {
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
  },
  required: ['executor_id', 'id'],
};

module.exports = findOneProductSchema;
