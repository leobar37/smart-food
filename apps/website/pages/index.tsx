import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Component } from '@smartfood/ui';
import { Box } from '@chakra-ui/react';
import { myUtil } from '@smartfood/common';

const Home: NextPage = () => {
  return (
    <Box>
      <Component />
      {myUtil()}
    </Box>
  );
};

export default Home;
