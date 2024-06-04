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
export type {
  RegisterTS,
  LoginTS,
  UserProfileTS,
  CategoryTS,
  CategoryResponceTS,
};
