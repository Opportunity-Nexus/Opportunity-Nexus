import React ,{useState} from "react";
import { useLoaderData } from "react-router-dom";
import { opportunitiesData } from "../../Data/Opportunities/Api";
import OpportunityCard from "../../Components/Opportunities/OpportunityCard";
import { opportunityTagLine } from "../../Data/Opportunities/TagLines";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";

export async function loader() {
	const opportunityType = window.location.pathname.split("/")[2];
	return await opportunitiesData(opportunityType);
}

const Opportunities = () => {
	const OpportunityData = useLoaderData();
	const opportunityName = window.location.pathname.split("/")[2];
	const TagLine = opportunityTagLine[opportunityName];
	console.log(` Opportunity Name : ${opportunityName}`);
	console.log("Data is :" + JSON.stringify(OpportunityData, null, 2));

	//----------------------PAGINTAION----------------------//
	const [currentPage, setCurrentPage] = useState(1);
	const totalOpportunitiesPages = Math.ceil(OpportunityData[opportunityName].length / 6);
	const currentOpportunities = OpportunityData[opportunityName].slice(
		currentPage * 6 - 6,
		currentPage * 6
	);
	const pageNumbers = [];
	for (let i = 1; i <= totalOpportunitiesPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<div className="flex flex-wrap justify-center max-w-7xl mx-auto min-h-[80vh]">
				{OpportunityData[opportunityName].length === 0 ? (
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
						<div className="flex flex-col items-center justify-center w-full h-fit">
							<div className="text-center font-bold font-mono text-2xl dark:text-white">
								{TagLine}
							</div>
						</div>
						<div className="flex flex-wrap justify-center mx-auto mt-4 mb-7">
							{currentOpportunities.map((opportunity, index) => (
								<OpportunityCard key={index} {...opportunity} />
							))}
						</div>
						{/* ------------PAGINATION----------- */}
						<div className="flex items-center justify-center w-2/4 mt-8">
							<button
								className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
									currentPage <= 1
										? "cursor-not-allowed text-gray-400"
										: "cursor-pointer"
								}`}
								onClick={() => setCurrentPage(currentPage - 1)}
								disabled={currentPage <= 1}
							>
								<TbPlayerTrackPrevFilled />
								<span className="uppercase">previous</span>
							</button>
							<div className="flex items-center justify-center">
								{pageNumbers.map((pageNumber) => (
									<button
										key={pageNumber}
										className="border rounded-full px-4 py-2 ml-3 mr-3 dark:text-white "
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
								onClick={() => setCurrentPage(currentPage + 1)}
								disabled={currentPage >= totalOpportunitiesPages}
							>
								<span className="uppercase">next</span>
								<TbPlayerTrackNextFilled />
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Opportunities;
