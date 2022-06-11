import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { CoreModule } from '@smartfood/core';

@Module({
  imports: [CoreModule],
  controllers: [ApiController],
})
export class ApiModule {}
