import { config } from '@keystone-6/core';
import { lists } from './src/schema';
import { withAuth, session } from './src/auth';
import { insertSeedData } from './seed-data';
import { extendGraphqlSchema} from './src/resolvers/schema';


export default withAuth(
  config({
    extendGraphqlSchema: extendGraphqlSchema,
    server: {
      port: 5000,
      cors: {
        origin: '*',
      },
      extendExpressApp(app, createContext) {
        // TODO: Add your custom middleware here
        // app.use('/api/graphql', async (req, res, next) => {
        //   (req as any).context = await createContext(req, res);
        //   // next();
        //   console.log(req.headers);
        //   if (req.headers['test'] == 'uwu') {
        //     return res.status(400).send('not allow');
        //   } else {
        //     next();
        //   }
        // });
      },
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
