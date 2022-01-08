import { Prisma } from '@common-packages/data-access-layer';

import { hashPassword } from '../passwordHashing';

export const encryptPassword: Prisma.Middleware = async (
  params: Prisma.MiddlewareParams,
  next,
) => {
  // Hash user password on create
  if (params.action === 'create' && params.model === 'User') {
    const user = params.args.data;
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  }

  // Hash user password on update
  if (params.action === 'update' && params.model === 'User') {
    const user = params.args.data;
    if (user.password) {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
    }
  }

  return await next(params);
};
