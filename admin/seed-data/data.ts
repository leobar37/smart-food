import { ClientCreateInput } from '.keystone/types';
const categories = [
  {
    name: 'Armables',
  },
];

export const defaultImage = {
  id: 'cl4ek81tt0000c0uqfe9jb47p',
  _meta: {
    url: 'http://res.cloudinary.com/wellnesspro/image/upload/v1655235070/cl4ek81tt0000c0uqfe9jb47p.jpg',
    etag: '5d51ad5ed7fa7be3f3243a21740bc083',
    tags: [],
    type: 'upload',
    bytes: 2733895,
    width: 3024,
    format: 'jpg',
    height: 4032,
    api_key: '827568399999768',
    version: 1655235070,
    asset_id: 'bbd9271b887ddd395a8b635644a330e8',
    public_id: 'cl4ek81tt0000c0uqfe9jb47p',
    signature: '71e4da8afc49c9ec19330bea789b0dfaec14d848',
    created_at: '2022-06-14T19:31:10Z',
    secure_url:
      'https://res.cloudinary.com/wellnesspro/image/upload/v1655235070/cl4ek81tt0000c0uqfe9jb47p.jpg',
    version_id: '614d4f1fdff79a51f6bba3d1ea69e874',
    access_mode: 'public',
    placeholder: false,
    resource_type: 'image',
    original_filename: 'file',
  },
  encoding: '7bit',
  filename: 'IMG_3487.jpg',
  mimetype: 'image/jpeg',
  originalFilename: 'IMG_3487.jpg',
};

export const AnonymusClient = {
  direction: 'no tiene',
  email: 'anonymus@anon.com',
  lastName: 'Anonymus',
  name: 'Anonymus',
  phone: '123456789',
} as ClientCreateInput;

export const fitnessProduct = {
  name: 'Smart bowl',
  count: null,
  price: 25,
  category: 'Armables',
  photo: defaultImage,
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
    {
      name: 'Veggies',
      label: 'Elige tus veggies ( Hasta 4 opciones a elegir)',
      limit: 4,
      options: [
        {
          name: 'Palta',
        },
        {
          name: 'Choclo Americano',
        },
        {
          name: 'Tomate Cherry',
        },
        {
          name: 'Lechuga hidropónica',
        },
        {
          name: 'Col Morado',
        },
        {
          name: 'Zanahoria Rayada',
        },
        {
          name: 'Pepino Kyuri',
        },
        {
          name: 'Frijol Negro',
        },
        {
          name: 'Piña',
        },
        {
          name: 'Mango',
        },
      ],
    },
    {
      name: 'Salsas',
      label: 'Elige tus salsas (Hasta 2 opciones)',
      limit: 2,
      options: [
        {
          name: 'Acevichada - salada',
        },
        {
          name: 'Oriental',
        },
        {
          name: 'Teriyaki',
        },
        {
          name: 'Maracuyá - agridulce',
        },
        {
          name: 'Smart hot - picante',
        },
      ],
    },
    {
      name: 'Toppins',
      label: 'Elige tus Toppins (Puedes elegir hasta 3)',
      limit: 3,
      options: [
        {
          name: 'Ajonjolí',
        },
        {
          name: 'Canchita chulpi',
        },
        {
          name: 'Nori crocante',
        },
        {
          name: 'Coliflor Crocante',
        },
        {
          name: 'Aros de cebolla',
        },
        {
          name: 'Camote frito',
        },
      ],
    },
  ],
};

export const data = {
  products: [fitnessProduct],
  categories,
  AnonymusClient,
};
