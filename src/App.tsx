import { Redirect, Route, Switch } from "wouter"
import Footer from "./components/Footer"
import Check from "./pages/Check"
import List from "./pages/List"
import Settings from "./pages/Settings"
import { useAtom } from "jotai"
import { itemFocusIdAtom } from "./utils"

const App = () => {
	const [, setItemFocusId] = useAtom(itemFocusIdAtom)
	return (
		<div
			className="h-screen flex flex-col w-screen overflow-x-hidden"
			onClick={() => setItemFocusId(null)}
		>
			<div className="flex-grow px-4 py-2">
				<Switch>
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
				</Switch>
			</div>
			<Footer />
		</div>
	)
}

export default App
