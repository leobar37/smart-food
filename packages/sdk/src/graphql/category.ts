import { gql } from 'graphql-request';
export const buildCategoryFragment = () => {
  return gql`
    fragment categoryFragment on Category {
      id
      name
      productsCount
    }
  `;
};

export const buildGetCategoriesDocument = () => {
  return gql`
    ${buildCategoryFragment()}
    query getCategories {
      categories {
        ...categoryFragment
      }
    }
  `;
};
