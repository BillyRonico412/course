import { useAtom } from "jotai"
import { useCallback, useState } from "react"
import { LuFolderPlus, LuListPlus } from "react-icons/lu"
import { v4 } from "uuid"
import {
	categoriesAtom,
	lastCategoryAddedIdAtom,
	lastItemAddedIdAtom,
} from "../utils"

const ItemAdder = () => {
	const [name, setName] = useState("")
	const [, setCategories] = useAtom(categoriesAtom)
	const [, setLastItemAddedId] = useAtom(lastItemAddedIdAtom)
	const [, setLastCategoryAddedId] = useAtom(lastCategoryAddedIdAtom)
	const addItem = useCallback(() => {
		if (name.trim() === "") {
			return
		}
		const newItem = {
			id: v4(),
			name: name.trim(),
			checked: false,
		}
		setLastItemAddedId(newItem.id)
		setCategories((categories) => {
			categories[categories.length - 1].items.push(newItem)
			return [...categories]
		})
		setName("")
	}, [name, setCategories, setLastItemAddedId])
	const addCategory = useCallback(() => {
		if (name.trim() === "") {
			return
		}

		const newCategory = {
			id: v4(),
			name: name.trim(),
			items: [],
		}

		setLastCategoryAddedId(newCategory.id)

		setCategories((categories) => {
			categories.push(newCategory)
			return [...categories]
		})
		setName("")
	}, [name, setCategories, setLastCategoryAddedId])
	return (
		<div className="flex flex-col gap-y-4">
			<input
				className="w-full px-4 py-2 bg-gray-100 outline-none"
				placeholder="Ajouter un element"
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addItem()
					}
				}}
			/>
			<div className="flex gap-x-2">
				<button
					className="flex gap-x-2 justify-center items-center w-full py-2 bg-blue-600 rounded text-white"
					onClick={() => {
						addCategory()
					}}
				>
					<LuFolderPlus />
					Categorie
				</button>
				<button
					className="flex gap-x-2 justify-center items-center w-full py-2 bg-blue-600 rounded text-white"
					onClick={() => {
						addItem()
					}}
				>
					Article
					<LuListPlus />
				</button>
			</div>
		</div>
	)
}

export default ItemAdder
