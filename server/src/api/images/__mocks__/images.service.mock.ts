export const userImage = {
  id: '1',
  userId: 'user-1',
  eventId: null,
  cloudNam: 'cloud',
  publicId: 'publicId-1',
  version: 'version-1',
  format: '.jpg',
};

export const eventImage = {
  id: '2',
  userId: null,
  eventId: 'event-1',
  cloudNam: 'cloud',
  publicId: 'publicId-2',
  version: 'version-2',
  format: '.jpg',
};

export const images = [userImage, eventImage];

export const mockFindUnique = ({ where: { userId, eventId } }) =>
  images.find((image) => image.userId === userId || image.eventId === eventId);

export const mockCreate = ({ data }) => ({
  id: 'new-image-id',
  ...data,
});

export const imagesServiceMock = {
  findOne: jest.fn().mockImplementation((userId?: string, eventId?: string) =>
    mockFindUnique({
      where: {
        userId,
        eventId,
      },
    }),
  ),
  create: jest
    .fn()
    .mockImplementation((file, params) => mockCreate({ data: params })),
  remove: jest.fn().mockImplementation((userId?: string, eventId?: string) => ({
    userId,
    eventId,
  })),
};
