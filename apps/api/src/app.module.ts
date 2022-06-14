import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@smartfood/core';
// Controllers
import { ApiModule } from '@App/api';

const CONTROLLERS = [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    ApiModule,
    CoreModule,
  ],
  controllers: [...CONTROLLERS],
  providers: [AppService],
})
export class AppModule {}
