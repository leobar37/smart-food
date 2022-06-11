import { Module } from '@nestjs/common';
import { CoreService } from './app.service';
export { CoreService } from './app.service';
@Module({
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
