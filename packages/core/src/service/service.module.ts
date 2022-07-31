import { ProductService } from './services/Product.service';
import { Module } from '@nestjs/common';
import { messengerProvider } from '../common/providers/messeger';
import { supaseProvier } from '../common/providers';

@Module({
  providers: [ProductService, messengerProvider, supaseProvier],
  exports: [ProductService, messengerProvider, supaseProvier],
})
export class ServiceModule {}
