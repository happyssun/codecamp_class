export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
}

export interface BoardReturn {
  __typename?: "BoardReturn";
  contents?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  like?: Maybe<Scalars["Int"]>;
  number?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
  writer?: Maybe<Scalars["String"]>;
}

export enum CacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export interface CreateProductInput {
  detail?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Int"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  createBoard?: Maybe<Return>;
  createProduct?: Maybe<Return>;
  createProfile?: Maybe<Return>;
  deleteBoard?: Maybe<Return>;
  deleteProduct?: Maybe<Return>;
  deleteProfile?: Maybe<Return>;
  updateBoard?: Maybe<Return>;
  updateProduct?: Maybe<Return>;
  updateProfile?: Maybe<Return>;
}

export interface MutationCreateBoardArgs {
  contents?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  writer?: InputMaybe<Scalars["String"]>;
}

export interface MutationCreateProductArgs {
  createProductInput: CreateProductInput;
  seller?: InputMaybe<Scalars["String"]>;
}

export interface MutationCreateProfileArgs {
  age?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  school?: InputMaybe<Scalars["String"]>;
}

export interface MutationDeleteBoardArgs {
  number?: InputMaybe<Scalars["Int"]>;
}

export interface MutationDeleteProductArgs {
  productId?: InputMaybe<Scalars["ID"]>;
}

export interface MutationDeleteProfileArgs {
  name?: InputMaybe<Scalars["String"]>;
}

export interface MutationUpdateBoardArgs {
  contents?: InputMaybe<Scalars["String"]>;
  number?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
  writer?: InputMaybe<Scalars["String"]>;
}

export interface MutationUpdateProductArgs {
  productId?: InputMaybe<Scalars["ID"]>;
  updateProductInput: UpdateProductInput;
}

export interface MutationUpdateProfileArgs {
  age?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
  school?: InputMaybe<Scalars["String"]>;
}

export interface ProductReturn {
  __typename?: "ProductReturn";
  _id?: Maybe<Scalars["ID"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  detail?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Int"]>;
  seller?: Maybe<Scalars["String"]>;
}

export interface ProfileReturn {
  __typename?: "ProfileReturn";
  age?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["Int"]>;
  school?: Maybe<Scalars["String"]>;
}

export interface Query {
  __typename?: "Query";
  fetchBoard?: Maybe<BoardReturn>;
  fetchBoards?: Maybe<BoardReturn[]>;
  fetchBoardsCount: Scalars["Int"];
  fetchProduct?: Maybe<ProductReturn>;
  fetchProducts?: Maybe<ProductReturn[]>;
  fetchProductsCount: Scalars["Int"];
  fetchProfile?: Maybe<ProfileReturn>;
  fetchProfiles?: Maybe<ProfileReturn[]>;
  fetchProfilesCount: Scalars["Int"];
}

export interface QueryFetchBoardArgs {
  number?: InputMaybe<Scalars["Int"]>;
}

export interface QueryFetchBoardsArgs {
  page?: InputMaybe<Scalars["Int"]>;
}

export interface QueryFetchProductArgs {
  productId?: InputMaybe<Scalars["ID"]>;
}

export interface QueryFetchProductsArgs {
  page?: InputMaybe<Scalars["Int"]>;
}

export interface QueryFetchProfileArgs {
  name?: InputMaybe<Scalars["String"]>;
}

export interface QueryFetchProfilesArgs {
  page?: InputMaybe<Scalars["Int"]>;
}

export interface Return {
  __typename?: "Return";
  _id?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["Int"]>;
}

export interface UpdateProductInput {
  detail?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Int"]>;
}
