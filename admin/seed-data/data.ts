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
      ${s.selection.map((d) => `- ${d}`).join('\n')}
    `;
  })}
  `;
};

// data
const categories = [
  {
    name: 'armables',
    // ** used for landing purposes
    description: `Arma tu plato o bebida como más te guste, elige los ingrediemte que más te gusten. Tenemos + de 25 ingredientes para crearlos.`,
    title: 'Arma lo que más te guste',
    isVisible: true,
  },
  {
    name: 'armados',
    title: `Prueba nuestros armados para ti`,
    description: `Elige entre toda la variedad de platos deliciosos que hemos armado pensando en ti.`,
    isVisible: true,
  },
  {
    name: 'bebidas',
    title: 'Bebidas',
    description: `Elige cualquiera de las bebidas refrescantes que hemos armado para ti. También puedes escoger las bebidas para pre y post entrenamiento.`,
    isVisible: true,
  },
];

export const defaultImage = {
  id: 'cl5ialily00013wuqg3hrfp9n',
  _meta: {
    url: 'http://res.cloudinary.com/wellnesspro/image/upload/v1657637549/cl5ialily00013wuqg3hrfp9n.avif',
    etag: 'c4485e105434a243a494f0e37fb17155',
    tags: [],
    type: 'upload',
    bytes: 105687,
    pages: 1,
    width: 880,
    format: 'avif',
    height: 880,
    api_key: '827568399999768',
    version: 1657637549,
    asset_id: 'b97d1ac5052460c4a39e7ebdfed0d341',
    public_id: 'cl5ialily00013wuqg3hrfp9n',
    signature: 'e3f891392fb0f131669c06bb75e475f8f6243aac',
    created_at: '2022-07-12T14:52:29Z',
    secure_url:
      'https://res.cloudinary.com/wellnesspro/image/upload/v1657637549/cl5ialily00013wuqg3hrfp9n.avif',
    version_id: '5596316388067e164052aa440b699bf1',
    access_mode: 'public',
    placeholder: false,
    resource_type: 'image',
    original_filename: 'file',
  },
  encoding: '7bit',
  filename: 'example_image.avif',
  mimetype: 'image/avif',
  originalFilename: 'example_image.avif',
};

// generic plate
const genericPlate = {
  name: 'PLato',
  count: null,
  price: 25,
  photo: defaultImage,
  description: ``,
  excerpt: `Mix de lechugas, quinua, chalaquita, atún, salsa de tiradito, salsa acevichada.`,
  isVisible: true,
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
  price: 24.9,
  category: 'armables',
  photo: defaultImage,
  description: 'Arma tu propio plato',
  isVisible: true,
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
    category: 'armados',
    photo: defaultImage,
    isVisible: true,
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
    category: 'armados',
    photo: defaultImage,
    isVisible: true,
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
    category: 'armados',
    photo: defaultImage,
    isVisible: true,
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
    category: 'armados',
    photo: defaultImage,
    isVisible: true,
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

const productsByCategory = (name: string) => {
  return Array.from({ length: 5 }).map((_, idx) => ({
    ...genericPlate,
    category: name,
    name: name + idx,
  }));
};

export const data = {
  products: [fitnessProduct, ...ArmedPlates, ...productsByCategory('bebidas')],
  categories,
  AnonymusClient,
};
