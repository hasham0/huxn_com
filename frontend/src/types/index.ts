type RegisterTS = {
  email: string;
  password: string;
};

type LoginTS = Pick<RegisterTS, "email" | "password">;
export type { RegisterTS, LoginTS };
