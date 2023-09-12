import { atomWithStorage } from "jotai/utils"

export interface ItemInterface {
	name: string
	checked: boolean
}

export interface CategoryInterface {
	name: string
	items: ItemInterface[]
}

export const UUID_DEFAULT_CATEGORY = "00000000-0000-0000-0000-000000000000"

export const categoriesAtom = atomWithStorage<
	Record<string, CategoryInterface>
>("categoriesAtom", {
	[UUID_DEFAULT_CATEGORY]: {
		name: "Default",
		items: [] as ItemInterface[],
	},
})
