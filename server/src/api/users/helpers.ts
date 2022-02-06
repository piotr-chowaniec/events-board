export const mapUserToResponse = (user) => ({
  ...user,
  password: 'encrypted',
});
