import { UserRepository } from "../repository/user-repository";

import type { UpdateUserSchema } from "../schemas/update-user.schema";

import { ResponseUser } from "@/utils/class/ResponseUser";
import { Password } from "@/utils/class/Password";

export class UserService {

    constructor(
        private repository = new UserRepository()
    ) { }

    getUser = async (userId: string) => {
        const user = await this.repository.findById(userId)
        if (!user)
            throw new Error("Usuário não encontrado")

        return ResponseUser.from(user)
    }

    update = async (userId: string, body: UpdateUserSchema) => {
        const user = await this.repository.findById(userId)
        if (!user)
            throw new Error("Usuário não encontrado")

        if (body.email !== user.email) {
            if (await this.repository.findByEmail(body.email))
                throw new Error("E-mail já cadastrado")
        }

        const updatedUser = await this.repository.update({
            id: user.id,
            ...body
        })

        return ResponseUser.from(updatedUser)
    }

    delete = async (userId: string, password: string) => {
        const user = await this.repository.findById(userId)
        if (!user)
            throw new Error("Usuário não encontrado")

        if (!(await Password.compare(password, user.password)))
            throw new Error("Senha incorreta")

        await this.repository.deleteById(user.id)
    }

}
