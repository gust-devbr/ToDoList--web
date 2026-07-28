import { User } from "@prisma/client";

export class ResponseUser {

    static from(user: User) {
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    }

}