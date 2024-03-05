import React from "react";

const OpportunityDataItem = ({ label, value }) => {
	return (
		<>
			<div className="flex md:flex-row flex-col">
				<span className="font-semibold text-lg md:text-base text-blue-gray-900 dark:text-white">
					{label}:
				</span>
				<span className="dark:text-gray-300 ">{value}</span>
			</div>
		</>
	);
};

export default OpportunityDataItem;
