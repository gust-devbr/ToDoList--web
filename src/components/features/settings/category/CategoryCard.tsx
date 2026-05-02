import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryList } from "./CategoriesList"
import { AddCategory } from "./AddCategory"
import { useCategories } from "@/hooks/useCategories"

export function CategoryCard() {
    const { categories, refetch } = useCategories()

    return (
        <div className="w-full md:max-w-100">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Categorias</CardTitle>
                    <CardDescription>Gerencie suas categorias</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                    <AddCategory onReload={refetch} />
                    <CategoryList categories={categories} onReload={refetch} />
                </CardContent>
            </Card>
        </div>
    )
}
