import { ProductService } from './services/Product.service';
import { Module } from '@nestjs/common';
import { messengerProvider } from '../common/providers/messeger';
import { supaseProvier  ,sdkProvider } from '../common/providers';

const SHARED_PROVIDERS= [ProductService, messengerProvider, supaseProvier , sdkProvider]
@Module({
  providers: [...SHARED_PROVIDERS],
  exports: [...SHARED_PROVIDERS],
})
export class ServiceModule {}
