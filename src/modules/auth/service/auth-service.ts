import { AuthRepository } from "../repository/auth.repository";

import type { RegisterSchemaType } from "../schemas/register-user.schema";
import type { LoginSchemaType } from "../schemas/login-user.schema";

import { Password } from "@/utils/class/Password";
import { ResponseUser } from "@/utils/class/ResponseUser";
import { Jwt } from "@/utils/class/Jwt";

export class AuthService {

    constructor(
        private repository = new AuthRepository()
    ) { }

    register = async (body: RegisterSchemaType) => {
        const { password, email, name } = body

        const exists =
            await this.repository.findByEmail(email)

        if (exists)
            throw new Error("Usuário já cadastrado")

        const hash = await Password.hash(password)

        const user = await this.repository.create({
            name,
            email,
            password: hash,
        })

        const token = Jwt.generate(user.id)

        return {
            user: ResponseUser.from(user),
            token
        }
    }

    login = async (body: LoginSchemaType) => {
        const exists =
            await this.repository.findByEmail(body.email)

        if (!exists)
            throw new Error("Credenciais inválidas")

        const valid = await Password.compare(
            body.password,
            exists.password
        )

        if (!valid)
            throw new Error("Credenciais inválidas")

        const token = Jwt.generate(exists.id)

        return {
            user: ResponseUser.from(exists),
            token
        }
    }

}
