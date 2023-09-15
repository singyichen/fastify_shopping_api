/**
 * @description addRoleForUser 資料格式驗證
 */
const addRoleForUserSchema = {
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

module.exports = addRoleForUserSchema;
