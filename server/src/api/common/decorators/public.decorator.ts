import { SetMetadata } from '@nestjs/common';

import config from '../../../config';

export const Public = () =>
  SetMetadata(config.authentication.isPublicKey, true);
