import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ActionBtn from "../../../Common/ActionBtn";
import { useSelector, useDispatch } from "react-redux";
import {
	setStep,
	setEditOpportunity,
	resetOpportunityState,
	setEditGlobalOpportunity,
} from "../../../Redux/Slices/OpportunitySlice";
import {
	createOpportunity,
	editOpportunity,
} from "../../../Services/Operations/OnCampusApi";

const OpportunityRelease = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { opportunity, editGlobalOpportunity } = useSelector(
		(state) => state.opportunity
	);
	const { token } = useSelector((state) => state.auth);
	useEffect(() => {
		console.log("i am here");
		console.log(opportunity);
		console.log("EDIT GLOBAL OPPORTUNITY",editGlobalOpportunity);
		//eslint-disable-next-line
	}, []);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const goBack = () => {
		dispatch(setStep(2));
		dispatch(setEditOpportunity(true));
		dispatch(setEditGlobalOpportunity(true));
	};
	const goToOpportunities = () => {
		dispatch(resetOpportunityState());
		// naviagte("/dashboard/my-opportunities");
	};
	const onSubmit = async () => {
		let result;
		if (opportunity.opportunityStatus === "Draft") {
			console.log("DATA BEFORE CREATE OPPORTUNITY", opportunity);
			const opportunityFinalData = {
				...opportunity,
				opportunityStatus: "Published",
			};
			setLoading(true);
			result = await createOpportunity(opportunityFinalData, token);
		} else {
			console.log("DATA BEFORE EDIT OPPORTUNITY", opportunity);
			setLoading(true);
			result = await editOpportunity(opportunity, token);
		}
		if (result) {
			goToOpportunities();
		}
		setLoading(false);
	};
	return (
		<div className=" px-[10%] ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 md:space-y-6 rounded-md border border-1 dark:border-richblack-700 dark:bg-richblack-800 p-6 mb-10"
			>
				<h1 className="text-base sm:text-lg text-black dark:text-richblack-5 font-bold">
					Do you want to publish this opportunity ?
				</h1>
				<div className="my-6">
					<label htmlFor="public" className="inline-flex items-center text-lg">
						<input
							type="checkbox"
							id="public"
							{...register("public")}
							className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
						/>
						{errors.public && (
							<span className="ml-2 text-xs tracking-wide text-pink-200">
								Mark the Required Field
							</span>
						)}
						<span className=" ml-2 text-sm sm:text-base text-black dark:text-richblack-5 uppercase">
							Mark this opportunity as public
						</span>
					</label>
				</div>
				<div className="flex lg:justify-end justify-center gap-x-2 flex-wrap gap-y-2 ">
					<button
						disabled={loading}
						type="button"
						onClick={goBack}
						className={`flex w-[80%] lg:w-fit cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-700 hover:bg-richblack-900 py-2 px-5 text-base font-semibold text-gray-100`}
					>
						Back
					</button>
					<ActionBtn disabled={loading} text="Publish Opportunity" />
				</div>
			</form>
		</div>
	);
};

export default OpportunityRelease;
