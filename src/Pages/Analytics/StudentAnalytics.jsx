import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import OpportunityPieChart from "../../Components/Dashboard/StudentAnalytics/OpportunityPieChart";
import { FaBookReader } from "react-icons/fa";
import { offcampusBookmarkAnalytics } from "../../Services/Operations/StudentAnalytics";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiMiniUserGroup } from "react-icons/hi2";
import OnCampusAnalytics from "../../Components/Dashboard/StudentAnalytics/OnCampusAnalytics";
import OnCampusStudentAnalytics from "../../Components/Dashboard/StudentAnalytics/OnCampusStudentAnalytics";

const StudentAnalytics = () => {
	//eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [offcampusData, setOffcampusData] = useState([]);
	console.log("OFFCAMPUSDATA", offcampusData);
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	console.log("HERE", offcampusData);
	const fetchOffCampusDetails = () => {
		try {
			const result = offcampusBookmarkAnalytics(token, setOffcampusData);
			if (result) {
				setOffcampusData(result);
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
		fetchOffCampusDetails();
		setLoading(false);
		//eslint-disable-next-line
	}, []);
	return (
		<>
			<div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900 gap-y-5">
				{/* ------------TITLE && TAGLINE--------------- */}
				<div className="flex justify-center items-center py-12">
					<h1 className="font-bold text-base sm:text-3xl md:text-2xl lg:text-4xl text-center dark:text-white ">
						Mapping Student Trajectories
							<TypeAnimation
								sequence={[
									"Empowerment through Data,Success through Insight",
									1000,
									"Empowerment through Data,Innovation through Collaboration.",
									1000,
									"Empowerment through Data,Growth through Action",
									1000,
								]}
								wrapper="span"
								speed={50}
								className="block text-primary-500 mt-1 "
								repeat={Infinity}
							/>
					</h1>
				</div>
				<div className="flex flex-col space-y-8 rounded-md border border-1 dark:border-richblack-700 p-6 dark:text-gray-400">
					<span className="flex items-center gap-2">
						<FaBookReader />
						<h1 className="font-bold text-base sm:text-xl ">
							Insights into Your Bookmarked Opportunities
						</h1>
					</span>
					<div className="flex flex-col md:flex-row justify-center items-center dark:text-gray-400 gap-2 py-8">
						<div className="flex flex-col items-center justify-center w-full md:w-1/2">
							<div className="flex flex-wrap justify-center items-center dark:text-gray-400 gap-2">
								{offcampusData.length > 0 &&
									offcampusData.map((item) => (
										<span
											key={item.opportunityType}
											className=" flex flex-col items-center justify-center font-bold text-sm md:text-lg border rounded-md border-richblack-700 dark:hover:bg-gray-800 hover:bg-gray-300 px-3 py-3 md:px-6 md:py-7 w-28 md:w-40"
										>
											<p className="text-primary-500 text-center">
												{item.opportunityType}
											</p>
											<p className="font-bold text-7xl">
												<Number n={item.count} />
											</p>
										</span>
									))}
							</div>
							<div className="flex justify-center items-center mt-4">
								<Link
									to="/opportunities/Scholarships"
									className="bg-primary-500 hover:bg-primary-700 flex justify-center items-center w-fit p-2 rounded-md gap-x-2 text-base font-semibold text-white"
								>
									<p className="text-sm">Access Bookmarked Selections</p>
									<FaArrowTrendUp />
								</Link>
							</div>
						</div>
						<div className="w-full flex justify-center items-center md:w-[50%] h-52 md:h-64 lg:h-72 p-2">
							<OpportunityPieChart offcampusData={offcampusData} />
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center my-10 ">
					<span className="text-4xl text-primary-500">
						<HiMiniUserGroup />
					</span>
					<span className=" font-extrabold animate-bounce text-2xl text-primary-500 text-center ">{`${user.firstName.toUpperCase()}'S ON-CAMPUS ANALYSIS`}</span>
				</div>
				<OnCampusAnalytics />
				<OnCampusStudentAnalytics />
			</div>
		</>
	);
};

export default StudentAnalytics;
