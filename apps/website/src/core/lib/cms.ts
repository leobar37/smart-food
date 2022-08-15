import { ClientV2 } from '@smartfood/client/v2';
import { isDev } from '@smartfood/common';

const client = new ClientV2({
  endpoint: isDev
    ? 'http://localhost:5000/api/graphql'
    : 'https://app.smarfood.com/api/graphql',
});

export default client;
