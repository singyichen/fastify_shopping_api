/**
 * @description order 資料格式驗證
 */
const orderSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
    customerId: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'customerId'],
};

module.exports = orderSchema;
