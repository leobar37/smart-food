import { BuildeableProduct } from '../types';

export const fitnessProduct: BuildeableProduct = {
  name: 'Smart bowl',
  options: [
    {
      name: 'base',
      label: 'Elige tu base',
      limit: 1,
      options: [
        {
          name: 'Arroz Sushi',
        },
        {
          name: 'Arroz Integral',
        },
        {
          name: 'Quinoa Multicolor',
        },
        {
          name: 'Mix Lechugas',
        },
      ],
    },
    {
      name: 'Proteína',
      label: 'Elige tu proteína',
      limit: 1,
      options: [
        {
          name: 'Filete de Pollo',
        },
        {
          name: 'Pollo Teriyaki- dulce',
        },
        {
          name: 'Salmón Marino',
        },
        {
          name: 'Atún Marinado',
        },
        {
          name: 'Toffu',
        },
      ],
    },
    // {
    //   name: 'Veggies',
    //   label: 'Elige tus veggies ( Hasta 4 opciones a elegir)',
    //   limit: 4,
    //   options: [
    //     {
    //       name: 'Palta',
    //     },
    //     {
    //       name: 'Choclo Americano',
    //     },
    //     {
    //       name: 'Tomate Cherry',
    //     },
    //     {
    //       name: 'Lechuga hidropónica',
    //     },
    //     {
    //       name: 'Col Morado',
    //     },
    //     {
    //       name: 'Zanahoria Rayada',
    //     },
    //     {
    //       name: 'Pepino Kyuri',
    //     },
    //     {
    //       name: 'Frijol Negro',
    //     },
    //     {
    //       name: 'Piña',
    //     },
    //     {
    //       name: 'Mango',
    //     },
    //   ],
    // },
    // {
    //   name: 'Salsas',
    //   label: 'Elige tus salsas (Hasta 2 opciones)',
    //   limit: 2,
    //   options: [
    //     {
    //       name: 'Acevichada - salada',
    //     },
    //     {
    //       name: 'Oriental',
    //     },
    //     {
    //       name: 'Teriyaki',
    //     },
    //     {
    //       name: 'Maracuyá - agridulce',
    //     },
    //     {
    //       name: 'Smart hot - picante',
    //     },
    //   ],
    // },
    // {
    //   name: 'Toppins',
    //   label: 'Elige tus Toppins (Puedes elegir hasta 3)',
    //   limit: 3,
    //   options: [
    //     {
    //       name: 'Ajonjolí',
    //     },
    //     {
    //       name: 'Canchita chulpi',
    //     },
    //     {
    //       name: 'Nori crocante',
    //     },
    //     {
    //       name: 'Coliflor Crocante',
    //     },
    //     {
    //       name: 'Aros de cebolla',
    //     },
    //     {
    //       name: 'Camote frito',
    //     },
    //   ],
    // },
  ],
  price: 24.5,
};

export const PRODUCTS_DATA = [fitnessProduct];
