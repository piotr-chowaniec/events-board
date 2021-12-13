import { Controller, Get } from '@nestjs/common';

import config from '../config';

@Controller('api')
export class ApiController {
  @Get('healthcheck')
  findAll() {
    return {
      message: `events-board API is working at port ${config.port}`,
    };
  }
}
