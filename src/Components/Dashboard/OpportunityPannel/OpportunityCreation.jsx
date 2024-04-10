import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import ChipInput from "./ChipInput";
import RequirementField from "./RequirementField";
import ActionBtn from "../../../Common/ActionBtn";
import {
	setStep,
	setOpportunity,
	setEditOpportunity,
} from "../../../Redux/Slices/OpportunitySlice";
import toast from "react-hot-toast";

const OpportunityCreation = () => {
	const { opportunity, editOpportunity, editGlobalOpportunity } = useSelector(
		(state) => state.opportunity
	);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		// IF FORM IS IN EDIT MODE
		console.log("EDIT MODE VALUE:", editOpportunity);
		if (editOpportunity || editGlobalOpportunity) {
			setValue("opportunityName", opportunity.opportunityName);
			setValue("opportunityDescription", opportunity.opportunityDescription);
			setValue("opportunityRole", opportunity.opportunityRole);
			setValue("opportunityTags", opportunity.opportunityTags);
			setValue("opportunityLocation", opportunity.opportunityLocation);
			setValue("opportunityPackage", opportunity.opportunityPackage);
			setValue("eligibilityCriteria", opportunity.eligibilityCriteria);
		}
		//eslint-disable-next-line
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();
		console.log("CURRENT VALUES IN FORM UPDATION FUNCTION", currentValues);
		if (
			currentValues.opportunityName !== opportunity.opportunityName ||
			currentValues.opportunityDescription !==
				opportunity.opportunityDescription ||
			currentValues.opportunityRole !== opportunity.opportunityRole ||
			currentValues.opportunityTags.toString() !==
				opportunity.opportunityTags.toString() ||
			currentValues.opportunityLocation !== opportunity.opportunityLocation ||
			currentValues.opportunityPackage !== opportunity.opportunityPackage ||
			currentValues.eligibilityCriteria.toString() !==
				opportunity.eligibilityCriteria.toString()
		) {
			console.log(`FORM IS UPDATED WITH THE VALUES OF : ${currentValues}`);
			return true;
		} else {
			console.log(`FORM IS NOT UPDATED`);
			return false;
		}
	};

	//HANDLE "NEXT" OR "SAVE CHANGES" BUTTON CLICK
	const onSubmit = async (data) => {
		console.log(`DATA RECIEVED IN OPPORTUNITY-FORM : ${JSON.stringify(data)}`);
		if (editOpportunity) {
			if (isFormUpdated()) {
				const currentValues = getValues();
				console.log("Current Values in updation :", currentValues);
				const formData = { ...opportunity };
				if (currentValues.opportunityName !== opportunity.opportunityName) {
					formData.opportunityName = data.opportunityName;
				}
				if (
					currentValues.opportunityDescription !==
					opportunity.opportunityDescription
				) {
					formData.opportunityDescription = data.opportunityDescription;
				}
				if (currentValues.opportunityRole !== opportunity.opportunityRole) {
					formData.opportunityRole = data.opportunityRole;
				}
				if (
					currentValues.opportunityTags.toString() !==
					opportunity.opportunityTags.toString()
				) {
					formData.opportunityTags = data.opportunityTags;
				}
				if (
					currentValues.opportunityLocation !== opportunity.opportunityLocation
				) {
					formData.opportunityLocation = data.opportunityLocation;
				}
				if (
					currentValues.opportunityPackage !== opportunity.opportunityPackage
				) {
					formData.opportunityPackage = data.opportunityPackage;
				}
				if (
					currentValues.eligibilityCriteria.toString() !==
					opportunity.eligibilityCriteria.toString()
				) {
					formData.eligibilityCriteria = data.eligibilityCriteria;
				}
				console.log(
					"FORM DATA (EDIT) BEFORE DISPATCH TO OPPORTUNITY:",
					formData
				);
				setLoading(true);
				dispatch(setOpportunity(formData));
				dispatch(setEditOpportunity(false));
				dispatch(setStep(2));
				setLoading(false);
			} else {
				toast.error("NO CHANGES MADE SO FAR.");
			}
			return;
		}
		//CREATE A NEW opportunity
		const formData = {
			opportunityName: data.opportunityName,
			opportunityDescription: data.opportunityDescription,
			opportunityRole: data.opportunityRole,
			opportunityTags: data.opportunityTags,
			opportunityLocation: data.opportunityLocation,
			opportunityPackage: data.opportunityPackage,
			opportunityStatus: "Draft",
			eligibilityCriteria: data.eligibilityCriteria,
		};
		console.log("FORM DATA BEFORE DISPATCH NEW OPPORTUNITY", formData);
		setLoading(true);
		dispatch(setOpportunity(formData));
		dispatch(setStep(2));
		setLoading(false);
	};
	return (
		<div className="px-[10%]">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 md:space-y-6 rounded-md border border-1 dark:border-richblack-700 dark:bg-richblack-800 p-6 mb-10"
			>
				{/* -------------OPPORTUNITY NAME------------- */}
				<div className="flex flex-col space-y-2">
					<label className="label-style" htmlFor="opportunityName">
						Opportunity Name <sup className="text-pink-200">*</sup>
					</label>
					<input
						id="opportunityName"
						placeholder="e.g., HCL Tech. Ltd."
						{...register("opportunityName", { required: true })}
						className="input-style"
					/>
					{errors.opportunityName && (
						<span className="error-style">Opportunity Name is required</span>
					)}
				</div>
				{/* ------------OPPORTUNITY DESCRIPTION---------- */}
				<div className="flex flex-col space-y-2">
					<label className="label-style" htmlFor="opportunityDescription">
						Opportunity Description <sup className="text-pink-200">*</sup>
					</label>
					<textarea
						id="opportunityDescription"
						placeholder="Enter Opportunity Description"
						{...register("opportunityDescription", { required: true })}
						className="input-style"
					/>
					{errors.opportunityDescription && (
						<span className="error-style">
							Opportunity Description is required
						</span>
					)}
				</div>
				{/* -------------OPPORTUNITY ROLE------------- */}
				<div className="flex flex-col space-y-2">
					<label className="label-style" htmlFor="opportunityRole">
						Opportunity Role <sup className="text-pink-200">*</sup>
					</label>
					<input
						id="opportunityRole"
						placeholder="e.g., Backend Developer"
						{...register("opportunityRole", { required: true })}
						className="input-style"
					/>
					{errors.opportunityRole && (
						<span className="error-style">Opportunity Role is required</span>
					)}
				</div>
				{/*--------------Opportunity Tags------------*/}
				<ChipInput
					label="Opportunity Tags"
					id="opportunityTags"
					placeholder="e.g., B.Tech & press Enter"
					register={register}
					errors={errors}
					setValue={setValue}
					getValues={getValues}
				/>
				<div className="flex flex-col md:flex-row w-full gap-3">
					{/* -------------OPPORTUNITY LOCATION------------- */}
					<div className="flex flex-col space-y-2 md:w-1/2 w-full">
						<label className="label-style" htmlFor="opportunityLocation">
							Opportunity Location <sup className="text-pink-200">*</sup>
						</label>
						<input
							id="opportunityLocation"
							placeholder="e.g., Bangalore"
							{...register("opportunityLocation", { required: true })}
							className="input-style"
						/>
						{errors.opportunityLocation && (
							<span className="error-style">Opportunity Role is required</span>
						)}
					</div>
					{/* -------------OPPORTUNITY PACKAGE------------- */}
					<div className="flex flex-col space-y-2 md:w-1/2 w-full">
						<label className="label-style" htmlFor="opportunityPackage">
							Opportunity Package <sup className="text-pink-200">*</sup>
						</label>
						<div className="relative">
							<input
								id="opportunityPackage"
								placeholder="e.g., 2500000"
								{...register("opportunityPackage", {
									required: "Opportunity Package is required",
									pattern: {
										value: /^(0\.0*[1-9]\d*|[1-9]\d*(\.\d+)?)$/,
										message:
											"Opportunity Package must be a positive number greater than zero",
									},
								})}
								className="!pl-12 input-style"
							/>
							{errors.opportunityPackage && (
								<span className="error-style">
									{errors.opportunityPackage.message}
								</span>
							)}
							<HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-800 dark:text-richblack-200" />
						</div>
					</div>
				</div>
				{/*---------------ELIGIBILITY REQUIREMENTS------------ */}
				<RequirementField
					id="eligibilityCriteria"
					label="Eligibility Criteria"
					register={register}
					setValue={setValue}
					errors={errors}
					getValues={getValues}
					placeholder="Add Eligibility Criteria"
				/>
				<div className="flex lg:justify-end justify-center gap-x-2 flex-wrap gap-y-2">
					{editOpportunity && (
						<button
							onClick={() => {
								dispatch(setEditOpportunity(false), dispatch(setStep(2)));
							}}
							disabled={loading}
							className={`flex w-[80%] lg:w-fit cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-700 hover:bg-richblack-900 py-2 px-5 text-base font-semibold text-gray-100`}
						>
							Continue Without Saving
						</button>
					)}
					<ActionBtn
						disabled={loading}
						text={!editOpportunity ? "Next" : "Save Changes "}
					>
						<MdNavigateNext />
					</ActionBtn>
				</div>
			</form>
		</div>
	);
};

export default OpportunityCreation;
