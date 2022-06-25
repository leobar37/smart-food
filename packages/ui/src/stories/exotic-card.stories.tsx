import { ComponentMeta } from '@storybook/react';
import { ExoticCard } from '../components/card';
export default {
  title: 'Components / ExoticCard',
} as ComponentMeta<any>;

export const Normal = () => {
  return <ExoticCard />;
};
