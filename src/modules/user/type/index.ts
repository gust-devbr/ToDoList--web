import { User } from "@prisma/client";

export type UserWithoutPassType = Omit<User, "password">