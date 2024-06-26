import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TiLocation } from "react-icons/ti";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { SiVisualstudiocode } from "react-icons/si";
import { IoBookmarks } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import OpportunityIcons from "./OpportunityIcons";
import OpportunityDataItem from "./OpportunityDataItem";
import { useSelector } from "react-redux";
import { formattedDate } from "../../Common/DateFormatter";

const OpportunityCard = ({ opportunity, isBookmarked, toggleBookmark }) => {
	const { user } = useSelector((state) => state.profile);
	const navigate = useNavigate();
	const opportunityName = window.location.pathname.split("/")[2];

	const handleUserClick = () => {
		if (!user) {
			navigate(`/login?from=opportunities/${opportunityName}`);
			toast.success("Kindly! Make Yourself Authenticated.");
		} else {
			toggleBookmark(opportunity);
		}
	};

	return (
		<>
			<div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white dark:bg-gray-800 bg-clip-border text-gray-700 shadow-lg mx-2 my-2">
				<div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
					{opportunity.image && (
						<img src={opportunity.image} alt="OpportunityImage" />
					)}
					<div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
					{user?.accountType !== "Admin" && (
						<button
							className="!absolute top-4 right-4 text-lg transition-all"
							onClick={handleUserClick}
						>
							{isBookmarked ? <IoBookmarks /> : <IoBookmarksOutline />}
						</button>
					)}
				</div>
				<div className="p-6">
					<div className="flex items-center justify-between mb-3">
						<h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900 dark:text-white">
							{opportunity.name}
						</h5>
					</div>
					{opportunity.description && (
						<div className="max-h-20 overflow-hidden mb-6">
							<p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 dark:text-gray-300">
								{opportunity.description?.split(" ").slice(0, 15).join(" ") +
									"..."}
							</p>
						</div>
					)}
					<div className="mt-3 min-h-40 md:min-h-32 overflow-hidden">
						<OpportunityDataItem
							label="Organization"
							value={opportunity.organization}
						/>
						<OpportunityDataItem
							label="Start Date"
							value={formattedDate(opportunity.startDate)}
						/>
						<OpportunityDataItem
							label="End Date"
							value={formattedDate(opportunity.endDate)}
						/>
					</div>
					<div className="inline-flex flex-wrap items-center gap-3 mt-2 md:mt-0">
						{
							<OpportunityIcons
								label="Eligibility Criteria"
								tooltipDescription={opportunity.eligibilityCriteria}
								icon={<FaInfoCircle />}
							/>
						}
						{opportunityName === "Scholarships" && (
							<OpportunityIcons
								label="Award Amount"
								tooltipDescription={opportunity.awardAmount}
								icon={<TbCoinRupeeFilled />}
							/>
						)}
						{opportunityName === "ITJobs" && (
							<>
								<OpportunityIcons
									label="Role"
									tooltipDescription={opportunity.role}
									icon={<FaCircleUser />}
								/>
								<OpportunityIcons
									label="Location"
									tooltipDescription={opportunity.location}
									icon={<TiLocation />}
								/>
							</>
						)}
						{opportunityName === "CodingContests" && (
							<OpportunityIcons
								label="Coding Platform"
								tooltipDescription={opportunity.platform}
								icon={<SiVisualstudiocode />}
							/>
						)}
					</div>
				</div>
				<div className="p-4 mb-0">
					<Link
						className="block w-full select-none rounded-lg bg-richblack-900 hover:bg-primary-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						to={opportunity.applicationUrl}
					>
						register
					</Link>
				</div>
			</div>
		</>
	);
};

export default OpportunityCard;
