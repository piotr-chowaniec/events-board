import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // await prisma.user.upsert({
  //   where: { email: 'admin@events.com' },
  //   update: {},
  //   create: {
  //     email: 'admin@events.com',
  //     role: 'ADMIN',
  //     firstName: 'Admin',
  //     lastName: 'Admin',
  //     password: 'password',
  //     events: {
  //       create: {
  //         title: 'First Event',
  //         description: 'Event Description',
  //         eventDate: new Date(),
  //       },
  //     },
  //   },
  // });

  // await prisma.user.upsert({
  //   where: { email: 'piotr@events.com' },
  //   update: {},
  //   create: {
  //     email: 'piotr@events.com',
  //     role: 'USER',
  //     firstName: 'Piotr',
  //     lastName: 'Chowaniec',
  //     password: '123',
  //   },
  // });

  await prisma.event.createMany({
    data: [
      {
        userId: 'ckyg4fen00000c4mvbvywcohq',
        title: 'Event - 1',
        eventDate: new Date(),
        shortDescription: 'Event short description',
        description: 'Event description',
      },
      {
        userId: 'ckyg4fen00000c4mvbvywcohq',
        title: 'Event - 2',
        eventDate: new Date(),
        shortDescription: 'Event short description',
        description: 'Event description',
      },
      {
        userId: 'ckyg4fen00000c4mvbvywcohq',
        title: 'Event - 3',
        eventDate: new Date(),
        shortDescription: 'Event short description',
        description: 'Event description',
      },
      {
        userId: 'ckyg4fen00000c4mvbvywcohq',
        title: 'Event - 4',
        eventDate: new Date(),
        shortDescription: 'Event short description',
        description: 'Event description',
      },
      {
        userId: 'ckyg4fen00000c4mvbvywcohq',
        title: 'Event - 5',
        eventDate: new Date(),
        shortDescription: 'Event short description',
        description: 'Event description',
      },
    ],
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
