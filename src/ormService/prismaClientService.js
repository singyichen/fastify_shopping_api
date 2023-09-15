/**
 * @description ORM
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log(e);
});

prisma.$on('error', (e) => {
  console.log(e);
});

const prismaClientService = {
  prisma,
};

module.exports = prismaClientService;
