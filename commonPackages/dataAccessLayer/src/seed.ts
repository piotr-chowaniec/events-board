import { EventStatus, PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import _ from 'lodash';

const prisma = new PrismaClient();

const adminPassword =
  '$2a$10$YDNKDF5T1IixouXX5JjwJeQh6TuN2aFi7XYobjSZZu61KqhI0PKYS'; // notSoSecretPassword
const userPassword =
  '$2a$10$IYnB6mSE28Rv8Rbyk0mQueMUr8I2QGMGhXEamfmUQCi7SPxLfcpFy'; //someNotSoRandomPassword

export async function truncate(p: typeof prisma) {
  await p.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
  await p.$executeRaw`TRUNCATE TABLE events RESTART IDENTITY CASCADE;`;
  await p.$executeRaw`TRUNCATE TABLE participants RESTART IDENTITY CASCADE;`;
  await p.$executeRaw`TRUNCATE TABLE images RESTART IDENTITY CASCADE;`;
}

export async function seed(p: typeof prisma) {
  try {
    await p.user.create({
      data: {
        email: 'admin@events.com',
        role: Role.ADMIN,
        firstName: 'Mario',
        lastName: 'Bros',
        password: adminPassword,
      },
    });

    // CREATE USERS

    const usersInput = Array.from(Array(10).keys()).map((index) => ({
      email: `user_${index + 1}@events.com`,
      role: Role.USER,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: userPassword,
    }));

    await p.user.createMany({
      data: usersInput,
    });

    const users = await p.user.findMany({
      select: {
        id: true,
      },
    });

    // CREATE EVENTS

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const nextYear = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const eventsInput = _.flatMap(
      users.map((user) =>
        Array.from(Array(3).keys()).map((index) => {
          const isPublished = _.sample([true, true, true, false]);

          return {
            userId: user.id,
            title: faker.lorem.words(4),
            eventDate: faker.date.between(tomorrow, nextYear),
            shortDescription: faker.lorem.sentence(),
            description: faker.lorem.paragraphs(10),
            status: isPublished ? EventStatus.PUBLISHED : EventStatus.DRAFT,
          };
        }),
      ),
    );

    await p.event.createMany({
      data: eventsInput,
    });

    const events = await p.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    // CREATE PARTICIPANTS

    const participantsInput = users.reduce(
      (acc: { userId: string; eventId: string }[], user) => {
        const notUserEVents = events.filter(
          (event) => event.userId !== user.id,
        );

        for (const event of notUserEVents) {
          const isGoing = _.sample([true, false, false]);
          if (isGoing) {
            acc.push({
              userId: user.id,
              eventId: event.id,
            });
          }
        }

        return acc;
      },
      [],
    );

    await p.participant.createMany({
      data: participantsInput,
    });
  } catch (error) {
    console.error(error);
  }
}

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
