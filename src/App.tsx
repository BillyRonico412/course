import { useAtom } from "jotai"
import { Redirect, Route, Router } from "wouter"
import {
	BaseLocationHook,
	navigate,
	useLocationProperty,
} from "wouter/use-location"
import Footer from "./components/Footer"
import Check from "./pages/Check"
import List from "./pages/List"
import Settings from "./pages/Settings"
import { categoryFocusIdAtom, itemFocusIdAtom } from "./utils"

const App = () => {
	const [, setItemFocusId] = useAtom(itemFocusIdAtom)
	const [, setCategoryFocusId] = useAtom(categoryFocusIdAtom)
	const hashLocation = () => window.location.hash.replace(/^#/, "") || "/"
	const hashNavigate = (to: string) => navigate(`#${to}`)
	const useHashLocation: BaseLocationHook = () => {
		const location = useLocationProperty(hashLocation)
		return [location, hashNavigate]
	}
	return (
		<div
			className="h-screen flex flex-col w-screen overflow-x-hidden"
			onClick={() => {
				setItemFocusId(null)
				setCategoryFocusId(null)
			}}
		>
			<div className="flex-grow px-4 py-2">
				<Router hook={useHashLocation}>
					<Route path="/list">
						<List />
					</Route>
					<Route path="/check">
						<Check />
					</Route>
					<Route path="/settings">
						<Settings />
					</Route>
					<Redirect to="/list" />
				</Router>
			</div>
			<Footer />
		</div>
	)
}

export default App
