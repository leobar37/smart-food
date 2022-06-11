import { Module, Global } from '@nestjs/common';
import { supaseProvier } from './providers';
import { ProductBuildeableService } from './services';

const COMMON_PROVIDERS = [supaseProvier, ProductBuildeableService];

@Global()
@Module({
  imports: [],
  providers: [...COMMON_PROVIDERS],
  exports: [...COMMON_PROVIDERS],
})
export class CoreModule {}
