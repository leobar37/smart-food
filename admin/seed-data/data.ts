import { ClientCreateInput } from '.keystone/types';
// utils

const makeSelectionText = (
  selection: { option: string; selection: string[] }[],
) => {
  return `
  ## Contenido
  ${selection.map((s) => {
    return `
      **${s.option}** 
       ${s.selection.map((d) => `- ${d}`).join(`\n`)}
    `;
  })}
  `;
};

// data
const categories = [
  {
    name: 'Armables',
  },
  {
    name: 'Armados',
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
  description: 'Arma tu propio plato',
  isAvalaible: true,

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

const ArmedPlates = [
  {
    name: 'Bajar de peso',
    count: null,
    price: 25,
    category: 'Armados',
    photo: defaultImage,
    isAvalaible: true,
    description: makeSelectionText([
      {
        option: 'Base',
        selection: ['Mix Lechugas (255gr)'],
      },
      {
        option: 'Proteína',
        selection: ['Salmón Marinado 50 gr'],
      },
      {
        option: 'Veggies',
        selection: [
          'Palta 45 gr',
          'Choclo americano 30 gr',
          'Tomate Cherry 40 gr',
          'Pepinillo 40gr',
        ],
      },
      {
        option: 'Salsas',
        selection: ['Acevichada - salada x 1 (1 1/2 oz) '],
      },
      {
        option: 'Toppins',
        selection: ['Canchita chulpi 20 gr', 'Chifle 20 gr'],
      },
    ]),
  },
  {
    name: 'plato fit',
    count: null,
    price: 25,
    category: 'Armados',
    photo: defaultImage,
    isAvalaible: true,
    description: makeSelectionText([
      {
        option: 'Base',
        selection: ['quinua multicolor  90 gr '],
      },
      {
        option: 'Proteína',
        selection: ['Filete de Pollo 70 gr '],
      },
      {
        option: 'Veggies',
        selection: [
          'Palta 45 gr ',
          'Choclo americano 30 gr',
          'Pepino kyuri 40 gr ',
          'Durazno 35 gr ',
        ],
      },
      {
        option: 'Salsas',
        selection: ['Acevichada - salada  (1 1/2oz) '],
      },
      {
        option: 'Toppins',
        selection: ['smart hot -picante (1 1/2 oz)'],
      },
    ]),
  },
  {
    name: 'Definición',
    count: null,
    price: 25,
    category: 'Armados',
    photo: defaultImage,
    isAvalaible: true,
    description: makeSelectionText([
      {
        option: 'Base',
        selection: ['Arroz integral 80 g'],
      },
      {
        option: 'Proteina',
        selection: ['Pollo Teriyaki - dulce. 60 gr '],
      },
      {
        option: 'Veggies ',
        selection: [
          'Palta 45 gr',
          'Choclo americano 30 gr',
          'Lechuga hidroponica  35 gr ',
          'Zanahoria Rayada 30 gr ',
        ],
      },
      {
        option: 'Salsas',
        selection: [
          'Maracuyá - agridulce ( 1 1/2 oz)',
          'Smart hot - picante ( 1 1/2 oz)',
        ],
      },
      {
        option: 'Toppins',
        selection: [
          'Canchita chulpi 20 gr',
          'Nori crocante 5 gr',
          ' Aros de cebolla 50 gr',
        ],
      },
    ]),
  },
  {
    name: 'Subir de peso',
    count: null,
    price: 25,
    category: 'Armados',
    photo: defaultImage,
    isAvalaible: true,
    description: makeSelectionText([
      {
        option: 'Base',
        selection: ['Arroz integral 80 g'],
      },
      {
        option: 'Proteina',
        selection: ['Pollo Teriyaki - dulce. 60 gr '],
      },
      {
        option: 'Veggies ',
        selection: [
          'Palta 45 gr',
          'Choclo americano 30 gr',
          'Lechuga hidroponica  35 gr ',
          'Zanahoria Rayada 30 gr ',
        ],
      },
      {
        option: 'Salsas',
        selection: [
          'Maracuyá - agridulce ( 1 1/2 oz)',
          'Smart hot - picante ( 1 1/2 oz)',
        ],
      },
      {
        option: 'Toppins',
        selection: [
          'Canchita chulpi 20 gr',
          'Nori crocante 5 gr',
          ' Aros de cebolla 50 gr',
        ],
      },
    ]),
  },
];

export const data = {
  products: [fitnessProduct, ...ArmedPlates],
  categories,
  AnonymusClient,
};
