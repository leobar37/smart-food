export const buildCategoryFragment = () => {
  return `fragment categoryFragment on Category {
        id 
         name
        productsCount
      }
      `;
};

export const buildGetCategoriesDocument = () => {
  return `
  ${buildCategoryFragment()}  
  query getCategories {
        categories {
          ...categoryFragment    
        }
      }
    `;
};
