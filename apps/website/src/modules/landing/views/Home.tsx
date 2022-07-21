import { NextPage } from 'next';
import Header from '../components/home/header';
import { ArmedProducts, ProductsLine } from '../shared';
import { useCategoriesWithProducts } from '../controllers';
import { Product } from '@smartfood/client/v2';
import { PRODUCTS_FOR_BUILD_ID } from '../constants';
import { LandingLayout } from '../landingLayout';
const HomePage: NextPage = () => {
  const { data: categoryData } = useCategoriesWithProducts();

  const linesInHome = categoryData
    ?.filter((d) => d.id !== PRODUCTS_FOR_BUILD_ID)
    .map((category) => {
      return (
        <ProductsLine
          key={category.id}
          title={category.title as string}
          description={category.description as string}
          products={category.products as Product[]}
        />
      );
    });

  return (
    <LandingLayout>
      <Header />
      <ArmedProducts />
      {linesInHome}
    </LandingLayout>
  );
};

export default HomePage;
