import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { categoriesAtom } from "../utils"

const Check = () => {
	const [index, setIndex] = useState(0)
	const [indexItemsNotChecked, setIndexItemsNotChecked] = useState<
		[number, number][] | null
	>(null)
	const [categories, setCategories] = useAtom(categoriesAtom)
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (indexItemsNotChecked === null) {
				return
			}
			const item =
				categories[indexItemsNotChecked[index][0]].items[
					indexItemsNotChecked[index][1]
				]
			console.log(item)
			item.checked = false
			console.log(item)
			setCategories([...categories])
			setIndex((index) => index + 1)
		},
		onSwipedRight: () => {
			if (indexItemsNotChecked === null) {
				return
			}
			const item =
				categories[indexItemsNotChecked[index][0]].items[
					indexItemsNotChecked[index][1]
				]
			console.log(item)
			item.checked = true
			console.log(item)
			setCategories([...categories])
			setIndex((index) => index + 1)
		},
	})

	useEffect(() => {
		if (indexItemsNotChecked === null) {
			setIndexItemsNotChecked(
				categories
					.flatMap((category, indexCategory) =>
						category.items.map(
							(_, indexItem) => [indexCategory, indexItem] as [number, number],
						),
					)
					.filter(
						([indexCategory, indexItem]) =>
							categories[indexCategory].items[indexItem].checked === false,
					),
			)
		}
	}, [categories, indexItemsNotChecked])

	if (indexItemsNotChecked === null) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-2xl font-bold text-center">Chargement...</div>
			</div>
		)
	}

	if (categories.length === 0) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-2xl font-bold text-center">Aucune liste</div>
			</div>
		)
	}

	if (indexItemsNotChecked.length === 0) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-2xl font-bold text-center">Tout est checké</div>
			</div>
		)
	}

	if (index >= indexItemsNotChecked.length) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-2xl font-bold text-center">Fin de la liste</div>
			</div>
		)
	}

	return (
		<div
			className="w-full h-full flex justify-center items-center text-3xl font-semibold"
			{...handlers}
		>
			{
				categories[indexItemsNotChecked[index][0]].items[
					indexItemsNotChecked[index][1]
				].name
			}
		</div>
	)
}

export default Check
