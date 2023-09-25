/**
 * @description logout 資料格式驗證
 */
const logoutSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['id'],
};

module.exports = logoutSchema;
