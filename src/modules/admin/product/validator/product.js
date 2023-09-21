/**
 * @description product 資料格式驗證
 */
const productSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
    name: {
      type: 'string',
      minLength: 0,
    },
    description: {
      type: 'string',
      minLength: 0,
    },
    price: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'name', 'description', 'price'],
};

module.exports = productSchema;
