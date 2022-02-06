export const authServiceMock = {
  validateUser: jest.fn(),
  getUserRole: jest.fn(),
  login: jest.fn(),
  register: jest.fn().mockImplementation((newUser) => newUser),
};
