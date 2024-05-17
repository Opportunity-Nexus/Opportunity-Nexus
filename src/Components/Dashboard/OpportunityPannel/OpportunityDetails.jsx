import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionBtn from "../../../Common/ActionBtn";
import { MdNavigateNext } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  setStep,
  setOpportunity,
  setEditOpportunity,
  setEditGlobalOpportunity,
} from "../../../Redux/Slices/OpportunitySlice";

const OpportunityDetails = () => {
  const [opportunityMode, setOpportunityMode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { opportunity, editOpportunity, editGlobalOpportunity } = useSelector(
    (state) => state.opportunity
  );

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const opportunityModes = ["OFF-LINE", "ON-LINE", "TBD (To Be Decided)"];

  const handleOpportunityModeChange = (e) => {
    setOpportunityMode(e.target.value);
  };

  const goBack = (e) => {
    dispatch(setStep(1));
    dispatch(setEditOpportunity(true));
  };
  const validateEndDate = (value) => {
    const driveDate = new Date(
      document.getElementById("opportunityDriveDate").value
    );
    const endDate = new Date(value);
    if (endDate <= driveDate) {
      return true;
    }
    return "Opportunity End Date must be before or equal to Opportunity Drive Date.";
  };

  useEffect(() => {
    // IF FORM IS IN EDIT MODE
    console.log({ opportunity, date: opportunity.opportunityDriveDate });
    if (editOpportunity || editGlobalOpportunity) {
      setOpportunityMode(opportunity.opportunityMode);
      setValue("opportunityMode", opportunity.opportunityMode);
      setValue(
        "opportunityDriveDate",
        new Date(opportunity.opportunityDriveDate).toISOString().split("T")[0]
      );
      setValue("opportunityDriveLink", opportunity.opportunityDriveLink);
      setValue("opportunityDriveTime", opportunity.opportunityDriveTime);
      setValue(
        "opportunityFillLastDate",
        new Date(opportunity.opportunityFillLastDate)
          .toISOString()
          .split("T")[0]
      );
      setValue("opportunityExtraDetails", opportunity.opportunityExtraDetails);
    }
  }, [editGlobalOpportunity, editOpportunity, opportunity, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log("CURRENT VALUES IN FORM UPDATION FUNCTION", currentValues);
    if (
      currentValues.opportunityMode !== opportunity.opportunityMode ||
      currentValues.opportunityDriveDate !== opportunity.opportunityDriveDate ||
      currentValues.opportunityDriveLink !== opportunity.opportunityDriveLink ||
      currentValues.opportunityExtraDetails !==
        opportunity.opportunityExtraDetails ||
      currentValues.opportunityDriveLink !== opportunity.opportunityDriveLink ||
      currentValues.opportunityDriveTime !== opportunity.opportunityDriveTime ||
      currentValues.opportunityFillLastDate !==
        opportunity.opportunityFillLastDate
    ) {
      console.log(`FORM IS UPDATED WITH THE VALUES OF : ${currentValues}`);
      return true;
    } else {
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
        if (currentValues.opportunityMode !== opportunity.opportunityMode) {
          formData.opportunityMode = data.opportunityMode;
        }
        if (
          currentValues.opportunityDriveDate !==
          opportunity.opportunityDriveDate
        ) {
          formData.opportunityDriveDate = data.opportunityDriveDate;
        }
        if (
          currentValues.opportunityDriveLink !==
          opportunity.opportunityDriveLink
        ) {
          formData.opportunityDriveLink = data.opportunityDriveLink;
        }
        if (
          currentValues.opportunityExtraDetails !==
          opportunity.opportunityExtraDetails
        ) {
          formData.opportunityExtraDetails = data.opportunityExtraDetails;
        }
        if (
          currentValues.opportunityDriveTime !==
          opportunity.opportunityDriveTime
        ) {
          formData.opportunityDriveTime = data.opportunityDriveTime;
        }
        if (
          currentValues.opportunityFillLastDate !==
          opportunity.opportunityFillLastDate
        ) {
          formData.opportunityFillLastDate = data.opportunityFillLastDate;
        }
        setLoading(true);
        console.log(
          "FORM DATA BEFORE DISPATCH TO OPPORTUNITY (EDIT):",
          formData
        );
        dispatch(setOpportunity(formData));
        dispatch(setEditOpportunity(false));
        dispatch(setEditGlobalOpportunity(false));
        dispatch(setStep(3));
      } else {
        toast.error("NO CHANGES MADE SO FAR.");
        dispatch(setStep(3));
        dispatch(setEditOpportunity(false));
      }
      return;
    }
    //CREATE A NEW opportunity
    const formData = {
      ...opportunity,
      opportunityMode: data.opportunityMode,
      opportunityDriveDate: data.opportunityDriveDate,
      opportunityDriveLink: data.opportunityDriveLink,
      opportunityExtraDetails: data.opportunityExtraDetails,
      opportunityDriveTime: data.opportunityDriveTime,
      opportunityFillLastDate: data.opportunityFillLastDate,
      opportunityStatus: "Draft",
    };
    setLoading(true);
    console.log("FORM DATA BEFORE NEW OPPORTUNITY", formData);
    dispatch(setOpportunity(formData));
    dispatch(setStep(3));
  };

  return (
    <div className=" px-[10%] ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6 rounded-md border border-1 dark:border-richblack-700 dark:bg-richblack-800 p-6 mb-10"
      >
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* -----------OPPORTUNITY DRIVE DATE-------------- */}
          <div className="flex flex-col gap-2 lg:w-1/2">
            <label htmlFor="opportunityDriveDate" className="label-style">
              Opportunity Drive Date <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="date"
              name="opportunityDriveDate"
              id="opportunityDriveDate"
              className="input-style"
              {...register("opportunityDriveDate", {
                required: {
                  value: true,
                  message: "Please Enter Opportunity Drive Date.",
                },
              })}
            />
            {errors.opportunityDriveDate && (
              <span className="error-style">
                {errors.opportunityDriveDate.message}
              </span>
            )}
          </div>
          {/*----------------OPPORTUNITY END DATE------------ */}
          <div className="flex flex-col gap-2 lg:w-1/2">
            <label htmlFor="opportunityFillLastDate" className="label-style">
              Opportunity End Date <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="date"
              name="opportunityFillLastDate"
              id="opportunityFillLastDate"
              className="input-style"
              {...register("opportunityFillLastDate", {
                required: {
                  value: true,
                  message: "Please Enter Opportunity Fill Last Date",
                },
                validate: validateEndDate, // Validation function
              })}
            />
            {errors.opportunityFillLastDate && (
              <span className="error-style">
                {errors.opportunityFillLastDate.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          {/* -------------OPPORTUNITY TIME------------- */}
          <div className="flex flex-col space-y-2 md:w-1/2 w-full">
            <label className="label-style" htmlFor="opportunityDriveTime">
              Opportunity Drive Time <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="time"
              id="opportunityDriveTime"
              {...register("opportunityDriveTime", { required: true })}
              className="input-style"
            />
            {errors.opportunityDriveTime && (
              <span className="error-style">
                Opportunity Drive Time is required
              </span>
            )}
          </div>
          {/* -------------OPPORTUNITY MODE------------- */}
          <div className="flex flex-col space-y-2 md:w-1/2 w-full">
            <label className="label-style" htmlFor="opportunityMode">
              Opportunity Drive Mode <sup className="text-pink-200">*</sup>
            </label>
            <select
              type="text"
              name="opportunityMode"
              defaultValue=""
              id="opportunityMode"
              className="input-style"
              {...register("opportunityMode", { required: true })}
              onChange={handleOpportunityModeChange}
            >
              <option value="" disabled>
                Select Drive Mode
              </option>
              {opportunityModes.map((ele, i) => {
                return (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
            {errors.opportunityMode && (
              <span className="error-style">
                Opportunity Drive Mode is required
              </span>
            )}
          </div>
        </div>
        {/* -------------OPPORTUNITY DRIVE LINK------------- */}
        {opportunityMode === "ON-LINE" && (
          <div className="flex flex-col space-y-2 w-full">
            <label className="label-style" htmlFor="opportunityDriveLink">
              Opportunity Drive Link <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="url"
              id="opportunityDriveLink"
              {...register("opportunityDriveLink", { required: true })}
              className="input-style"
              placeholder="https://meet.google.com/oop-amtc-xxx"
            />
            {errors.opportunityDriveLink && (
              <span className="error-style">
                Opportunity Drive Link is required
              </span>
            )}
          </div>
        )}
        {/* ------------OPPORTUNITY EXTRA DETAILS---------- */}
        <div className="flex flex-col space-y-2">
          <label className="label-style" htmlFor="opportunityExtraDetails">
            Opportunity Extra Details
          </label>
          <input
            id="opportunityExtraDetails"
            placeholder="Enter Opportunity Extra Details"
            {...register("opportunityExtraDetails")}
            className="input-style"
          />
        </div>
        <div className="flex lg:justify-end justify-center gap-x-2 flex-wrap gap-y-2 ">
          <button
            onClick={goBack}
            className={`flex w-[80%] lg:w-fit cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-700 hover:bg-richblack-900 py-2 px-5 text-base font-semibold text-gray-100`}
          >
            Back
          </button>
          <ActionBtn disabled={loading} text="Next" type="submit">
            <MdNavigateNext className="hidden lg:inline-block" />
          </ActionBtn>
        </div>
      </form>
    </div>
  );
};

export default OpportunityDetails;
