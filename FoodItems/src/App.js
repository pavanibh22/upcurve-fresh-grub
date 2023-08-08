import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fastfood from "./pages/Fastfood";
import Meals from "./pages/Meals";
import Beverages from "./pages/Beverages";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/fastfood' element={<Fastfood />} />
				<Route path='/meals' element={<Meals />} />
				<Route path='/beverages' element={<Beverages />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
