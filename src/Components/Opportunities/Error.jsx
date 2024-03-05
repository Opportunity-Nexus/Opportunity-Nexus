import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<div className="flex justify-center items-center min-h-[80vh] ">
			<div className="bg-white dark:bg-midnightblue dark:text-white  p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center lg:w-2/4">
				<div className="flex flex-col items-center justify-center">
					<h1 className="mb-6 text-6xl font-bold animate-bounce">Oops!</h1>
					<p className="font-semibold">It seems we're having trouble fetching the data at the moment.</p>
					<p className="font-semibold">
						Rest assured! our team is working to fix the issue as quickly as
						possible.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Error;
