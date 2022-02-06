import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@events.com' },
    update: {},
    create: {
      email: 'admin@events.com',
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'Admin',
      password: 'password',
      events: {
        create: {
          title: 'First Event',
          description: 'Event Description',
          eventDate: new Date(),
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'piotr@events.com' },
    update: {},
    create: {
      email: 'piotr@events.com',
      role: 'USER',
      firstName: 'Piotr',
      lastName: 'Chowaniec',
      password: '123',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
