import ItemAdder from "../components/ItemAdder"
import ListGeneric from "../components/ListGeneric"

const List = () => {
	return (
		<div className="h-full flex flex-col">
			<h1 className="text-2xl font-bold text-center">Courses</h1>
			<div className="flex-1 overflow-y-auto flex flex-col gap-y-6 px-4 py-4">
				<ListGeneric checked={false} />
				<hr />
				<ListGeneric checked={true} />
			</div>
			<div className="px-4">
				<ItemAdder />
			</div>
		</div>
	)
}

export default List
