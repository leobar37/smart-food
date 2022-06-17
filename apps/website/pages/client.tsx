/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react';
import { Component } from '@smartfood/ui';
import type { NextPage } from 'next';
import { Client } from '@smartfood/client';
import { useMemo, useEffect } from 'react';

const Home: NextPage = () => {
  // const client = useMemo(
  //   () =>
  //     new Client({
  //       endpoint: 'http://localhost:5000/api/graphql',
  //     }),
  //   [],
  // );
  // useEffect(() => {
  //   (async () => {
  //     // const products = await client.getProducts({
  //     //   responseType: 'product-with-options',
  //     // });
  //     // const categories = await client.getCategories();

  //     // const productByCategory = await client.getProducts({
  //     //   responseType: 'product-only',
  //     //   categoryId: categories[0].id,
  //     // });
  //     // // const orderEmpty = await  client.patchOrder();

  //     // console.log({
  //     //   products,
  //     //   categories,
  //     //   productByCategory,
  //     //   // orderEmpty
  //     // });
  //   })();
  // }, []);

  return <Box></Box>;
};

export default Home;
