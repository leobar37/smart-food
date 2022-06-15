import { config } from '@keystone-6/core';
import { lists } from './src/schema';
import { withAuth, session } from './src/auth';
import { insertSeedData } from './seed-data';
export default withAuth(
  config({
    server: {
      port: 5000,
      cors : {
        origin : "*"
      }
    },
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL ?? '',
      onConnect: async (context) => {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context);
        }
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  }),
);
