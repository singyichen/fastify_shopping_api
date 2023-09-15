/**
 * @description deleteRoleForUser 資料格式驗證
 */
const deleteRoleForUserSchema = {
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
    role: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'id', 'role'],
};

module.exports = deleteRoleForUserSchema;
