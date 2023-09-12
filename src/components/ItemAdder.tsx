import { useAtom } from "jotai"
import { useCallback, useState } from "react"
import { UUID_DEFAULT_CATEGORY, categoriesAtom } from "../utils"
import { LuFolderPlus, LuListPlus } from "react-icons/lu"
import { v4 } from "uuid"

const ItemAdder = () => {
	const [name, setName] = useState("")
	const [, setCategories] = useAtom(categoriesAtom)
	const addItem = useCallback(() => {
		if (name.trim() === "") {
			return
		}
		setCategories((categories) => ({
			...categories,
			[UUID_DEFAULT_CATEGORY]: {
				...categories[UUID_DEFAULT_CATEGORY],
				items: [
					...categories[UUID_DEFAULT_CATEGORY].items,
					{
						name: name.trim(),
						checked: false,
					},
				],
			},
		}))
		setName("")
	}, [name, setCategories])
	const addCategory = useCallback(() => {
		if (name.trim() === "") {
			return
		}
		setCategories((categories) => ({
			...categories,
			[v4()]: {
				name: name.trim(),
				items: [],
			},
		}))
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
