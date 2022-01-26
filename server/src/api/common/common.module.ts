import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule, PrismaModule, CloudinaryModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class CommonModule {}
