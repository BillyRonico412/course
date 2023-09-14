import { useAtom } from "jotai"
import { ReactSortable } from "react-sortablejs"
import { categoriesAtom } from "../utils"
import Category from "./Category"

interface Props {
	checked: boolean
}

const ListGeneric = (props: Props) => {
	const [categories, setCategories] = useAtom(categoriesAtom)
	return (
		<ReactSortable
			list={categories}
			setList={(categories) => {
				if (categories.length === 1 && categories[0].items.length === 0) {
					return
				}
				setCategories(categories)
			}}
			handle=".handle-category"
			group={`nested-${props.checked}`}
		>
			{categories.map((category, indexCategory) => (
				<Category
					key={category.id}
					category={category}
					indexCategory={indexCategory}
					checked={props.checked}
				/>
			))}
		</ReactSortable>
	)
}

export default ListGeneric
