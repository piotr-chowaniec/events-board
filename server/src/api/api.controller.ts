import { Controller, Get } from '@nestjs/common';

import { Public } from './common/decorators/public.decorator';
import { ConfigService, ConfigKeys } from './common/config/config.service';

@Controller('api')
export class ApiController {
  constructor(private readonly configService: ConfigService) {}

  @Public()
  @Get('healthcheck')
  findAll() {
    return {
      message: `events-board API is working at port ${this.configService.get(
        ConfigKeys.PORT,
      )}`,
    };
  }
}
