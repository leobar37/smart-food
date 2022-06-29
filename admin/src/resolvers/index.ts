import { extendType, stringArg } from 'nexus';
export const PingQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('ping', {
      args: {},
      type: 'String',
      resolve: () => 'pong',
    });
  },
});
