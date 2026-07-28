import { AuthController } from "@/modules/auth/controller/auth-controller";

export async function POST() {
    return await new AuthController().handleLogout()
}