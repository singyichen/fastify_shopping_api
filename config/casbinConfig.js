/**
 * @description casbin config
 */

const { join } = require('path');
const { PrismaAdapter } = require('casbin-prisma-adapter');
const prismaClientService = require('../src/ormService/prismaClientService');
async function createCasbinConfig() {
  const model = join(__dirname, '../src/casbin/abac', 'abac_model.conf');
  const adapter = join(__dirname, '../src/casbin/abac', 'abac_policy.csv');
  // const adapter = await PrismaAdapter.newAdapter(prismaClientService.prisma);
  const options = {
    model: model, // the model configuration
    adapter: adapter, // the adapter
  };
  return options;
}

module.exports = createCasbinConfig;
