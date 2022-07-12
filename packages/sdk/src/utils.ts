import { GraphQLError } from 'graphql';
import { SmartClientError } from './error';

export const formatError = (data: any) => {
  if ('errors' in data) {
    const errors: GraphQLError[] = Array.isArray(data?.errors)
      ? data.errors
      : [data.errors];
    const message = errors.map((error) => error?.message ?? '').join('\n');
    throw new SmartClientError(message);
  }
};
