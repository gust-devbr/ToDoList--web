import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

export function AccountCard() {
    const { user } = useAuth()

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Conta</CardTitle>
                <CardDescription>Gerencie sua conta</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-row items-center gap-5">
                <div className="w-full max-w-[50%] space-y-2">
                    <Label className="text-[17px]" htmlFor="name">Nome</Label>
                    <Input
                        disabled
                        id="name"
                        value={user?.name}
                        className="text-[17px]! py-5"
                    />
                </div>

                <div className="w-full max-w-[50%] space-y-2">
                    <Label className="text-[17px]" htmlFor="email">E-mail</Label>
                    <Input
                        disabled
                        id="email"
                        value={user?.email}
                        className="text-[17px]! py-5"
                    />
                </div>
            </CardContent>
        </Card>
    )
}