/**
 * @description getPermissionsForUser 資料格式驗證
 */
const getPermissionsForUserSchema = {
  type: 'object',
  properties: {
    executor_id: {
      type: 'string',
      minLength: 0,
    },
    role: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'role'],
};

module.exports = getPermissionsForUserSchema;
