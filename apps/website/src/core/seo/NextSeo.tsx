import { NextSeo, NextSeoProps } from 'next-seo';
import { FC } from 'react';
import * as React from 'react';
import { ReactNode } from 'react-markdown/lib/react-markdown';

const defaultSeo = {
  titleTemplate: 'Smart Food | %s',
  title: 'Home',
  description: '',
  openGraph: {
    url: '',
    title: 'Smart Food',
    description: '',
    images: [
      // {
      //   url: 'www.wellnesspro24.com/wellness.png',
      //   width: 190,
      //   height: 90,
      //   alt: 'Wellness Pro',
      //   type: 'image/png',
      // },
    ],
  },
} as NextSeoProps;

export const SmartFoodSeo: FC<{
  seo?: Partial<NextSeoProps>;
}> = ({ seo }) => {
  return <NextSeo {...Object.assign({}, defaultSeo, seo || {})} />;
};
