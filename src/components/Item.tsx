import { useAtom } from "jotai"
import { useCallback } from "react"
import { LuX } from "react-icons/lu"
import { RxDragHandleDots2 } from "react-icons/rx"
import {
	ItemInterface,
	categoriesAtom,
	categoryFocusIdAtom,
	itemFocusIdAtom,
} from "../utils"

interface Props {
	indexCategory: number
	indexItem: number
	item: ItemInterface
}

const Item = (props: Props) => {
	const [, setCategories] = useAtom(categoriesAtom)
	const onInput = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setCategories((categories) => {
				categories[props.indexCategory].items[props.indexItem].name =
					e.currentTarget.value
				return [...categories]
			})
		},
		[props.indexCategory, props.indexItem, setCategories],
	)
	const onDelete = useCallback(() => {
		setCategories((categories) => {
			categories[props.indexCategory].items.splice(props.indexItem, 1)
			return [...categories]
		})
	}, [props.indexCategory, props.indexItem, setCategories])
	const [itemFocusId, setItemFocusId] = useAtom(itemFocusIdAtom)
	const [, setCategoryFocusId] = useAtom(categoryFocusIdAtom)
	return (
		<div
			className={`flex gap-x-2 items-center px-2 py-2 ${
				itemFocusId !== null && itemFocusId === props.item.id
					? "bg-gray-100"
					: "bg-white"
			}`}
			onClick={(e) => {
				setCategoryFocusId(null)
				setItemFocusId(props.item.id)
				e.stopPropagation()
			}}
		>
			<RxDragHandleDots2 className="handle-item" />
			<input type="checkbox" />
			<input
				type="text"
				className="w-full outline-none bg-inherit"
				value={props.item.name}
				onInput={onInput}
			/>
			{itemFocusId === props.item.id && (
				<button className="ml-auto" onClick={onDelete}>
					<LuX />
				</button>
			)}
		</div>
	)
}

export default Item
