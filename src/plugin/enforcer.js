/**
 * @description enforcer plugin
 */

const { newEnforcer } = require('casbin');
const { join } = require('path');
const { PrismaAdapter } = require('casbin-prisma-adapter');
const prismaClientService = require('../ormService/prismaClientService');
async function createEnforcer() {
  const model = join(__dirname, '../casbin/rbac', 'rbac_model.conf');
  const adapter = await PrismaAdapter.newAdapter(prismaClientService.prisma);
  const enforcer = await newEnforcer(model, adapter);
  return enforcer;
}

module.exports = createEnforcer;
