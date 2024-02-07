import React from "react";

const OpportunityIcons = ({ tooltipDescription, icon, label }) => {
	// console.log(`Tooltip :${tooltipDescription} , ${icon}`);
	const isDescriptionArray = Array.isArray(tooltipDescription);
	return (
		<>
			<span className="group relative cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 dark:bg-slate-700 p-3 text-gray-900 dark:text-white transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
				<div className="absolute flex items-center justify-center invisible bottom-7 group-hover:visible w-60 bg-richblack-900 text-black px-4 mb-3 py-2 text-sm rounded-md">
					{isDescriptionArray ? (
						<>
						<div className="flex flex-col">
							<span className="text-white font-semibold mb-3">{label} :</span>
							<ul className="list-disc pl-4">
								{tooltipDescription.map((item, index) => (
									<li className="text-gray-400 mb-3 font-semibold" key={index}>
										{item}
									</li>
								))}
							</ul>
							</div>
						</>
					) : (
						<>
							<span className="text-white font-semibold">{label} :</span>
							<p className="leading-2 text-gray-400 pt-2 pb-2 ml-1 font-semibold">
								{tooltipDescription}
							</p>
						</>
					)}
					<svg
						className="absolute z-10 bottom-[-10px] left-2"
						width="16"
						height="10"
						viewBox="0 0 16 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="black" />
					</svg>
				</div>
				{icon}
			</span>
		</>
	);
};

export default OpportunityIcons;
