import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryList } from "./CategoriesList"
import { AddCategory } from "./AddCategory"

export function CategoryCard() {
    return (
        <div className="w-full md:max-w-100">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Categorias</CardTitle>
                    <CardDescription>Gerencie suas categorias</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                    <AddCategory />
                    <CategoryList />
                </CardContent>
            </Card>
        </div>
    )
}
