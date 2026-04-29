import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const userService = {
    findById: async (id: string) => {
        return await prisma.user.findFirst({ where: { id } });
    },

    findByEmail: async (email: string) => {
        return await prisma.user.findUnique({ where: { email } });
    },

    create: async (name: string, email: string, password: string) => {
        const hashed = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: { name, email, password: hashed }
        })
    },

}