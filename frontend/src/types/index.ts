type RegisterTS = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type LoginTS = Pick<RegisterTS, "email" | "password">;

type UserProfileTS = RegisterTS & {
  _id: string;
  isAdmin?: boolean;
};

type CategoryTS = {
  name: string;
  _id: string;
};
type CategoryResponceTS = {
  message: string;
  data: CategoryTS[];
};

type ProductTS = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: "";
  quantity: number;
  brand: string;
  image: string;
  numReviews?: any;
  stock: number;
  rating?: number;
  createdAt?: Date;
};

type ImgTS = {
  originalFilename: string;
  secureUrl: string;
  imgUrl: string;
};
export type {
  RegisterTS,
  LoginTS,
  UserProfileTS,
  CategoryTS,
  ProductTS,
  CategoryResponceTS,
  ImgTS,
};
