/**
 * @description findOneCustomer 資料格式驗證
 */
const findOneCustomerSchema = {
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
  },
  required: ['executor_id', 'email'],
};

module.exports = findOneCustomerSchema;
