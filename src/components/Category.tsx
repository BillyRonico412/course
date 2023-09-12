import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CategoryInterface } from "../utils"
import Item from "./Item"

interface Props {
	id: string
	category: CategoryInterface
}

const Category = (props: Props) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}
	return (
		<div
			className="flex flex-col gap-y-4"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<div className="flex items-center gap-x-4">
				<p>{props.category.name}</p>
				<hr className="w-full" />
			</div>
			<div className="flex flex-col gap-y-2">
				{Object.entries(props.category.items).map(([id, item]) => (
					<Item key={id} {...item} />
				))}
			</div>
		</div>
	)
}

export default Category
