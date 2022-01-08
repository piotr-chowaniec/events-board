import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => bcrypt.compare(password, hashedPassword);
