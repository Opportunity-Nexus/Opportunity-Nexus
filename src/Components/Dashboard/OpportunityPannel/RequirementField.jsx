import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { RiDeleteBin6Fill } from "react-icons/ri";

const RequirementField = ({
	id,
	label,
	register,
	errors,
	setValue,
	placeholder,
}) => {
	const [requirement, setRequirement] = useState("");
	const [requirementList, setRequirementList] = useState([]);
	const { opportunity, editOpportunity } = useSelector(
		(state) => state.opportunity
	);

	const handleAddRequirement = () => {
		if (requirement) {
			setRequirementList([...requirementList, requirement]);
			setRequirement("");
		}
	};
	const handleRemoveRequirement = (index) => {
		const updatedRequirementList = [...requirementList];
		updatedRequirementList.splice(index, 1);
		setRequirementList(updatedRequirementList);
	};

	useEffect(() => {
		if (editOpportunity) {
			setRequirementList(opportunity?.eligibilityCriteria);
		}
		register(id, { required: true, validate: (value) => value.length > 0 });
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setValue(id, requirementList);
		// eslint-disable-next-line
	}, [requirementList]);

	return (
		<>
			<div className="flex flex-col space-y-2">
				<label className="label-style" htmlFor={id}>
					{label} <sup className="text-pink-200">*</sup>
				</label>
				<div className="flex flex-col items-start space-y-2">
					<input
						type="text"
						id={id}
						value={requirement}
						onChange={(e) => setRequirement(e.target.value)}
						placeholder={placeholder}
						className="input-style"
					/>
					<button
						type="button"
						onClick={handleAddRequirement}
						className="font-semibold text-primary-600 flex flex-row items-center"
					>
						<span className="text-lg font-bold">
							<IoAdd />
						</span>
						<span className="text-xs md:text-lg">
							Include Eligibility Criteria
						</span>
					</button>
				</div>
				{requirementList.length > 0 && (
					<ul className="mt-2">
						{requirementList.map((requirement, index) => (
							<li
								key={index}
								className="flex flex-col sm:flex-row items-center text-gray-500 md:text-justify mb-3"
							>
								<div className="flex flex-row justify-start gap-x-2">
									<VscActivateBreakpoints className="font-bold text-base text-black dark:text-richblack-5 " />
									<span>{requirement}</span>
								</div>

								<button
									type="button"
									className="ml-2 text-base md:text-lg text-red-700 font-bold self-end sm:self-auto"
									onClick={() => handleRemoveRequirement(index)}
								>
									<RiDeleteBin6Fill />
								</button>
							</li>
						))}
					</ul>
				)}
				{errors[id] && <span className="error-style">{label} is required</span>}
			</div>
		</>
	);
};

export default RequirementField;
