import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string

type PayloadProps = { id: string }

export const jwtUtil = {
    generate: (payload: PayloadProps) => {
        return jwt.sign(
            { id: payload?.id },
            JWT_SECRET,
            { expiresIn: "1d" }
        )
    },

    verify: <T>(token: string): T | null => {
        return jwt.verify(token, JWT_SECRET as string) as T
    },

}