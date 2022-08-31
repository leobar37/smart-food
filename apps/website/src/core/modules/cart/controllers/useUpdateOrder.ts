import cms from '@App/core/lib/cms';
import { useMutation } from 'react-query';
import { CreateOrderArgs } from '@smartfood/client/v2';

export const useUpdateOrder = () => {
  return useMutation(async (args: CreateOrderArgs) => {
    const result = await cms.order.update(args);
    return result;
  });
};
