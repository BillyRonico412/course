import { LuCheckCheck, LuList } from "react-icons/lu"
import FooterItem from "./FooterItem"

const Footer = () => {
	return (
		<div className="flex border-t-[1px] text-2xl">
			<FooterItem icon={<LuList />} link="/list" />
			<FooterItem icon={<LuCheckCheck />} link="/check" />
		</div>
	)
}

export default Footer
