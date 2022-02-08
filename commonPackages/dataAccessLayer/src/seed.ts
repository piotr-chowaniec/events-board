import { PrismaClient } from '@prisma/client';

import { truncate, seed } from './helpers';

const prisma = new PrismaClient();

async function main() {
  await truncate(prisma);
  await seed(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
