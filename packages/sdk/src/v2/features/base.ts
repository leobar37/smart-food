import { ClientV2 } from '../client';
export abstract class Feature {
  client: ClientV2;
  constructor(client: ClientV2) {
    this.client = client;
  }
}
