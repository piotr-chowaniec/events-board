import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@common-packages/data-access-layer';

import { ConfigService, ConfigKeys } from '../config/config.service';

import { encryptPassword } from './prisma.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get(ConfigKeys.DATABASE_URL),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(encryptPassword);
  }

  async enableShuttownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
