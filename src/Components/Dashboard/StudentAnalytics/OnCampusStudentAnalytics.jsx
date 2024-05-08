import React, { useState, useEffect } from "react";
import {
	onCampusBookmarkedAnalytics,
	onCampusAppliedAnalytics,
} from "../../../Services/Operations/StudentAnalytics";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OnCampusStudentAnalytics = () => {
	//eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [onCampusOppData, setOnCampusOppData] = useState(null);
	const [onCampusOppAppliedData, setOnCampusOppAppliedData] = useState(null);
	console.log("OnCAMPUS-BOOKMARK DATA", onCampusOppData);
	console.log("OFFCAMPUS-APPLYDATA", onCampusOppAppliedData);
	const { token } = useSelector((state) => state.auth);
	const fetchOnCampusBookmarkedDetails = () => {
		try {
			const result = onCampusBookmarkedAnalytics(token, setOnCampusOppData);
			if (result) {
				setOnCampusOppData(result);
			}
		} catch (error) {
			console.log("Error while fetching offcampus!!");
		}
	};
	const fetchOnCampusAppliedDetails = () => {
		try {
			const result = onCampusAppliedAnalytics(token, setOnCampusOppAppliedData);
			if (result) {
				setOnCampusOppAppliedData(result);
			}
		} catch (error) {
			console.log("Error while fetching offcampus!!");
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
		fetchOnCampusAppliedDetails();
		setLoading(false);
		//eslint-disable-next-line
	}, []);
	useEffect(() => {
		setLoading(true);
		fetchOnCampusBookmarkedDetails();
		setLoading(false);
		//eslint-disable-next-line
	}, []);
	return (
		<>
			<div className="flex flex-wrap justify-center items-center dark:text-gray-400 gap-2 ">
				<div className="flex-grow rounded-md border border-1 dark:border-richblack-700 p-2">
					<span className=" flex flex-col items-center justify-center font-bold dark:hover:bg-gray-800 hover:bg-gray-300  p-8 md:p-12  rounded-md ">
						<p className="text-primary-500 text-center text-base md:text-lg">
							Applied Opportunities
						</p>
						<p className="flex justify-center items-center font-bold text-5xl md:text-7xl">
							<Number
								n={onCampusOppData && (onCampusOppData.totalBookmarked || 0)}
							/>
							<span>
								/{onCampusOppData && (onCampusOppData.totalOpportunities || 0)}
							</span>
						</p>
					</span>
				</div>
				<div className="flex-grow rounded-md border border-1 dark:border-richblack-700 p-2">
					<span className=" flex flex-col items-center justify-center font-bold dark:hover:bg-gray-800 hover:bg-gray-300 p-8 md:p-12 rounded-md ">
						<p className="text-primary-500 text-center text-base md:text-lg">
							Bookmarked Opportunities
						</p>
						<p className="flex justify-center items-center font-bold text-5xl md:text-7xl">
							<Number
								n={
									onCampusOppAppliedData &&
									(onCampusOppAppliedData.totalAppliedOpportunities || 0)
								}
							/>
							<span>
								/
								{onCampusOppAppliedData &&
									(onCampusOppAppliedData.totalOpportunities || 0)}
							</span>
						</p>
					</span>
				</div>
			</div>
			<div className="flex justify-center items-center my-6">
				<Link
					to="/opportunities/Scholarships"
					className="bg-primary-500 hover:bg-primary-700 flex justify-center items-center w-fit p-2 rounded-md gap-x-2 text-base font-semibold text-white"
				>
					<p>Browse OnCampus Section</p>
					<FaArrowTrendUp />
				</Link>
			</div>
		</>
	);
};

export default OnCampusStudentAnalytics;
