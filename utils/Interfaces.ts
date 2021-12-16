import { Document, LeanDocument, Model } from 'mongoose';

export interface ProductPoJo {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

export interface ProductDoc extends ProductPoJo, Document {}
export interface ProductDocLean extends LeanDocument<ProductDoc> {}
export interface ProductObjLean extends LeanDocument<ProductObj> {}
export interface ProductModel extends Model<ProductDoc> {}
export interface ProductObj extends ProductPoJo {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
