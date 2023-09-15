/**
 * @description deletePermissionForUser 資料格式驗證
 */
const deletePermissionForUserSchema = {
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
    feature: {
      type: 'string',
      minLength: 0,
    },
    method: {
      type: 'string',
      minLength: 0,
    },
  },
  required: ['executor_id', 'role', 'feature', 'method'],
};

module.exports = deletePermissionForUserSchema;
