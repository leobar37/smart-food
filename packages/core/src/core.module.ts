import { Module, Global } from '@nestjs/common';
import { MessengerModule } from './messenger';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MessengerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
  ],
  providers: [],
})
export class CoreModule {}
