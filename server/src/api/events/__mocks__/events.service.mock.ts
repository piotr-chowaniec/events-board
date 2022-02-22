export const getEvent = (index: number, userIndex: number) => ({
  id: String(index),
  userId: `user-${userIndex}`,
  title: `event-title-${index}`,
  description: `event-description-${index}`,
  shortDescription: `event-short-description-${index}`,
  status: 'PUBLISHED',
  eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // now + 1 day
});

const eventNo1 = getEvent(1, 1);
const eventNo2 = getEvent(2, 1);
const eventNo3 = getEvent(3, 2);
const eventNo4 = getEvent(4, 2);
const eventNo5 = getEvent(5, 3);
const eventNo6 = getEvent(6, 1);
eventNo6.status = 'DRAFT';

export const events = [
  eventNo1,
  eventNo2,
  eventNo3,
  eventNo4,
  eventNo5,
  eventNo6,
];

export const mockFindUnique = ({ where: { id: eventId } }) =>
  Promise.resolve(events.find((event) => event.id === eventId));

export const mockFindMany = ({
  where: { id, userId, status },
}: {
  where: { id?: string; userId?: string; status?: string };
}) =>
  Promise.resolve(
    events.filter(
      (event) =>
        (id ? event.id === id : true) &&
        (userId ? event.userId === userId : true) &&
        (status ? event.status === status : true),
    ),
  );

export const mockCount = (filters) =>
  Promise.resolve()
    .then(() => mockFindMany(filters))
    .then((result) => result.length);

export const mockCreate = ({ data }) =>
  Promise.resolve({
    ...data,
    id: 'new-event-id',
  });

export const mockUpdate = ({ where: { id: eventId }, data }) =>
  new Promise((resolve) => {
    const eventToUpdate = events.find((event) => event.id === eventId);
    if (!eventToUpdate) {
      return;
    }

    resolve({
      ...eventToUpdate,
      ...data,
      id: eventToUpdate.id,
    });
  });

export const eventsServiceMock = {
  count: jest
    .fn()
    .mockImplementation((filters) => mockCount({ where: filters })),
  findMany: jest
    .fn()
    .mockImplementation((skip, take, filters) =>
      mockFindMany({ where: filters }),
    ),
  find: jest.fn().mockImplementation((eventId) =>
    mockFindUnique({
      where: {
        id: eventId,
      },
    }),
  ),
  create: jest.fn().mockImplementation((event) => mockCreate({ data: event })),
  update: jest
    .fn()
    .mockImplementation((eventId: string, event) =>
      mockUpdate({ where: { id: eventId }, data: event }),
    ),
  updateStatus: jest
    .fn()
    .mockImplementation((eventId: string, event) =>
      mockUpdate({ where: { id: eventId }, data: event }),
    ),
  delete: jest.fn().mockImplementation((eventId: string) => ({
    eventId,
  })),
};
