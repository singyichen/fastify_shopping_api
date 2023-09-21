/**
 * @description orderItem 資料格式驗證
 */
const orderItemSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
    orderId: {
      type: 'string',
      minLength: 0,
    },
    productId: {
      type: 'string',
      minLength: 0,
    },
    quantity: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'orderId', 'productId', 'quantity'],
};

module.exports = orderItemSchema;
