/**
 * @description enforcer plugin
 */

const { newEnforcer } = require('casbin');
const createCasbinConfig = require('../../config/casbinConfig');

async function createEnforcer() {
  const options = await createCasbinConfig();
  const enforcer = await newEnforcer(options.model, options.adapter);
  return enforcer;
}

module.exports = createEnforcer;
