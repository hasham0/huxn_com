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
  id?: string;
  name: string;
  description: string;
  price: number;
  category: { _id: string };
  quantity: number;
  brand: string;
  image: string;
  stock: number;
};
export type {
  RegisterTS,
  LoginTS,
  UserProfileTS,
  CategoryTS,
  ProductTS,
  CategoryResponceTS,
};
