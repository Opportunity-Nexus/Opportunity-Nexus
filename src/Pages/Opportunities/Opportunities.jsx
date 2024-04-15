import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { opportunitiesData } from "../../Data/Opportunities/Api";
import OpportunityCard from "../../Components/Opportunities/OpportunityCard";
import { opportunityTagLine } from "../../Data/Opportunities/TagLines";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import toast from "react-hot-toast";
import BookMarkSound from "../../assets/sounds/bookmark-sound.mp3";
import { useSelector } from "react-redux";
import {
	saveBookmarkedOpportunity,
	fetchBookmarkedOpportunities,
	removeBookmarkedOpportunity,
} from "../../Services/Operations/MyOpportunity";

export async function loader({ request }) {
	const opportunityType = request.url.split("/").pop();
	return await opportunitiesData(opportunityType);
}

const Opportunities = () => {
	const opportunityData = useLoaderData();
	const opportunityName = window.location.pathname.split("/")[2];
	const TagLine = opportunityTagLine[opportunityName];
	const [firstPart, secondPart] = TagLine ? TagLine.split(":") : [null, null];
	const { token } = useSelector((state) => state.auth);
	const audio = new Audio();
	audio.src = BookMarkSound;
	const [bookmarkedOpportunities, setBookmarkedOpportunities] = useState([]);
	// eslint-disable-next-line 
	const [loading, setLoading] = useState(false);
	console.log("bookmarkedOpportunities", bookmarkedOpportunities);

	const toggleBookmark = async (opportunity) => {
		const isBookmarked = bookmarkedOpportunities.some(
			(o) => o.frontendId === opportunity.frontendId
		);
		if (isBookmarked) {
			console.log("Is OPPORTUNITY ALREDY BOOKMARKED", isBookmarked);
			const result = await removeBookmarkedOpportunity(
				opportunity.frontendId,
				token
			);
			if (result) {
				setBookmarkedOpportunities(
					bookmarkedOpportunities.filter(
						(o) => o.frontendId !== opportunity.frontendId
					)
				);
				audio.play();
				toast.success("Opportunity removed from your profile!", {
					position: "bottom-center",
				});
			} else {
				console.log("ERROR WHILE UNBOOKMRKING!!");
			}
		} else {
			setBookmarkedOpportunities([...bookmarkedOpportunities, opportunity]);
			bookmarkOffCampusOpportunity(opportunity, opportunityName);
		}
	};

	const bookmarkOffCampusOpportunity = async (opportunity, opportunityName) => {
		console.log("OPPORTUNITY SELECTED", opportunity, opportunityName);
		try {
			const result = await saveBookmarkedOpportunity(
				opportunity,
				opportunityName,
				token
			);
			if (result) {
				setBookmarkedOpportunities([...bookmarkedOpportunities, opportunity]);
				audio.play();
				toast.success("Opportunity added to your profile!", {
					position: "bottom-center",
				});
			}
		} catch (error) {
			console.log(`Error While Saving Bookmarked Opportunity: ${error}`);
		}
	};

	useEffect(() => {
		setLoading(true);
		if (token) {
			fetchBookmarkedOpportunities(token, setBookmarkedOpportunities);
		}
		setLoading(false);
		//eslint-disable-next-line
	}, [token]);

	const [currentPage, setCurrentPage] = useState(1);
	const totalOpportunitiesPages = Math.ceil(opportunityData.length / 6);
	const currentOpportunities = opportunityData.slice(
		currentPage * 6 - 6,
		currentPage * 6
	);
	const pageNumbers = Array.from(
		{ length: totalOpportunitiesPages },
		(_, i) => i + 1
	);

	return (
		<>
			<div className="flex flex-col flex-wrap justify-center items-center max-w-7xl mx-auto min-h-[80vh]">
				{opportunityData.length === 0 ? (
					<div className="flex flex-col justify-center items-center lg:w-2/4 dark:text-white ">
						<img src={OpportunitiesNotFoundImg} alt="OppNotFound" />
						<h2 className="text-2xl sm:text-3xl font-bold animate-bounce text-center ">
							No Opportunities Available!!
						</h2>
						<p className="font-semibold text-center">
							We appreciate your interest. Currently, there are no opportunities
							available. Please check back later for updates.
						</p>
					</div>
				) : (
					<>
						<div className="flex flex-col items-center justify-center h-fit pt-10 pb-16">
							<div className="mt-4 text-center flex flex-col tracking-tight font-extrabold text-3xl sm:mt-5 sm:text-5xl lg:mt-6 xl:text-4xl dark:text-white ">
								<span>{firstPart}</span>
								<span className="text-primary-500">{secondPart}</span>
							</div>
						</div>

						<div className="flex flex-wrap justify-center mx-auto mt-4 mb-7">
							{currentOpportunities.map((opportunity, index) => (
								<OpportunityCard
									key={index}
									opportunity={opportunity}
									isBookmarked={bookmarkedOpportunities.some(
										(o) => o.frontendId === opportunity.frontendId
									)}
									toggleBookmark={toggleBookmark}
								/>
							))}
						</div>

						{pageNumbers.length > 1 && (
							<div className="flex items-center justify-center w-2/4 mt-8">
								<button
									className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
										currentPage <= 1
											? "cursor-not-allowed text-gray-400 "
											: "cursor-pointer"
									}`}
									onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
									disabled={currentPage <= 1}
								>
									<TbPlayerTrackPrevFilled />
									<span className="uppercase">previous</span>
								</button>
								<div className="flex items-center justify-center">
									{pageNumbers.map((pageNumber) => (
										<button
											key={pageNumber}
											className={`border rounded-full px-4 py-2 ml-3 mr-3 dark:text-white focus:ring-2 ${
												currentPage === pageNumber
													? "bg-primary-500 text-white"
													: ""
											}`}
											onClick={() => setCurrentPage(pageNumber)}
										>
											{pageNumber}
										</button>
									))}
								</div>
								<button
									className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
										currentPage >= totalOpportunitiesPages
											? "cursor-not-allowed text-gray-400"
											: "cursor-pointer"
									}`}
									onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
									disabled={currentPage >= totalOpportunitiesPages}
								>
									<span className="uppercase ml-3">next</span>
									<TbPlayerTrackNextFilled />
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Opportunities;
