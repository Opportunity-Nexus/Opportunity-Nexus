import React from "react";
import { adminOpportunityRules } from "../../Data/Opportunities/AdminOpportunityRules";
import RenderOpportunitySteps from "../../Components/Dashboard/OpportunityPannel/RenderOpportunitySteps";
import { PiPencilSimpleLineFill} from "react-icons/pi";


const OpportunityPanel = () => {
	return (
		<>
			<div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
			{/* ------------TITLE && TAGLINE--------------- */}
				<div className="flex justify-center items-center py-12 px-2">
					<h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl text-center dark:text-white ">
						Opportunity Forge: Shaping Success
						<span className="block text-primary-500 mt-1">
							Publish, Inspire, Transform
						</span>
					</h1>
				</div>
				
				<div className="px-[10%]">
					<details className="space-y-8 rounded-md border border-1 dark:border-richblack-700 dark:bg-richblack-800 p-6 dark:text-gray-500">
						<summary className="text-sm md:text-lg font-bold dark:text-gray-200 hover:cursor-pointer">
							Pre-publish Checklist
						</summary>
						<div className="flex flex-col mt-3 md:text-justify gap-y-1">
							{adminOpportunityRules.map((rule) => {
								return (
									<div key={rule.id} className="flex flex-row items-start xl:items-center gap-x-2 ">
										<PiPencilSimpleLineFill className="text-lg" />
										<h3 className="text-xs sm:text-sm md:text-base">{rule.text}</h3>
									</div>
								);
							})}
						</div>
					</details>
				</div>
				<div className="mt-4">
					<RenderOpportunitySteps />
				</div>
			</div>
		</>
	);
};

export default OpportunityPanel;
