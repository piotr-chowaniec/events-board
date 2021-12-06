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
      nickName: 'Adm',
      events: {
        create: {
          title: 'First Event',
          description: 'Event Description',
          eventDate: new Date(),
        },
      },
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
