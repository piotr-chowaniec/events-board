import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

const basePath = '../../../client/build';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, basePath),
    }),
  ],
})
export class ClientModule {}
