import { useAtom } from "jotai"
import { useCallback, useMemo } from "react"
import { LuX } from "react-icons/lu"
import { RxDragHandleDots2 } from "react-icons/rx"
import { ReactSortable } from "react-sortablejs"
import {
	CategoryInterface,
	DEFAULT_CATEGORY_UUID,
	categoriesAtom,
	categoryFocusIdAtom,
	itemFocusIdAtom,
} from "../utils"
import Item from "./Item"

interface Props {
	indexCategory: number
	category: CategoryInterface
	checked: boolean
}

const Category = (props: Props) => {
	const [, setCategories] = useAtom(categoriesAtom)
	const onDelete = useCallback(() => {
		setCategories((categories) => {
			categories.splice(props.indexCategory, 1)
			return [...categories]
		})
	}, [props.indexCategory, setCategories])
	const [categoryFocusId, setCategoryFocusId] = useAtom(categoryFocusIdAtom)
	const [, setItemFocusId] = useAtom(itemFocusIdAtom)
	const items = props.category.items
		.map((item, indexItem) => [item, indexItem] as const)
		.filter(([item]) => item.checked === props.checked)

	return (
		<div className="flex flex-col">
			<div
				className={`flex items-center gap-x-4 py-2 ${
					categoriesAtom !== null && categoryFocusId === props.category.id
						? "bg-gray-100"
						: "bg-white"
				}`}
				onClick={(e) => {
					setItemFocusId(null)
					setCategoryFocusId(props.category.id)
					e.stopPropagation()
				}}
			>
				{!props.checked && <RxDragHandleDots2 className="handle-category" />}
				<input
					type="text"
					value={props.category.name}
					className={`inline-block flex-grow outline-none bg-inherit ${
						props.checked ? "line-through text-opacity-50" : ""
					}`}
					onInput={(e) => {
						setCategories((categories) => {
							categories[props.indexCategory].name = e.currentTarget.value
							return [...categories]
						})
					}}
				/>
				{props.category.id === categoryFocusId &&
					props.category.id !== DEFAULT_CATEGORY_UUID && (
						<button onClick={onDelete} className="ml-auto">
							<LuX />
						</button>
					)}
			</div>
			<div className="flex flex-col">
				<ReactSortable
					list={items.map(([item]) => item)}
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
					{items.map(([item, indexItem]) => (
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
