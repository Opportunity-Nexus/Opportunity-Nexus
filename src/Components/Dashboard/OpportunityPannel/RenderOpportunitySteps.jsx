import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import OpportunityCreation from "./OpportunityCreation";
import OpportunityDetails from "./OpportunityDetails";
import OpportunityRelease from "./OpportunityRelease";

const RenderOpportunitySteps = () => {
	const { step } = useSelector((state) => state.opportunity);
	const steps = [
		{
			id: 1,
			title: "Opportunity Creation",
		},
		{
			id: 2,
			title: "Opportunity Details",
		},
		{
			id: 3,
			title: "Opportunity Release",
		},
	];

	return (
		<>
			<div className="px-[10%]">
				<div className="mt-8 flex w-full justify-center">
					{steps.map((item, index) => {
						return (
							<>
								<div
									className="flex flex-col items-center justify-center mb-16 sm :min-w-fit"
									key={index}
								>
									{/* --------RENDER STEPS-------- */}
									<button
										className={`grid cursor-default aspect-square w-8 md:w-9 place-items-center rounded-full border border-1 ${
											step === item.id
												? "border-primary-700 bg-primary-500 text-white"
												: "border-richblack-200 bg-richblack-200 dark:bg-richblack-700 text-black dark:text-white"
										} ${step > item.id && "bg-yellow-50 dark:bg-yellow-50 text-yellow-50"}} `}
									>
										{step > item.id ? (
											<FaCheck className="font-bold text-white" />
										) : (
											<span>{item.id}</span>
										)}
									</button>
									<div className="grid place-items-center" key={index}>
										<p
											className={` text-center text-xs md:text-sm md:font-bold font-normal ${
												step >= item.id
													? "text-primary-500"
													: "text-richblack-500 dark:text-white"
											}`}
										>
											{item.title}
										</p>
									</div>
								</div>
								{/* ADD DASHES BETWEEN THE STEPS */}
								{item.id !== steps.length && (
									<>
										<div
											className={`h-[calc(34px/2)] w-[90%]  border-dashed border-b-2 ${
												step > item.id
													? "border-primary-700"
													: "border-richblack-200"
											} `}
										></div>
									</>
								)}
							</>
						);
					})}
				</div>
				
			</div>
			{/* Render specific component based on current step */}
			{step === 1 && <OpportunityCreation />}
			{step === 2 && <OpportunityDetails />}
			{step === 3 && <OpportunityRelease />}
		</>
	);
};

export default RenderOpportunitySteps;
