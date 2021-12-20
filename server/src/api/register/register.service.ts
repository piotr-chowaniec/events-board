import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  register(body) {
    console.log(body);

    return {
      message: 'Say Hello from register service',
    };
  }
}
