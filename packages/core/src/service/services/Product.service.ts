import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectSupabase, SupabaseClient } from '../../common/providers';
import { SUPABASE_TABLES } from '../../common/constants';
import { PRODUCTS_DATA } from '../../common/data';
import { BuildeableProduct, Option } from '../../common/types';
import { pick } from 'lodash';
import { isDev } from '@smartfood/common';
@Injectable()
export class ProductService implements OnModuleInit {
  constructor(@InjectSupabase() private readonly supabase: SupabaseClient) {}
  async onModuleInit() {
    const { count } = await this.supabase
      .from(SUPABASE_TABLES.BUILDEABLE_PRODUCT)
      .select('*', { count: 'exact' });

    const databaseIsEmpty = count === 0;

    if (isDev && databaseIsEmpty) {
      console.log(
        'The populate databse is empty, populating it with default data',
      );
      const forResolve = PRODUCTS_DATA.map(async (product) => {
        const prAdded = await this.createProduct(product);
        console.log(`Product ${prAdded.name} added`);
      });
      await Promise.all(forResolve);
    }
    const products = await this.getAllProducts();
    console.log(products);
  }

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
    const { data } = await this.supabase
      .from<BuildeableProduct>(SUPABASE_TABLES.BUILDEABLE_PRODUCT)
      .select('*');
    return data;
  }
  async getProductById(productId: number) {
    const { data } = await this.supabase
      .from<BuildeableProduct>(SUPABASE_TABLES.BUILDEABLE_PRODUCT)
      .select('*')
      .eq('id', productId)
      .single();
    return data;
  }
  async getOptionsByProductId(productId: number) {
    const { data } = await this.supabase
      .from<Option>(SUPABASE_TABLES.OPTIONS)
      .select('*')
      .eq('productId', productId);
    return data;
  }
  async getOptionById(optionId: number) {
    const { data } = await this.supabase
      .from<Option>(SUPABASE_TABLES.OPTIONS)
      .select('*')
      .eq('id', optionId)
      .single();
    return data;
  }
  async getOptionsByOptionsId(optionsId: number) {
    const { data } = await this.supabase
      .from<Option>(SUPABASE_TABLES.OPTIONS)
      .select('*')
      .eq('optionsId', optionsId);
    return data;
  }
}
