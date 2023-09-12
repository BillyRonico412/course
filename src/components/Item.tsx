import { ItemInterface } from "../utils"

const Item = (props: ItemInterface) => {
	return (
		<div className="flex gap-x-2 items-center">
			<input type="checkbox" />
			<p>{props.name}</p>
		</div>
	)
}

export default Item
