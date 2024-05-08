import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../Services/Operations/SettingAPI";
const genders = ["Male", "Female", "Non-Binary", "Prefer Not to say", "Other"];
export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("Error Message-", error.message);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitProfileForm)}
        action=""
        className="space-y-8 rounded-md border border-1 dark:border-richblack-700 dark:bg-richblack-800 p-6 "
      >
        <div className="my-4 flex flex-col gap-y-2 rounded-md ">
          <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start ">
            Profile Information{" "}
          </h2>
          <div className="flex space-x-2 ">
            <div className="flex flex-col space-y-2 w-full">
              <label htmlFor="firstName" className="label-style ">
                First Name
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                className="input-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="error-style">
                  Please Enter your First name{" "}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full ">
              <label htmlFor="lastName" className="label-style">
                Last Name
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                className="input-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="error-style">
                  Please Enter your Last name{" "}
                </span>
              )}
            </div>
          </div>
          <div className="sm:flex  sm:space-x-2 ">
            {/* <div className="flex flex-col gap-5 lg:flex-row w-full border "> */}
            <div className="flex flex-col  w-full space-y-2 mt-1 ">
              <label htmlFor="dateOfBirth" className="label-style">
                {" "}
                Date of Birth
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-700 dark:border-none rounded-lg w-full px-3 py-3 shadow-[0_1px_0_0] shadow-white/25"
                {...register("dateOfBirth", {
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future ",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="error-style">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            {/* </div> */}
            <div className="flex flex-col  sm:w-full space-y-2 sm:mt-1 mt-3   ">
              <label htmlFor="gender" className="label-style">
                Gender
                <sup className="text-pink-200">*</sup>
              </label>
              <select
                name="gender"
                id="gender"
                className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-700 dark:border-none rounded-lg w-full px-3 py-3 shadow-[0_1px_0_0] shadow-white/25"
                {...register("gender")}
                defaultValue={user?.additionalDetails?.gender || ""}
              >
                <option value="" disabled>
                  Choose Your Gender
                </option>
                {genders.map((element, i) => (
                  <option key={i} value={element}>
                    {element}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="error-style">Please Select your gender</span>
              )}
            </div>
          </div>
          <div className="">
            <div className="flex flex-col w-full space-y-2 sm:mt-1">
              <label htmlFor="contactNumber" className="label-style ">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder=" Enter Contact Number"
                className="border border-gray-300 text-black dark:text-richblack-25 bg-gray-50 dark:bg-richblack-700 dark:border-none rounded-lg w-full px-3 py-3 shadow-[0_1px_0_0] shadow-white/25"
                {...register("contactNumber", {
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="error-style">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col  w-full space-y-2 mt-2">
              <label htmlFor="about" className="label-style ">
                About
              </label>
              <textarea
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-700 dark:border-none rounded-lg w-full px-3 py-3 shadow-[0_1px_0_0] shadow-white/25"
                {...register("about")}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="error-style">Pleas enter Your About</span>
              )}
            </div>
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
}
