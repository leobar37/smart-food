import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type CategoryProductsArgs = {
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ProductWhereInput;
};

export type CategoryProductsCountArgs = {
  where?: ProductWhereInput;
};

export type CategoryCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<ProductRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type CategoryOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type CategoryRelateToOneForCreateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
};

export type CategoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  products?: InputMaybe<ProductRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  products?: InputMaybe<ProductManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Client = {
  __typename?: 'Client';
  direction?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
};

export type ClientOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderWhereInput;
};

export type ClientOrdersCountArgs = {
  where?: OrderWhereInput;
};

export type ClientCreateInput = {
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  phone?: InputMaybe<Scalars['String']>;
};

export type ClientOrderByInput = {
  direction?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
};

export type ClientRelateToOneForCreateInput = {
  connect?: InputMaybe<ClientWhereUniqueInput>;
  create?: InputMaybe<ClientCreateInput>;
};

export type ClientRelateToOneForUpdateInput = {
  connect?: InputMaybe<ClientWhereUniqueInput>;
  create?: InputMaybe<ClientCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type ClientUpdateArgs = {
  data: ClientUpdateInput;
  where: ClientWhereUniqueInput;
};

export type ClientUpdateInput = {
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  phone?: InputMaybe<Scalars['String']>;
};

export type ClientWhereInput = {
  AND?: InputMaybe<Array<ClientWhereInput>>;
  NOT?: InputMaybe<Array<ClientWhereInput>>;
  OR?: InputMaybe<Array<ClientWhereInput>>;
  direction?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  phone?: InputMaybe<StringFilter>;
};

export type ClientWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

/**
 * Mirrors the formatting options [Cloudinary provides](https://cloudinary.com/documentation/image_transformation_reference).
 * All options are strings as they ultimately end up in a URL.
 */
export type CloudinaryImageFormat = {
  angle?: InputMaybe<Scalars['String']>;
  aspect_ratio?: InputMaybe<Scalars['String']>;
  background?: InputMaybe<Scalars['String']>;
  border?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  color_space?: InputMaybe<Scalars['String']>;
  crop?: InputMaybe<Scalars['String']>;
  default_image?: InputMaybe<Scalars['String']>;
  delay?: InputMaybe<Scalars['String']>;
  density?: InputMaybe<Scalars['String']>;
  dpr?: InputMaybe<Scalars['String']>;
  effect?: InputMaybe<Scalars['String']>;
  fetch_format?: InputMaybe<Scalars['String']>;
  flags?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  gravity?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  opacity?: InputMaybe<Scalars['String']>;
  overlay?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['String']>;
  /**  Rewrites the filename to be this pretty string. Do not include `/` or `.` */
  prettyName?: InputMaybe<Scalars['String']>;
  quality?: InputMaybe<Scalars['String']>;
  radius?: InputMaybe<Scalars['String']>;
  transformation?: InputMaybe<Scalars['String']>;
  underlay?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['String']>;
  x?: InputMaybe<Scalars['String']>;
  y?: InputMaybe<Scalars['String']>;
  zoom?: InputMaybe<Scalars['String']>;
};

export type CloudinaryImage_File = {
  __typename?: 'CloudinaryImage_File';
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  mimetype?: Maybe<Scalars['String']>;
  originalFilename?: Maybe<Scalars['String']>;
  publicUrl?: Maybe<Scalars['String']>;
  publicUrlTransformed?: Maybe<Scalars['String']>;
};

export type CloudinaryImage_FilePublicUrlTransformedArgs = {
  transformation?: InputMaybe<CloudinaryImageFormat>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<Scalars['ID']>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  enableSessionItem: Scalars['Boolean'];
  enableSignout: Scalars['Boolean'];
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};

export type KeystoneAdminMetaListArgs = {
  key: Scalars['String'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']>;
  fieldMeta?: Maybe<Scalars['JSON']>;
  isFilterable: Scalars['Boolean'];
  isOrderable: Scalars['Boolean'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int'];
};

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read',
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  hideCreate: Scalars['Boolean'];
  hideDelete: Scalars['Boolean'];
  initialColumns: Array<Scalars['String']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean'];
  itemQueryName: Scalars['String'];
  key: Scalars['String'];
  label: Scalars['String'];
  labelField: Scalars['String'];
  listQueryName: Scalars['String'];
  pageSize: Scalars['Int'];
  path: Scalars['String'];
  plural: Scalars['String'];
  singular: Scalars['String'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Metadata = {
  direction?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<OrderPaymentMethodType>;
  phone?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCategories?: Maybe<Array<Maybe<Category>>>;
  createCategory?: Maybe<Category>;
  createClient?: Maybe<Client>;
  createClients?: Maybe<Array<Maybe<Client>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createOption?: Maybe<Option>;
  createOptions?: Maybe<Array<Maybe<Option>>>;
  createOrder?: Maybe<Order>;
  createOrderLine?: Maybe<OrderLine>;
  createOrderLines?: Maybe<Array<Maybe<OrderLine>>>;
  createOrders?: Maybe<Array<Maybe<Order>>>;
  createProduct?: Maybe<Product>;
  createProducts?: Maybe<Array<Maybe<Product>>>;
  createSubOption?: Maybe<SubOption>;
  createSubOptions?: Maybe<Array<Maybe<SubOption>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  customDeleteOrderLine?: Maybe<OrderOutput>;
  deleteCategories?: Maybe<Array<Maybe<Category>>>;
  deleteCategory?: Maybe<Category>;
  deleteClient?: Maybe<Client>;
  deleteClients?: Maybe<Array<Maybe<Client>>>;
  deleteOption?: Maybe<Option>;
  deleteOptions?: Maybe<Array<Maybe<Option>>>;
  deleteOrder?: Maybe<Order>;
  deleteOrderLine?: Maybe<OrderLine>;
  deleteOrderLines?: Maybe<Array<Maybe<OrderLine>>>;
  deleteOrders?: Maybe<Array<Maybe<Order>>>;
  deleteProduct?: Maybe<Product>;
  deleteProducts?: Maybe<Array<Maybe<Product>>>;
  deleteSubOption?: Maybe<SubOption>;
  deleteSubOptions?: Maybe<Array<Maybe<SubOption>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean'];
  /** You can create a edit a order with this mutation */
  makeOrder?: Maybe<OrderOutput>;
  /** A line describes the relationship between the and the product */
  patchOrderLine?: Maybe<OrderOutput>;
  updateCategories?: Maybe<Array<Maybe<Category>>>;
  updateCategory?: Maybe<Category>;
  updateClient?: Maybe<Client>;
  updateClients?: Maybe<Array<Maybe<Client>>>;
  updateOption?: Maybe<Option>;
  updateOptions?: Maybe<Array<Maybe<Option>>>;
  updateOrder?: Maybe<Order>;
  updateOrderLine?: Maybe<OrderLine>;
  updateOrderLines?: Maybe<Array<Maybe<OrderLine>>>;
  updateOrders?: Maybe<Array<Maybe<Order>>>;
  updateProduct?: Maybe<Product>;
  updateProducts?: Maybe<Array<Maybe<Product>>>;
  updateSubOption?: Maybe<SubOption>;
  updateSubOptions?: Maybe<Array<Maybe<SubOption>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};

export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>;
};

export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};

export type MutationCreateClientArgs = {
  data: ClientCreateInput;
};

export type MutationCreateClientsArgs = {
  data: Array<ClientCreateInput>;
};

export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};

export type MutationCreateOptionArgs = {
  data: OptionCreateInput;
};

export type MutationCreateOptionsArgs = {
  data: Array<OptionCreateInput>;
};

export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};

export type MutationCreateOrderLineArgs = {
  data: OrderLineCreateInput;
};

export type MutationCreateOrderLinesArgs = {
  data: Array<OrderLineCreateInput>;
};

export type MutationCreateOrdersArgs = {
  data: Array<OrderCreateInput>;
};

export type MutationCreateProductArgs = {
  data: ProductCreateInput;
};

export type MutationCreateProductsArgs = {
  data: Array<ProductCreateInput>;
};

export type MutationCreateSubOptionArgs = {
  data: SubOptionCreateInput;
};

export type MutationCreateSubOptionsArgs = {
  data: Array<SubOptionCreateInput>;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};

export type MutationCustomDeleteOrderLineArgs = {
  lineOrderId?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>;
};

export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};

export type MutationDeleteClientArgs = {
  where: ClientWhereUniqueInput;
};

export type MutationDeleteClientsArgs = {
  where: Array<ClientWhereUniqueInput>;
};

export type MutationDeleteOptionArgs = {
  where: OptionWhereUniqueInput;
};

export type MutationDeleteOptionsArgs = {
  where: Array<OptionWhereUniqueInput>;
};

export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};

export type MutationDeleteOrderLineArgs = {
  where: OrderLineWhereUniqueInput;
};

export type MutationDeleteOrderLinesArgs = {
  where: Array<OrderLineWhereUniqueInput>;
};

export type MutationDeleteOrdersArgs = {
  where: Array<OrderWhereUniqueInput>;
};

export type MutationDeleteProductArgs = {
  where: ProductWhereUniqueInput;
};

export type MutationDeleteProductsArgs = {
  where: Array<ProductWhereUniqueInput>;
};

export type MutationDeleteSubOptionArgs = {
  where: SubOptionWhereUniqueInput;
};

export type MutationDeleteSubOptionsArgs = {
  where: Array<SubOptionWhereUniqueInput>;
};

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};

export type MutationMakeOrderArgs = {
  email?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Metadata>;
  orderId?: InputMaybe<Scalars['String']>;
};

export type MutationPatchOrderLineArgs = {
  orderId?: InputMaybe<Scalars['String']>;
  orderLine?: InputMaybe<OrderLineItem>;
  orderLineId?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>;
};

export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type MutationUpdateClientArgs = {
  data: ClientUpdateInput;
  where: ClientWhereUniqueInput;
};

export type MutationUpdateClientsArgs = {
  data: Array<ClientUpdateArgs>;
};

export type MutationUpdateOptionArgs = {
  data: OptionUpdateInput;
  where: OptionWhereUniqueInput;
};

export type MutationUpdateOptionsArgs = {
  data: Array<OptionUpdateArgs>;
};

export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type MutationUpdateOrderLineArgs = {
  data: OrderLineUpdateInput;
  where: OrderLineWhereUniqueInput;
};

export type MutationUpdateOrderLinesArgs = {
  data: Array<OrderLineUpdateArgs>;
};

export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
};

export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};

export type MutationUpdateProductsArgs = {
  data: Array<ProductUpdateArgs>;
};

export type MutationUpdateSubOptionArgs = {
  data: SubOptionUpdateInput;
  where: SubOptionWhereUniqueInput;
};

export type MutationUpdateSubOptionsArgs = {
  data: Array<SubOptionUpdateArgs>;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Option = {
  __typename?: 'Option';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  subOptions?: Maybe<Array<SubOption>>;
  subOptionsCount?: Maybe<Scalars['Int']>;
};

export type OptionSubOptionsArgs = {
  orderBy?: Array<SubOptionOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: SubOptionWhereInput;
};

export type OptionSubOptionsCountArgs = {
  where?: SubOptionWhereInput;
};

export type OptionCreateInput = {
  label?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  subOptions?: InputMaybe<SubOptionRelateToManyForCreateInput>;
};

export type OptionManyRelationFilter = {
  every?: InputMaybe<OptionWhereInput>;
  none?: InputMaybe<OptionWhereInput>;
  some?: InputMaybe<OptionWhereInput>;
};

export type OptionOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  label?: InputMaybe<OrderDirection>;
  limit?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type OptionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OptionWhereUniqueInput>>;
  create?: InputMaybe<Array<OptionCreateInput>>;
};

export type OptionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OptionWhereUniqueInput>>;
  create?: InputMaybe<Array<OptionCreateInput>>;
  disconnect?: InputMaybe<Array<OptionWhereUniqueInput>>;
  set?: InputMaybe<Array<OptionWhereUniqueInput>>;
};

export type OptionRelateToOneForCreateInput = {
  connect?: InputMaybe<OptionWhereUniqueInput>;
  create?: InputMaybe<OptionCreateInput>;
};

export type OptionRelateToOneForUpdateInput = {
  connect?: InputMaybe<OptionWhereUniqueInput>;
  create?: InputMaybe<OptionCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type OptionUpdateArgs = {
  data: OptionUpdateInput;
  where: OptionWhereUniqueInput;
};

export type OptionUpdateInput = {
  label?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  subOptions?: InputMaybe<SubOptionRelateToManyForUpdateInput>;
};

export type OptionWhereInput = {
  AND?: InputMaybe<Array<OptionWhereInput>>;
  NOT?: InputMaybe<Array<OptionWhereInput>>;
  OR?: InputMaybe<Array<OptionWhereInput>>;
  id?: InputMaybe<IdFilter>;
  label?: InputMaybe<StringFilter>;
  limit?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringFilter>;
  product?: InputMaybe<ProductWhereInput>;
  subOptions?: InputMaybe<SubOptionManyRelationFilter>;
};

export type OptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Order = {
  __typename?: 'Order';
  client?: Maybe<Client>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deliveryDetails?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  lines?: Maybe<Array<OrderLine>>;
  linesCount?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSON']>;
  orderNumber?: Maybe<Scalars['Int']>;
  paymentMethod?: Maybe<OrderPaymentMethodType>;
  status?: Maybe<OrderStatusType>;
  total?: Maybe<Scalars['Float']>;
};

export type OrderLinesArgs = {
  orderBy?: Array<OrderLineOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderLineWhereInput;
};

export type OrderLinesCountArgs = {
  where?: OrderLineWhereInput;
};

export type OrderCreateInput = {
  client?: InputMaybe<ClientRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  lines?: InputMaybe<OrderLineRelateToManyForCreateInput>;
  metadata?: InputMaybe<Scalars['JSON']>;
  orderNumber?: InputMaybe<Scalars['Int']>;
  paymentMethod?: InputMaybe<OrderPaymentMethodType>;
  status?: InputMaybe<OrderStatusType>;
  total?: InputMaybe<Scalars['Float']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type OrderLine = {
  __typename?: 'OrderLine';
  id: Scalars['ID'];
  order?: Maybe<Order>;
  price?: Maybe<Scalars['Float']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
  results?: Maybe<Scalars['JSON']>;
  selection?: Maybe<Scalars['JSON']>;
  total?: Maybe<Scalars['Float']>;
};

export type OrderLineCreateInput = {
  order?: InputMaybe<OrderRelateToOneForCreateInput>;
  price?: InputMaybe<Scalars['Float']>;
  product?: InputMaybe<ProductRelateToOneForCreateInput>;
  quantity?: InputMaybe<Scalars['Int']>;
  selection?: InputMaybe<Scalars['JSON']>;
  total?: InputMaybe<Scalars['Float']>;
};

export type OrderLineItem = {
  price?: InputMaybe<Scalars['Float']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  /**
   *
   *         metadata about this line
   *         options : {
   *            id  : string,
   *            options  : string[]
   *          }
   *
   */
  selection?: InputMaybe<Scalars['JSON']>;
};

export type OrderLineManyRelationFilter = {
  every?: InputMaybe<OrderLineWhereInput>;
  none?: InputMaybe<OrderLineWhereInput>;
  some?: InputMaybe<OrderLineWhereInput>;
};

export type OrderLineOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  quantity?: InputMaybe<OrderDirection>;
  total?: InputMaybe<OrderDirection>;
};

export type OrderLineOutput = {
  __typename?: 'OrderLineOutput';
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  selection?: Maybe<Scalars['JSON']>;
  total?: Maybe<Scalars['Float']>;
};

export type OrderLineRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderLineWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderLineCreateInput>>;
};

export type OrderLineRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderLineWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderLineCreateInput>>;
  disconnect?: InputMaybe<Array<OrderLineWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderLineWhereUniqueInput>>;
};

export type OrderLineUpdateArgs = {
  data: OrderLineUpdateInput;
  where: OrderLineWhereUniqueInput;
};

export type OrderLineUpdateInput = {
  order?: InputMaybe<OrderRelateToOneForUpdateInput>;
  price?: InputMaybe<Scalars['Float']>;
  product?: InputMaybe<ProductRelateToOneForUpdateInput>;
  quantity?: InputMaybe<Scalars['Int']>;
  selection?: InputMaybe<Scalars['JSON']>;
  total?: InputMaybe<Scalars['Float']>;
};

export type OrderLineWhereInput = {
  AND?: InputMaybe<Array<OrderLineWhereInput>>;
  NOT?: InputMaybe<Array<OrderLineWhereInput>>;
  OR?: InputMaybe<Array<OrderLineWhereInput>>;
  id?: InputMaybe<IdFilter>;
  order?: InputMaybe<OrderWhereInput>;
  price?: InputMaybe<FloatNullableFilter>;
  product?: InputMaybe<ProductWhereInput>;
  quantity?: InputMaybe<IntNullableFilter>;
  total?: InputMaybe<FloatNullableFilter>;
};

export type OrderLineWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type OrderManyRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  orderNumber?: InputMaybe<OrderDirection>;
  paymentMethod?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  total?: InputMaybe<OrderDirection>;
};

export type OrderOutput = {
  __typename?: 'OrderOutput';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  lines?: Maybe<Array<Maybe<OrderLineOutput>>>;
  linesCount?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSON']>;
  orderNumber?: Maybe<Scalars['Int']>;
  paymentMethod?: Maybe<OrderPaymentMethodType>;
  status?: Maybe<OrderStatusType>;
  total?: Maybe<Scalars['Float']>;
};

export enum OrderPaymentMethodType {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  Plin = 'PLIN',
  Yape = 'YAPE',
}

export type OrderPaymentMethodTypeNullableFilter = {
  equals?: InputMaybe<OrderPaymentMethodType>;
  in?: InputMaybe<Array<OrderPaymentMethodType>>;
  not?: InputMaybe<OrderPaymentMethodTypeNullableFilter>;
  notIn?: InputMaybe<Array<OrderPaymentMethodType>>;
};

export type OrderRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
};

export type OrderRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
};

export type OrderRelateToOneForCreateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
};

export type OrderRelateToOneForUpdateInput = {
  connect?: InputMaybe<OrderWhereUniqueInput>;
  create?: InputMaybe<OrderCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export enum OrderStatusType {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  InCart = 'IN_CART',
  Paid = 'PAID',
  Pending = 'PENDING',
}

export type OrderStatusTypeNullableFilter = {
  equals?: InputMaybe<OrderStatusType>;
  in?: InputMaybe<Array<OrderStatusType>>;
  not?: InputMaybe<OrderStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<OrderStatusType>>;
};

export type OrderUpdateArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateInput = {
  client?: InputMaybe<ClientRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  lines?: InputMaybe<OrderLineRelateToManyForUpdateInput>;
  metadata?: InputMaybe<Scalars['JSON']>;
  orderNumber?: InputMaybe<Scalars['Int']>;
  paymentMethod?: InputMaybe<OrderPaymentMethodType>;
  status?: InputMaybe<OrderStatusType>;
  total?: InputMaybe<Scalars['Float']>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  client?: InputMaybe<ClientWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lines?: InputMaybe<OrderLineManyRelationFilter>;
  orderNumber?: InputMaybe<IntFilter>;
  paymentMethod?: InputMaybe<OrderPaymentMethodTypeNullableFilter>;
  status?: InputMaybe<OrderStatusTypeNullableFilter>;
  total?: InputMaybe<FloatNullableFilter>;
};

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean'];
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  count?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isAvalaible?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Option>>;
  optionsCount?: Maybe<Scalars['Int']>;
  photo?: Maybe<CloudinaryImage_File>;
  price?: Maybe<Scalars['Float']>;
};

export type ProductOptionsArgs = {
  orderBy?: Array<OptionOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OptionWhereInput;
};

export type ProductOptionsCountArgs = {
  where?: OptionWhereInput;
};

export type ProductCreateInput = {
  category?: InputMaybe<CategoryRelateToOneForCreateInput>;
  count?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  excerpt?: InputMaybe<Scalars['String']>;
  isAvalaible?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<OptionRelateToManyForCreateInput>;
  photo?: InputMaybe<Scalars['Upload']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type ProductManyRelationFilter = {
  every?: InputMaybe<ProductWhereInput>;
  none?: InputMaybe<ProductWhereInput>;
  some?: InputMaybe<ProductWhereInput>;
};

export type ProductOrderByInput = {
  count?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  excerpt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAvalaible?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
};

export type ProductRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductCreateInput>>;
};

export type ProductRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  create?: InputMaybe<Array<ProductCreateInput>>;
  disconnect?: InputMaybe<Array<ProductWhereUniqueInput>>;
  set?: InputMaybe<Array<ProductWhereUniqueInput>>;
};

export type ProductRelateToOneForCreateInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  create?: InputMaybe<ProductCreateInput>;
};

export type ProductRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  create?: InputMaybe<ProductCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type ProductUpdateArgs = {
  data: ProductUpdateInput;
  where: ProductWhereUniqueInput;
};

export type ProductUpdateInput = {
  category?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  count?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  excerpt?: InputMaybe<Scalars['String']>;
  isAvalaible?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<OptionRelateToManyForUpdateInput>;
  photo?: InputMaybe<Scalars['Upload']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  category?: InputMaybe<CategoryWhereInput>;
  count?: InputMaybe<IntNullableFilter>;
  description?: InputMaybe<StringFilter>;
  excerpt?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isAvalaible?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  options?: InputMaybe<OptionManyRelationFilter>;
  price?: InputMaybe<FloatNullableFilter>;
};

export type ProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  categories?: Maybe<Array<Category>>;
  categoriesCount?: Maybe<Scalars['Int']>;
  category?: Maybe<Category>;
  client?: Maybe<Client>;
  clients?: Maybe<Array<Client>>;
  clientsCount?: Maybe<Scalars['Int']>;
  customGetOrder?: Maybe<Order>;
  keystone: KeystoneMeta;
  option?: Maybe<Option>;
  options?: Maybe<Array<Option>>;
  optionsCount?: Maybe<Scalars['Int']>;
  order?: Maybe<Order>;
  orderLine?: Maybe<OrderLine>;
  orderLines?: Maybe<Array<OrderLine>>;
  orderLinesCount?: Maybe<Scalars['Int']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  productsCount?: Maybe<Scalars['Int']>;
  subOption?: Maybe<SubOption>;
  subOptions?: Maybe<Array<SubOption>>;
  subOptionsCount?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']>;
};

export type QueryCategoriesArgs = {
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: CategoryWhereInput;
};

export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput;
};

export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};

export type QueryClientArgs = {
  where: ClientWhereUniqueInput;
};

export type QueryClientsArgs = {
  orderBy?: Array<ClientOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ClientWhereInput;
};

export type QueryClientsCountArgs = {
  where?: ClientWhereInput;
};

export type QueryCustomGetOrderArgs = {
  orderId?: InputMaybe<Scalars['String']>;
};

export type QueryOptionArgs = {
  where: OptionWhereUniqueInput;
};

export type QueryOptionsArgs = {
  orderBy?: Array<OptionOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OptionWhereInput;
};

export type QueryOptionsCountArgs = {
  where?: OptionWhereInput;
};

export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};

export type QueryOrderLineArgs = {
  where: OrderLineWhereUniqueInput;
};

export type QueryOrderLinesArgs = {
  orderBy?: Array<OrderLineOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderLineWhereInput;
};

export type QueryOrderLinesCountArgs = {
  where?: OrderLineWhereInput;
};

export type QueryOrdersArgs = {
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: OrderWhereInput;
};

export type QueryOrdersCountArgs = {
  where?: OrderWhereInput;
};

export type QueryProductArgs = {
  where: ProductWhereUniqueInput;
};

export type QueryProductsArgs = {
  orderBy?: Array<ProductOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: ProductWhereInput;
};

export type QueryProductsCountArgs = {
  where?: ProductWhereInput;
};

export type QuerySubOptionArgs = {
  where: SubOptionWhereUniqueInput;
};

export type QuerySubOptionsArgs = {
  orderBy?: Array<SubOptionOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: SubOptionWhereInput;
};

export type QuerySubOptionsCountArgs = {
  where?: SubOptionWhereInput;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  where?: UserWhereInput;
};

export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type SubOption = {
  __typename?: 'SubOption';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  option?: Maybe<Option>;
};

export type SubOptionCreateInput = {
  name?: InputMaybe<Scalars['String']>;
  option?: InputMaybe<OptionRelateToOneForCreateInput>;
};

export type SubOptionManyRelationFilter = {
  every?: InputMaybe<SubOptionWhereInput>;
  none?: InputMaybe<SubOptionWhereInput>;
  some?: InputMaybe<SubOptionWhereInput>;
};

export type SubOptionOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type SubOptionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SubOptionWhereUniqueInput>>;
  create?: InputMaybe<Array<SubOptionCreateInput>>;
};

export type SubOptionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SubOptionWhereUniqueInput>>;
  create?: InputMaybe<Array<SubOptionCreateInput>>;
  disconnect?: InputMaybe<Array<SubOptionWhereUniqueInput>>;
  set?: InputMaybe<Array<SubOptionWhereUniqueInput>>;
};

export type SubOptionUpdateArgs = {
  data: SubOptionUpdateInput;
  where: SubOptionWhereUniqueInput;
};

export type SubOptionUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  option?: InputMaybe<OptionRelateToOneForUpdateInput>;
};

export type SubOptionWhereInput = {
  AND?: InputMaybe<Array<SubOptionWhereInput>>;
  NOT?: InputMaybe<Array<SubOptionWhereInput>>;
  OR?: InputMaybe<Array<SubOptionWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  option?: InputMaybe<OptionWhereInput>;
};

export type SubOptionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<PasswordState>;
  rol?: Maybe<UserRolType>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String'];
};

export type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordFailure
  | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String'];
};

export type UserCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  rol?: InputMaybe<UserRolType>;
};

export type UserOrderByInput = {
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  rol?: InputMaybe<OrderDirection>;
};

export enum UserRolType {
  Admin = 'ADMIN',
  Staff = 'STAFF',
}

export type UserRolTypeNullableFilter = {
  equals?: InputMaybe<UserRolType>;
  in?: InputMaybe<Array<UserRolType>>;
  not?: InputMaybe<UserRolTypeNullableFilter>;
  notIn?: InputMaybe<Array<UserRolType>>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  rol?: InputMaybe<UserRolType>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  rol?: InputMaybe<UserRolTypeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type OrderFragmentFragment = {
  __typename?: 'OrderOutput';
  id?: string | null;
  orderNumber?: number | null;
  createdAt?: any | null;
  status?: OrderStatusType | null;
  linesCount?: number | null;
  total?: number | null;
  metadata?: any | null;
};

export type PatchOrderMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Metadata>;
  orderId?: InputMaybe<Scalars['String']>;
}>;

export type PatchOrderMutation = {
  __typename?: 'Mutation';
  makeOrder?: {
    __typename?: 'OrderOutput';
    id?: string | null;
    orderNumber?: number | null;
    createdAt?: any | null;
    status?: OrderStatusType | null;
    linesCount?: number | null;
    total?: number | null;
    metadata?: any | null;
  } | null;
};

export type PatchOrderLineMutationVariables = Exact<{
  orderId?: InputMaybe<Scalars['String']>;
  orderLineId?: InputMaybe<Scalars['String']>;
  orderLine?: InputMaybe<OrderLineItem>;
}>;

export type PatchOrderLineMutation = {
  __typename?: 'Mutation';
  patchOrderLine?: {
    __typename?: 'OrderOutput';
    id?: string | null;
    orderNumber?: number | null;
    createdAt?: any | null;
    status?: OrderStatusType | null;
    linesCount?: number | null;
    total?: number | null;
    metadata?: any | null;
    lines?: Array<{
      __typename?: 'OrderLineOutput';
      id?: string | null;
      selection?: any | null;
      quantity?: number | null;
      orderId?: string | null;
      total?: number | null;
      productId?: string | null;
    } | null> | null;
  } | null;
};

export type DeleteOrderLineMutationVariables = Exact<{
  orderId?: InputMaybe<Scalars['String']>;
  lineOrderId?: InputMaybe<Scalars['String']>;
}>;

export type DeleteOrderLineMutation = {
  __typename?: 'Mutation';
  customDeleteOrderLine?: {
    __typename?: 'OrderOutput';
    id?: string | null;
    orderNumber?: number | null;
    createdAt?: any | null;
    status?: OrderStatusType | null;
    linesCount?: number | null;
    total?: number | null;
    metadata?: any | null;
    lines?: Array<{
      __typename?: 'OrderLineOutput';
      id?: string | null;
      selection?: any | null;
      quantity?: number | null;
      orderId?: string | null;
      total?: number | null;
      productId?: string | null;
    } | null> | null;
  } | null;
};

export type ProductFragmentFragment = {
  __typename?: 'Product';
  id: string;
  name?: string | null;
  count?: number | null;
  price?: number | null;
  excerpt?: string | null;
  description?: string | null;
  photo?: {
    __typename?: 'CloudinaryImage_File';
    id?: string | null;
    filename?: string | null;
    originalFilename?: string | null;
    mimetype?: string | null;
    publicUrl?: string | null;
    publicUrlTransformed?: string | null;
  } | null;
};

export type GetProductsQueryVariables = Exact<{
  includeOptions: Scalars['Boolean'];
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  products?: Array<{
    __typename?: 'Product';
    id: string;
    name?: string | null;
    count?: number | null;
    price?: number | null;
    excerpt?: string | null;
    description?: string | null;
    category?: {
      __typename?: 'Category';
      name?: string | null;
      id: string;
      productsCount?: number | null;
    } | null;
    options?: Array<{
      __typename?: 'Option';
      id: string;
      name?: string | null;
      limit?: number | null;
      label?: string | null;
      subOptions?: Array<{
        __typename?: 'SubOption';
        id: string;
        name?: string | null;
      }> | null;
    }> | null;
    photo?: {
      __typename?: 'CloudinaryImage_File';
      id?: string | null;
      filename?: string | null;
      originalFilename?: string | null;
      mimetype?: string | null;
      publicUrl?: string | null;
      publicUrlTransformed?: string | null;
    } | null;
  }> | null;
};

export type GetProductQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  includeOptions: Scalars['Boolean'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product?: {
    __typename?: 'Product';
    id: string;
    name?: string | null;
    count?: number | null;
    price?: number | null;
    excerpt?: string | null;
    description?: string | null;
    options?: Array<{
      __typename?: 'Option';
      id: string;
      name?: string | null;
      limit?: number | null;
      label?: string | null;
      subOptions?: Array<{
        __typename?: 'SubOption';
        id: string;
        name?: string | null;
      }> | null;
    }> | null;
    photo?: {
      __typename?: 'CloudinaryImage_File';
      id?: string | null;
      filename?: string | null;
      originalFilename?: string | null;
      mimetype?: string | null;
      publicUrl?: string | null;
      publicUrlTransformed?: string | null;
    } | null;
  } | null;
};

export type GetCategoriesQueryVariables = Exact<{
  includeProducts: Scalars['Boolean'];
}>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  categories?: Array<{
    __typename?: 'Category';
    id: string;
    name?: string | null;
    description?: string | null;
    title?: string | null;
    products?: Array<{
      __typename?: 'Product';
      id: string;
      name?: string | null;
      count?: number | null;
      price?: number | null;
      excerpt?: string | null;
      description?: string | null;
      photo?: {
        __typename?: 'CloudinaryImage_File';
        id?: string | null;
        filename?: string | null;
        originalFilename?: string | null;
        mimetype?: string | null;
        publicUrl?: string | null;
        publicUrlTransformed?: string | null;
      } | null;
    }> | null;
  }> | null;
};

export const OrderFragmentFragmentDoc = gql`
  fragment OrderFragment on OrderOutput {
    id
    orderNumber
    createdAt
    status
    linesCount
    total
    metadata
  }
`;
export const ProductFragmentFragmentDoc = gql`
  fragment productFragment on Product {
    id
    photo {
      id
      filename
      originalFilename
      mimetype
      publicUrl
      publicUrlTransformed
    }
    name
    count
    price
    excerpt
    description
  }
`;
export const PatchOrderDocument = gql`
  mutation patchOrder($email: String, $metadata: Metadata, $orderId: String) {
    makeOrder(email: $email, metadata: $metadata, orderId: $orderId) {
      ...OrderFragment
    }
  }
  ${OrderFragmentFragmentDoc}
`;
export const PatchOrderLineDocument = gql`
  mutation patchOrderLine(
    $orderId: String
    $orderLineId: String
    $orderLine: OrderLineItem
  ) {
    patchOrderLine(
      orderId: $orderId
      orderLineId: $orderLineId
      orderLine: $orderLine
    ) {
      ...OrderFragment
      lines {
        id
        selection
        quantity
        orderId
        total
        productId
      }
    }
  }
  ${OrderFragmentFragmentDoc}
`;
export const DeleteOrderLineDocument = gql`
  mutation deleteOrderLine($orderId: String, $lineOrderId: String) {
    customDeleteOrderLine(orderId: $orderId, lineOrderId: $lineOrderId) {
      ...OrderFragment
      lines {
        id
        selection
        quantity
        orderId
        total
        productId
      }
    }
  }
  ${OrderFragmentFragmentDoc}
`;
export const GetProductsDocument = gql`
  query getProducts($includeOptions: Boolean!) {
    products {
      category {
        name
        id
        productsCount
      }
      ...productFragment
      options @include(if: $includeOptions) {
        id
        name
        limit
        label
        subOptions {
          id
          name
        }
      }
    }
  }
  ${ProductFragmentFragmentDoc}
`;
export const GetProductDocument = gql`
  query getProduct($id: ID, $includeOptions: Boolean!) {
    product(where: { id: $id }) {
      ...productFragment
      options @include(if: $includeOptions) {
        id
        name
        limit
        label
        subOptions {
          id
          name
        }
      }
    }
  }
  ${ProductFragmentFragmentDoc}
`;
export const GetCategoriesDocument = gql`
  query getCategories($includeProducts: Boolean!) {
    categories {
      id
      name
      description
      title
      products @include(if: $includeProducts) {
        ...productFragment
      }
    }
  }
  ${ProductFragmentFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();
const PatchOrderDocumentString = print(PatchOrderDocument);
const PatchOrderLineDocumentString = print(PatchOrderLineDocument);
const DeleteOrderLineDocumentString = print(DeleteOrderLineDocument);
const GetProductsDocumentString = print(GetProductsDocument);
const GetProductDocumentString = print(GetProductDocument);
const GetCategoriesDocumentString = print(GetCategoriesDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    patchOrder(
      variables?: PatchOrderMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PatchOrderMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PatchOrderMutation>(
            PatchOrderDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'patchOrder',
        'mutation',
      );
    },
    patchOrderLine(
      variables?: PatchOrderLineMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: PatchOrderLineMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PatchOrderLineMutation>(
            PatchOrderLineDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'patchOrderLine',
        'mutation',
      );
    },
    deleteOrderLine(
      variables?: DeleteOrderLineMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: DeleteOrderLineMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<DeleteOrderLineMutation>(
            DeleteOrderLineDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'deleteOrderLine',
        'mutation',
      );
    },
    getProducts(
      variables: GetProductsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: GetProductsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetProductsQuery>(
            GetProductsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getProducts',
        'query',
      );
    },
    getProduct(
      variables: GetProductQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: GetProductQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetProductQuery>(
            GetProductDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getProduct',
        'query',
      );
    },
    getCategories(
      variables: GetCategoriesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: GetCategoriesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetCategoriesQuery>(
            GetCategoriesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'getCategories',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
