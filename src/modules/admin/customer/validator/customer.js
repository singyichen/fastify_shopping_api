/**
 * @description customer 資料格式驗證
 */
const customerSchema = {
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
    address: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'email', 'name', 'address'],
};

module.exports = customerSchema;
