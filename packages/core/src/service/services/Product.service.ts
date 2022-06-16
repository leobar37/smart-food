import { Injectable } from '@nestjs/common';
import { Client } from '@smartfood/client';
import { pick } from 'lodash';
import { SUPABASE_TABLES } from '../../common/constants';
import {
  InjectSdk,
  InjectSupabase,
  SupabaseClient,
} from '../../common/providers';
import { BuildeableProduct, Option } from '../../common/types';
@Injectable()
export class ProductService {
  constructor(
    @InjectSupabase() private readonly supabase: SupabaseClient,
    @InjectSdk() private readonly sdk: Client,
  ) {}
  // async onModuleInit() {
  //   const { count } = await this.supabase
  //     .from(SUPABASE_TABLES.BUILDEABLE_PRODUCT)
  //     .select('*', { count: 'exact' });

  //   const databaseIsEmpty = count === 0;

  //   if (isDev && databaseIsEmpty) {
  //     console.log(
  //       'The populate databse is empty, populating it with default data',
  //     );
  //     const forResolve = PRODUCTS_DATA.map(async (product) => {
  //       const prAdded = await this.createProduct(product);
  //       console.log(`Product ${prAdded.name} added`);
  //     });
  //     await Promise.all(forResolve);
  //   }
  //   const products = await this.getAllProducts();
  //   console.log(products);
  // }

  async createProduct(input: BuildeableProduct) {
    // inset prouct
    const { data: product } = await this.supabase
      .from<BuildeableProduct>(SUPABASE_TABLES.BUILDEABLE_PRODUCT)
      .insert({
        ...pick(input, 'name', 'price'),
      })
      .single();

    if (!product) {
      console.log('product not added');
      return null;
    }

    const mapOption = (option: Option, productId: number, parentId: number) => {
      if (parentId) {
        productId = null;
      }
      return {
        ...pick(option, 'name', 'label', 'limit'),
        optionsId: parentId,
        productId: productId,
      };
    };

    const insertOptions = async (options: Option[], productId: number) => {
      const optionsForResolve = options.map(async (option) => {
        const { data: optionAdded } = await this.supabase
          .from<Option>(SUPABASE_TABLES.OPTIONS)
          .insert(mapOption(option, productId, option?.optionsId))
          .single();
        if (option?.options) {
          option.options = option.options.map((d) => ({
            ...d,
            optionsId: optionAdded.id,
          }));
          optionAdded.options = await insertOptions(option.options, productId);
        }
        return optionAdded;
      });
      const result = await Promise.all(optionsForResolve);
      return result;
    };
    const options = await insertOptions(input.options, product.id);
    return Object.assign(product, { options });
  }

  async getAllProducts() {
    return this.sdk.getProducts({
      responseType: 'product-with-options',
      categoryId: 'cl4epbb95000294uqitys7o0g',
    });
  }

  async getProductById(productId: string) {
    const products = await this.sdk.getProducts({
      responseType: 'product-only',
      productId: productId,
    });
    return products[0] ?? null;
  }

  async getCompleteProduct(productId: string) {
    const products = await this.sdk.getProducts({
      responseType: 'product-with-options',
      productId: productId,
    });
    return products[0] ?? null;
  }

  async getOptionsByOptionsId(optionsId: string) {
    return await this.sdk.getSubOptions({
      optionId: optionsId,
    });
  }
}
