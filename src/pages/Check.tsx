import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { categoriesAtom } from "../utils"

const Check = () => {
	const [index, setIndex] = useState(0)
	const [indexItemsChecked, setIndexItemsChecked] = useState<
		[number, number][] | null
	>(null)
	const [categories, setCategories] = useAtom(categoriesAtom)
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (indexItemsChecked === null) {
				return
			}
			setCategories((categories) => {
				categories[indexItemsChecked[index][0]].items[
					indexItemsChecked[index][1]
				].checked = false
				return [...categories]
			})
			setIndex((index) => index + 1)
		},
		onSwipedRight: () => {
			if (indexItemsChecked === null) {
				return
			}
			setCategories((categories) => {
				categories[indexItemsChecked[index][0]].items[
					indexItemsChecked[index][1]
				].checked = true
				return [...categories]
			})
			setIndex((index) => index + 1)
		},
	})

	useEffect(() => {
		if (indexItemsChecked === null) {
			setIndexItemsChecked(
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
	}, [categories, indexItemsChecked])

	if (indexItemsChecked === null) {
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

	if (indexItemsChecked.length === 0) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-2xl font-bold text-center">Tout est checké</div>
			</div>
		)
	}

	if (index >= indexItemsChecked.length) {
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
				categories[indexItemsChecked[index][0]].items[
					indexItemsChecked[index][1]
				].name
			}
		</div>
	)
}

export default Check
