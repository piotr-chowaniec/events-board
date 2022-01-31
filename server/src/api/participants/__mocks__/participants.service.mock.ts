export const getParticipant = (
  index: number,
  userIndex: number,
  eventIndex: number,
) => ({
  id: index,
  userId: `user-${userIndex}`,
  eventId: `event-${eventIndex}`,
});

const participantNo1 = getParticipant(1, 1, 1);
const participantNo2 = getParticipant(2, 1, 2);
const participantNo3 = getParticipant(3, 2, 1);
const participantNo4 = getParticipant(3, 2, 2);
const participantNo5 = getParticipant(3, 2, 3);

export const participants = [
  participantNo1,
  participantNo2,
  participantNo3,
  participantNo4,
  participantNo5,
];

export const mockFindUnique = ({
  where: {
    ['userId_eventId']: { userId, eventId },
  },
}) =>
  Promise.resolve(
    participants.find(
      (participant) =>
        participant.userId === userId && participant.eventId === eventId,
    ),
  );

export const mockFindMany = ({
  where: { userId, eventId },
}: {
  where: { userId?: string; eventId?: string };
}) =>
  Promise.resolve(
    participants.filter(
      (participant) =>
        (userId ? participant.userId === userId : true) &&
        (eventId ? participant.eventId === eventId : true),
    ),
  );

export const mockCreate = ({ data }) =>
  Promise.resolve({
    id: 'new-participant-id',
    ...data,
  });

export const participantsServiceMock = {
  find: jest.fn().mockImplementation((userId: string, eventId: string) =>
    mockFindUnique({
      where: {
        ['userId_eventId']: { userId, eventId },
      },
    }),
  ),
  findMany: jest.fn().mockImplementation(() => Promise.resolve(participants)),
  create: jest
    .fn()
    .mockImplementation((participant) => mockCreate({ data: participant })),
  delete: jest.fn().mockImplementation((userId: string, eventId: string) => ({
    userId,
    eventId,
  })),
};
