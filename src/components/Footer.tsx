import { LuCheckCheck, LuCog, LuList } from "react-icons/lu"
import FooterItem from "./FooterItem"

const Footer = () => {
	return (
		<div className="h-[50px] flex border-t-[1px] text-2xl">
			<FooterItem icon={<LuList />} link="#/list" />
			<FooterItem icon={<LuCheckCheck />} link="#/check" />
			<FooterItem icon={<LuCog />} link="#/settings" />
		</div>
	)
}

export default Footer
