import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export interface ItemInterface {
	id: string
	name: string
	checked: boolean
}

export interface CategoryInterface {
	id: string
	name: string
	items: ItemInterface[]
}

export const DEFAULT_CATEGORY_UUID = "00000000-0000-0000-0000-000000000000"

export const categoriesAtom = atomWithStorage<CategoryInterface[]>(
	"categoriesAtom",
	[
		{
			id: DEFAULT_CATEGORY_UUID,
			name: "Default",
			items: [],
		},
	],
)

export const itemFocusIdAtom = atom<string | null>(null)
export const categoryFocusIdAtom = atom<string | null>(null)
export const searchAtom = atom<string>("")
export const lastItemAddedIdAtom = atom<string | null>(null)
export const lastCategoryAddedIdAtom = atom<string | null>(null)
