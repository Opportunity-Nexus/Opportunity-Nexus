import React from "react";

const OpportunityDataItem = ({ label, value }) => {
	return (
		<>
			<div className="flex">
				<span className="font-bold text-base text-blue-gray-900 dark:text-white">
					{label} :
				</span>
				<span className="ml-1 dark:text-gray-300">{value}</span>
			</div>
		</>
	);
};

export default OpportunityDataItem;
