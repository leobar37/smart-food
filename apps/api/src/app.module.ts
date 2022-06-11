import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { twiloProvider } from '@App/providers';
import { CoreModule } from './core';
// Controllers
import { ApiModule } from '@App/api';
import { MessengerModule } from './messenger';
import { CoreModule as ColModule } from '@smartfood/core';

const CONTROLLERS = [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    MessengerModule,
    ApiModule,
    CoreModule,
    ColModule,
  ],
  controllers: [...CONTROLLERS],
  providers: [AppService, twiloProvider],
})
export class AppModule {}
