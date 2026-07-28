"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteAccountModal } from "@/modules/user/components/DeleteAccountModal"

export function SecurityCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Segurança</CardTitle>
            </CardHeader>

            <CardContent>
                <DeleteAccountModal />
            </CardContent>
        </Card>
    )
}
