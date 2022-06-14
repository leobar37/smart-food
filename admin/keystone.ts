import { config } from '@keystone-6/core';
import { lists } from './src/schema';
import { withAuth, session } from './src/auth';

export default withAuth(
  config({
    server: {
      port: 5000,
    },
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL ?? '',
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  }),
);
