import { Controller, Get } from '@nestjs/common';

import config from '../config';

import { Public } from './common/decorators/public.decorator';

@Controller('api')
export class ApiController {
  @Public()
  @Get('healthcheck')
  findAll() {
    return {
      message: `events-board API is working at port ${config.port}`,
    };
  }
}
