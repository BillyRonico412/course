import { useAtom } from "jotai"
import { useCallback, useState } from "react"
import { LuFolderPlus, LuListPlus } from "react-icons/lu"
import { DEFAULT_CATEGORY_UUID, categoriesAtom } from "../utils"
import { v4 } from "uuid"

const ItemAdder = () => {
	const [name, setName] = useState("")
	const [, setCategories] = useAtom(categoriesAtom)
	const addItem = useCallback(() => {
		if (name.trim() === "") {
			return
		}
		setCategories((categories) => {
			const defaultCategory = categories.find(
				(category) => category.id === DEFAULT_CATEGORY_UUID,
			)
			if (!defaultCategory) {
				return categories
			}
			defaultCategory.items.push({
				id: v4(),
				name: name.trim(),
				checked: false,
			})
			return [...categories]
		})
		setName("")
	}, [name, setCategories])
	const addCategory = useCallback(() => {
		if (name.trim() === "") {
			return
		}
		setCategories((categories) => {
			categories.push({
				id: v4(),
				name: name.trim(),
				items: [],
			})
			return [...categories]
		})
		setName("")
	}, [name, setCategories])
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
