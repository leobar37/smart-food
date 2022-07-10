import { Client } from '@smartfood/client';

const client = new Client({
  endpoint: 'http://localhost:5000/api/graphql',
});
export default client;
