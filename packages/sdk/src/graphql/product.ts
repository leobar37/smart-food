export type ProductResponseType = 'product-with-options' | 'product-only';

export const getProductFragment = (type: ProductResponseType) => {
  const options =
    type == 'product-with-options'
      ? `
options {
id
name
limit
label
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
  productId?: string;
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
  if(params?.productId){
    filters.push(` id: {
      equals : "${params.productId}"
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

export type GetSubOptionsParams = {
  optionId: string;
}
export const buildgetSubOptionsDocument = () => {
  return `
  query getSubOptions($optionId : ID! ) {
    subOptions( where : {
     id :$id
   }){
    id
   name
 }
}
  `
}