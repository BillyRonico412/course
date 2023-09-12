import { RxDragHandleDots2 } from "react-icons/rx"
import { ReactSortable } from "react-sortablejs"
import {
	CategoryInterface,
	DEFAULT_CATEGORY_UUID,
	categoriesAtom,
} from "../utils"
import Item from "./Item"
import { useAtom } from "jotai"
import { LuX } from "react-icons/lu"
import { useCallback } from "react"

interface Props {
	indexCategory: number
	category: CategoryInterface
}

const Category = (props: Props) => {
	const [, setCategories] = useAtom(categoriesAtom)
	const onDelete = useCallback(() => {
		setCategories((categories) => {
			categories.splice(props.indexCategory, 1)
			return [...categories]
		})
	}, [props.indexCategory, setCategories])
	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex items-center gap-x-4">
				<RxDragHandleDots2 className="handle-category" />
				<p>{props.category.name}</p>
				<hr className="w-full" />
				{props.category.id !== DEFAULT_CATEGORY_UUID && (
					<button onClick={onDelete}>
						<LuX />
					</button>
				)}
			</div>
			<div className="flex flex-col">
				<ReactSortable
					list={props.category.items}
					setList={(items) => {
						if (items.length === 0) {
							return
						}
						props.category.items = items
						setCategories((categories) => [...categories])
					}}
					group={"shared"}
					handle=".handle-item"
				>
					{props.category.items.map((item, indexItem) => (
						<Item
							key={item.id}
							indexCategory={props.indexCategory}
							indexItem={indexItem}
							item={item}
						/>
					))}
				</ReactSortable>
			</div>
		</div>
	)
}

export default Category
