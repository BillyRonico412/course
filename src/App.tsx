import { useAtom } from "jotai"
import { Redirect, Route, Router } from "wouter"
import Footer from "./components/Footer"
import Check from "./pages/Check"
import List from "./pages/List"
import { categoryFocusIdAtom, itemFocusIdAtom } from "./utils"

const App = () => {
	const [, setItemFocusId] = useAtom(itemFocusIdAtom)
	const [, setCategoryFocusId] = useAtom(categoryFocusIdAtom)
	return (
		<div
			className="h-screen grid grid-rows-[minmax(0,1fr)_50px] w-screen overflow-x-hidden"
			onClick={() => {
				setItemFocusId(null)
				setCategoryFocusId(null)
			}}
		>
			<div className="flex-grow py-2">
				<Router>
					<Route path="/list">
						<List />
					</Route>
					<Route path="/check">
						<Check />
					</Route>
					<Redirect to="/list" />
				</Router>
			</div>
			<Footer />
		</div>
	)
}

export default App
