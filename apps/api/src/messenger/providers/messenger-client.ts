import { FactoryProvider, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export type { MessengerClient } from 'messaging-api-messenger';
import { MessengerClient } from 'messaging-api-messenger';
import { isDev } from '@App/utiliies';

const KEY = 'MessengerClient';

let cont = 0;
export const messenger_provider: FactoryProvider<any> = {
  provide: KEY,
  useFactory: (configService: ConfigService) => {
    const token = configService.get('FACEBOOK_TOKEN');
    const appSecret = configService.get('APP_SECRET');
    const appId = configService.get('APP_ID');

    const client = new MessengerClient({
      accessToken: token,
      appId: appId,
      appSecret: appSecret,
      skipAppSecretProof: isDev,
    });
    client.axios.interceptors.request.use((config) => {
      console.log('interceptors request');
      console.log(config.url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ++cont;
      console.log('request count: ' + cont);

      return config;
    });
    return client;
  },
  inject: [ConfigService],
};

export const InjectMessenger = () => {
  return Inject(KEY);
};
