import { createClient } from '@supabase/supabase-js';
import { FactoryProvider, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type SupabaseClient = ReturnType<typeof createClient>;

export const supaseProvier: FactoryProvider<any> = {
  provide: 'SUPABASE_CLIENT',
  useFactory: (config: ConfigService) => {
    const url = config.get('SUPABASE_URL');
    const key = config.get('SUPABASE_KEY');
    const client = createClient(url, key);
    return client;
  },
  inject: [ConfigService],
};

export const InjectSupabase = () => Inject('SUPABASE_CLIENT');
