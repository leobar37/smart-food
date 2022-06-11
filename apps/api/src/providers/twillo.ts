import { FactoryProvider, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

export type Client = ReturnType<typeof twilio>;
export const TWILIO_KEY = 'TWILIO';

export const twiloProvider: FactoryProvider<any> = {
  provide: TWILIO_KEY,
  useFactory: (configService: ConfigService) => {
    const SID = configService.get('TWILIO_ACCOUNT_SID');
    const TOKEN = configService.get('TWILIO_AUTH_TOKEN');
    const client = twilio(SID, TOKEN);
    return client;
  },
  inject: [ConfigService],
};

export const InjectTwilio = () => {
  return Inject(TWILIO_KEY);
};
