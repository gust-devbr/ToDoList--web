import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET!

interface JwtPayload { id: string }

export class Jwt {

    static generate(userId: string) {
        return jwt.sign(
            { id: userId },
            SECRET,
            { expiresIn: "7d" }
        )
    }

    static verify(token: string) {
        return jwt.verify(
            token,
            SECRET
        ) as JwtPayload
    }

}