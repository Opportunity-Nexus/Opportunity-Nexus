import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInternshipDetails } from "../../../Services/Operations/SettingAPI";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const Internship = () => {
  const { token } = useSelector((state) => state.auth);
  const [isOnGoing, setIsOnGoing] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleCheckboxChange = (event) => {
    setIsOnGoing(event.target.checked);
  };
  const submitInternshipForm = async (data) => {
    try {
      console.log(token, data);
      const result = await createInternshipDetails(data, token);
      if (result) {
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("error Message: ", error.message);
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(submitInternshipForm)}>
        <div className="flex flex-col gap-y-4 rounded-md border-[1px] dark:border-richblack-700 dark:bg-richblack-800 p-8 sm:px-6">
          <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start  ">
            Internship
          </h2>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="companyName" className="label-style">
              Company <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              className="input-style"
              placeholder="Company Name"
              {...register("companyName", { required: true })}
            />
            {errors.companyName && (
              <span className="error-style">Enter Your Company Name</span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="certificationNumber" className="label-style">
              Certification Number
            </label>
            <input
              type="text"
              name="certificationNumber"
              id="certificationNumber"
              className="input-style"
              placeholder="Enter your certificate number"
              {...register("certificationNumber")}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="certificateLink" className="label-style">
              Certificate Link
            </label>
            <input
              type="url"
              name="certificateLink"
              id="certificateLink"
              className="input-style"
              placeholder="i.e: https://certification-link"
              {...register("certificateLink")}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="internshipStartDate" className="label-style">
              Internship Start Date<sup className="text-pink-200">*</sup>
            </label>

            <input
              type="date"
              name="internshipStartDate"
              id="internshipStartDate"
              className="input-style"
              placeholder="Start date"
              max={today}
              {...register("internshipStartDate", {
                required: "Enter your Start date of internship",
              })}
            />
            {errors.internshipStartDate && (
              <span className="error-style">
                {errors.internshipStartDate.message}
              </span>
            )}
          </div>
          {!isOnGoing && (
            <div className="flex flex-col space-y-2 w-full">
              <label htmlFor="internshipLastDate" className="label-style">
                Internship Last Date
              </label>
              <input
                type="date"
                name="internshipLastDate"
                id="internshipLastDate"
                className="input-style"
                placeholder="Start date"
                max={today}
                {...register("internshipLastDate")}
              />
            </div>
          )}
          <div className="flex space-x-2 w-full items-center">
            <input
              type="checkbox"
              name="currentlyWorking"
              id="currentlyWorking"
              onChange={handleCheckboxChange}
              checked={isOnGoing}
            />
            <label htmlFor="currentlyWorking" className="label-style">
              I currently work here
            </label>
          </div>

          <div className="flex justify-center sm:justify-end gap-2  flex-wrap">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md dark:bg-red-500 py-2 px-5 font-semibold  dark:text-richblack-5 border dark:border-richblack-700"
            >
              Cancel
            </button>
            <button
              className="bg-primary-600 hover:bg-primary-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Internship;
