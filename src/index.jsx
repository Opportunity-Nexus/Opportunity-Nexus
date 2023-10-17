import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PreLoader from "./Components/Preloader";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</>
	)
);

function App() {
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<div>
			{loading ? <PreLoader /> : <RouterProvider router={router} />}  
			{/* <RouterProvider router={router} />  */}
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
