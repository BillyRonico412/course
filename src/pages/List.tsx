import {
	DndContext,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useAtom } from "jotai"
import Category from "../components/Category"
import ItemAdder from "../components/ItemAdder"
import { categoriesAtom } from "../utils"

const List = () => {
	const [categories] = useAtom(categoriesAtom)
	const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))
	return (
		<div className="h-full flex flex-col">
			<h1 className="text-2xl font-bold text-center">Courses</h1>
			<div className="flex-grow">
				<div className="flex flex-col gap-y-6">
					<DndContext sensors={sensors} collisionDetection={closestCenter}>
						<SortableContext
							items={Object.keys(categories)}
							strategy={verticalListSortingStrategy}
						>
							{Object.entries(categories).map(([id, category]) => (
								<Category key={id} id={id} category={category} />
							))}
						</SortableContext>
					</DndContext>
				</div>
			</div>
			<div>
				<ItemAdder />
			</div>
		</div>
	)
}

export default List
