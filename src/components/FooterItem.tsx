import { Link, useLocation } from "wouter"

interface Props {
	icon: JSX.Element
	link: string
}
const FooterItem = (props: Props) => {
	const [location] = useLocation()
	return (
		<Link href={props.link}>
			<div
				className={`w-full flex justify-center items-center ${
					location === props.link ? "text-blue-600" : ""
				}`}
			>
				{props.icon}
			</div>
		</Link>
	)
}

export default FooterItem
