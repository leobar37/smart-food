import { Category } from '@smartfood/client/v2';

export const flatternCategories = (categories: Category[]) => {
  const products = categories
    ?.map((ca) => ca.products?.map((pr) => Object.assign(pr, { category: ca })))
    .flat();
  return products ?? [];
};
