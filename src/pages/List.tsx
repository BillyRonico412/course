import { useAtom } from "jotai"
import Category from "../components/Category"
import ItemAdder from "../components/ItemAdder"
import { categoriesAtom } from "../utils"
import { ReactSortable } from "react-sortablejs"

const List = () => {
	const [categories, setCategories] = useAtom(categoriesAtom)
	return (
		<div className="h-full flex flex-col">
			<h1 className="text-2xl font-bold text-center">Courses</h1>
			<div className="flex-grow">
				<div className="flex flex-col gap-y-6">
					<ReactSortable
						list={categories}
						setList={(categories) => {
							if (categories.length === 1 && categories[0].items.length === 0) {
								return
							}
							setCategories(categories)
						}}
						handle=".handle-category"
						group="nested"
					>
						{categories.map((category, indexCategory) => (
							<Category
								key={category.id}
								category={category}
								indexCategory={indexCategory}
							/>
						))}
					</ReactSortable>
				</div>
			</div>
			<div>
				<ItemAdder />
			</div>
		</div>
	)
}

export default List
