import { z } from "zod";

export const userTem = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string().email(),
  isAdmin: z.boolean(),
});

export type userTemTS = z.infer<typeof userTem>;
