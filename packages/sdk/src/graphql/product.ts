export type ProductResponseType = 'product-with-options' | 'product-only';

export const getProductFragment = (type: ProductResponseType) => {
  const options =
    type == 'product-with-options'
      ? `
options {
id
name
limit
subOptions {
 id
  name
}
} 
`
      : '';

  return `
  fragment ProductFragment on Product{
      id 
     photo {
       publicUrl
       publicUrlTransformed
       originalFilename
       filename
       id
     }
    ${options}
      name
     price
     count
   } 
  `;
};

export type GetProductsParams = {
  responseType: ProductResponseType;
  categoryId?: string;
};
export const buildGetProductsDocument = (params: GetProductsParams) => {
  const { responseType } = Object.assign(
    { responseType: 'product-only' } as GetProductsParams,
    params,
  );
  let filters = [];
  if (params?.categoryId) {
    filters.push(` category:  {
      id : {
        equals : "${params.categoryId}"
      }
    }`);
  }
  const filterWhere = `where : {
    ${filters.join(' ')}
  }`;

  return `
  ${getProductFragment(responseType)}
  query getProducts {
    products (${filterWhere}) {
         ...ProductFragment
    }
  }
    `;
};
