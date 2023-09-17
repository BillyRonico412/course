import { useAtom } from "jotai"
import { useCallback, useEffect, useRef } from "react"
import { LuX } from "react-icons/lu"
import { RxDragHandleDots2 } from "react-icons/rx"
import {
	ItemInterface,
	categoriesAtom,
	categoryFocusIdAtom,
	itemFocusIdAtom,
	lastItemAddedIdAtom,
} from "../utils"

interface Props {
	checked: boolean
	indexCategory: number
	indexItem: number
	item: ItemInterface
}

const Item = (props: Props) => {
	const [, setCategories] = useAtom(categoriesAtom)
	const [lastItemAddedId, setLastItemAddedId] = useAtom(lastItemAddedIdAtom)
	const refDivItem = useRef<HTMLDivElement>(null)
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
	useEffect(() => {
		if (lastItemAddedId !== null && lastItemAddedId === props.item.id) {
			refDivItem.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			})
			setLastItemAddedId(null)
		}
	}, [lastItemAddedId, props.item.id, setLastItemAddedId])

	const onDelete = useCallback(() => {
		setCategories((categories) => {
			categories[props.indexCategory].items.splice(props.indexItem, 1)
			return [...categories]
		})
	}, [props.indexCategory, props.indexItem, setCategories])
	const [itemFocusId, setItemFocusId] = useAtom(itemFocusIdAtom)
	const [, setCategoryFocusId] = useAtom(categoryFocusIdAtom)
	if (props.item.checked !== props.checked) {
		return <></>
	}
	return (
		<div
			ref={refDivItem}
			className={`flex gap-x-2 items-center pl-8 pr-4 py-2 ${
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
			<input
				type="checkbox"
				onChange={(e) => {
					setCategories((categories) => {
						categories[props.indexCategory].items[props.indexItem].checked =
							e.currentTarget.checked
						return [...categories]
					})
				}}
				checked={props.item.checked}
			/>
			<input
				type="text"
				className={`w-full outline-none bg-inherit ${
					props.item.checked ? "line-through text-opacity-50" : ""
				}`}
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
