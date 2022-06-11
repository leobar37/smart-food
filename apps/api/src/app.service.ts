import { Injectable } from '@nestjs/common';
import { CoreService } from '@smartfood/core';
@Injectable()
export class AppService {
  constructor(private coreService: CoreService) {
    this.coreService.ping();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
