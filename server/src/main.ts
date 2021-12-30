import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { config, ConfigKeys } from './api/common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config[ConfigKeys.PORT]);
}
bootstrap();
