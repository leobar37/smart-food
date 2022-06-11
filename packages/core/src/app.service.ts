import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
  constructor() {}

  ping() {
    console.log('pong');

    return 'pong';
  }
}
