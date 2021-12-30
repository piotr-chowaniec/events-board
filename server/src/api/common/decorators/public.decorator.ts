import { SetMetadata } from '@nestjs/common';

import { config, ConfigKeys } from '../config/config.service';

export const Public = () => SetMetadata(config[ConfigKeys.PUBLIC_KEY], true);
