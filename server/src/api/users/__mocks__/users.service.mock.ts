import { Role } from '../../common/types';
import { mapUserToResponse } from '../helpers';

export const getUser = (index: number) => ({
  id: String(index),
  email: `user-${index}@users.com`,
  password: '$2b$10$bjuij5pOYfbK6jrVSxvT6eOzsMGzAmcPwv4DTn1DoGKU.syiNtqLW', // password: some-password
  firstName: `user-${index}-firstName`,
  lastName: `user-${index}-lastName`,
  role: Role.USER,
});

const userNo1 = getUser(1);
const userNo2 = getUser(2);
const userNo3 = getUser(3);

export const users = [userNo1, userNo2, userNo3];

export const mockFindUnique = ({
  where: { id: userId, email },
}: {
  where: { id?: string; email?: string };
}) =>
  Promise.resolve(
    users.find(
      (user) =>
        (userId ? user.id === userId : true) &&
        (email ? user.email === email : true),
    ),
  );

export const mockFindMany = () => Promise.resolve(users);
export const mockCount = () => Promise.resolve(users.length);

export const mockCreate = ({ data }) =>
  Promise.resolve({
    ...data,
    id: 'new-user-id',
  });

export const mockUpdate = ({ where: { id: userId }, data }) =>
  new Promise((resolve) => {
    const userToUpdate = users.find((user) => user.id === userId);

    if (!userToUpdate) {
      return;
    }

    resolve({
      ...userToUpdate,
      ...data,
      id: userToUpdate.id,
    });
  });

export const usersServiceMock = {
  count: jest.fn().mockImplementation(mockCount),
  findMany: jest.fn().mockImplementation(async () => {
    const allUsers = await mockFindMany();

    return allUsers.map(mapUserToResponse);
  }),
  findOne: jest
    .fn()
    .mockImplementation(({ email }) => mockFindUnique({ where: { email } })),
  findOneWithPassword: jest
    .fn()
    .mockImplementation(({ email }) => mockFindUnique({ where: { email } })),
  findUserName: jest.fn().mockImplementation(async ({ userId }) => {
    const user = await mockFindUnique({ where: { id: userId } });

    if (!user) {
      return;
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }),
  create: jest.fn().mockImplementation((user) => mockCreate({ data: user })),
  update: jest
    .fn()
    .mockImplementation(({ userId }: { userId: string }, user) =>
      mockUpdate({ where: { id: userId }, data: user }),
    ),
  updatePassword: jest.fn(),
  remove: jest.fn(),
};
