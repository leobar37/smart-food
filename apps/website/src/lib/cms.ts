import { ClientV2 } from '@smartfood/client/V2';

const client = new ClientV2({
  endpoint: 'http://localhost:5000/api/graphql',
});

export default client;
