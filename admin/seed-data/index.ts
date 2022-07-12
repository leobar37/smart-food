import {
  CategoryCreateInput,
  OptionCreateInput,
  SubOptionCreateInput,
  ClientCreateInput,
} from '.keystone/types';
import { KeystoneContext } from '@keystone-6/core/types';
import { PrismaClient } from '@prisma/client';
import { data } from './data';
type Data = typeof data;

export async function insertSeedData(context: KeystoneContext) {
  const client: PrismaClient = context.prisma;

  const createClient = async (input: ClientCreateInput) => {
    const result = await client.client.count({
      where: {
        email: {
          equals: input.email as string,
        },
      },
    });
    console.log(result);

    if (result > 0) {
      console.log(`Client with email ${input.email} already exists`);
      return;
    }
    await context.query.Client.createOne({
      data: input,
    });
  };

  const createCategory = async (input: Data['categories'][0]) => {
    const category = await context.query.Category.findMany({
      where: {
        name: {
          equals: input.name,
        },
      },
      query: 'id name',
    });
    if (!category[0]) {
      const newCategory = await context.query.Category.createOne({
        data: {
          name: input.name,
          description: input.description,
          title: input.title,
        } as CategoryCreateInput,
        query: 'id name',
      });
      console.log(`Created category ${newCategory.name}`);
      return newCategory;
    }
  };

  const createProduct = async (product: Data['products'][0]) => {
    const idCreated = await context.query.Product.findMany({
      where: {
        name: {
          equals: product.name,
        },
      },
    });
    if (!idCreated[0]) {
      let category: any = await context.query.Category.findMany({
        where: {
          name: {
            equals: product.category,
          },
        },
      });

      category = category[0] as any;
      if (!category) {
        throw new Error('Category not found');
      }
      const productSaved = await client.product.create({
        data: {
          name: product.name,
          count: product.count,
          price: product.price,
          photo: product.photo,
          categoryId: category.id,
          description: product.description,
          isAvalaible: product.isAvalaible,
          excerpt: (product as any)?.excerpt ?? '',
        },
      });
      console.log(`Created product ${productSaved.name}`);
      if ('options' in product) {
        const optionsPrs = ((product as any).options ?? []).map(
          async (option) => {
            const data = {
              name: option.name,
              label: option.label,
              limit: option.limit,
              product: {
                connect: {
                  id: productSaved.id,
                },
              },
            } as OptionCreateInput;
            const optSaved = await context.query.Option.createOne({
              data: data as OptionCreateInput,
              query: 'id name',
            });
            console.log(
              `Created option ${optSaved.name} fro product ${productSaved.name}`,
            );
            for await (const subOption of option.options) {
              const dataSubOption = {
                name: subOption.name,
                option: {
                  connect: {
                    id: optSaved.id,
                  },
                },
              } as SubOptionCreateInput;
              const subOptionSaved = await context.query.SubOption.createOne({
                data: dataSubOption,
                query: 'id name',
              });
              console.log(
                `create suboption ${subOptionSaved.name}  for option ${optSaved.name}`,
              );
            }
            return optSaved;
          },
        );
        const options = await Promise.all(optionsPrs);
      }
    }
  };
  for await (const categoy of data.categories) {
    await createCategory(categoy);
  }
  for await (const product of data.products) {
    await createProduct(product);
  }
  await createClient(data.AnonymusClient);
  process.exit(0);
}
