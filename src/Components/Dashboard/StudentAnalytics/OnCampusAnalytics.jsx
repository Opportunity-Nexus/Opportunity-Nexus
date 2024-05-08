import React, { useState, useEffect } from "react";
import { FaBookReader } from "react-icons/fa";
import { onCampusOpportunityAnalytics } from "../../../Services/Operations/StudentAnalytics";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import OnCampusPieChart from "./OnCampusPieChart";

const OnCampusAnalytics = () => {
	//eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [onCampusOppData, setOnCampusOppData] = useState(null);
	console.log("ONCAMPUS DATA", onCampusOppData);
	const { token } = useSelector((state) => state.auth);
	const fetchOnCampusOpportunityDetails = () => {
		try {
			const result = onCampusOpportunityAnalytics(token, setOnCampusOppData);
			if (result) {
				setOnCampusOppData(result);
			}
		} catch (error) {
			console.log("Error while fetching oncampus opportunity data!!");
		}
	};
	function Number({ n }) {
		const { number } = useSpring({
			from: { number: 0 },
			number: n,
			delay: 50,
			config: { mass: 1, tension: 20, fraction: 10 },
		});
		return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
	}
	useEffect(() => {
		setLoading(true);
		fetchOnCampusOpportunityDetails();
		setLoading(false);
		//eslint-disable-next-line
	}, []);
	return (
		<>
			<div className="flex flex-col space-y-8 rounded-md border border-1 dark:border-richblack-700 sm:p-6 dark:text-gray-400">
				<span className="flex items-center gap-2">
					<FaBookReader />
					<h1 className="font-bold text-xl ">
						Discover the pulse of our on-campus opportunities
					</h1>
				</span>
				<div className="flex justify-center items-center dark:text-gray-400 gap-2 py-8">
					{/*-------------Pie-Chart------------ */}
					<div className="flex-grow h-60 md:h-80 p-2 ">
						<OnCampusPieChart onCampusOppData={onCampusOppData} />
					</div>
					{/* -----------Statistics----------- */}
					<div className="flex flex-col items-center justify-center flex-grow w-full p-3">
						<div className="flex gap-2">
							<span className="flex flex-col items-center justify-center font-bold text-lg border rounded-md border-richblack-700 dark:hover:bg-gray-800 hover:bg-gray-300  p-4 md:p-8 ">
								<p className="text-green-500 text-center">
									Active Opportunities
								</p>
								<p className="font-bold text-7xl">
									<Number
										n={
											onCampusOppData &&
											(onCampusOppData.activeOpportunities || 0)
										}
									/>
								</p>
							</span>
							<span className="flex flex-col items-center justify-center font-bold text-lg border rounded-md border-richblack-700 dark:hover:bg-gray-800 hover:bg-gray-300 p-4 md:p-8 ">
								<p className="text-red-600 text-center">
									Expired Opportunities
								</p>
								<p className="font-bold text-7xl">
									<Number
										n={
											onCampusOppData &&
											(onCampusOppData.expiredOpportunities || 0)
										}
									/>
								</p>
							</span>
						</div>
						<div className="flex justify-center items-center mt-4">
							<Link
								to="/dashboard/my-opportunities"
								className="bg-primary-500 hover:bg-primary-700 flex justify-center items-center w-fit p-2 rounded-md gap-x-2 text-base font-semibold text-white"
							>
								<p>Uncover more opportunities.</p>
								<FaArrowTrendUp />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OnCampusAnalytics;
