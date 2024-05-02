import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { educationData } from "../../../Data/Education/EducationData";
import { educationBoardData } from "../../../Data/Education/EducationBoardData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createEducatoinDetails } from "../../../Services/Operations/Education";
const Education = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [selectedEducation, setSelectedEducation] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: "",
    },
  });
  const submitEducationForm = async (data) => {
    try {
      console.log(token, data);
      const result = await createEducatoinDetails(data, token);
      if (result) {
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("error Message: ", error.message);
    }
  };

  const selectEducationBoards = educationBoardData[selectedEducation] || [];
  return (
    <>
      <form action="" onSubmit={handleSubmit(submitEducationForm)}>
        <div className="flex flex-col gap-y-4 rounded-md border-[1px] dark:border-richblack-700 dark:bg-richblack-800 p-8 sm:px-6">
          <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start  ">
            Education
          </h2>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="education" className="label-style">
              Your qualifications <sup className="text-pink-200">*</sup>
            </label>
            <select
              name="education"
              id="education"
              className="input-style"
              {...register("education", { required: true })}
              onChange={(e) => setSelectedEducation(e.target.value)}
              defaultValue=" "
            >
              <option value="" disabled>
                Choose Your Qualification
              </option>
              {educationData.map((element, i) => {
                return (
                  <option key={i} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            {errors.education && (
              <span className="error-style">
                Please Select your qualification
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="educationBoard" className="label-style">
              Your education Board <sup className="text-pink-200">*</sup>
            </label>
            <select
              type="text"
              name="educationBoard"
              id="educationBoard"
              placeholder="College/University"
              className="input-style"
              {...register("educationBoard", { required: true })}
              defaultValue=""
            >
              <option value="" disabled>
                Choose Your board
              </option>
              {selectEducationBoards.map((element, i) => {
                return (
                  <option key={i} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            {errors.educationBoard && (
              <span className="error-style">
                Please Select your qualification
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="educationDegree" className="label-style">
              What's Your Specetialization{" "}
              <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="educationDegree"
              id="educationDegree"
              className="input-style"
              placeholder="i.e PCM, PCB, CSE"
              {...register("educationDegree", {
                required: true,
              })}
            />
            {errors.educationDegree && (
              <span className="error-style">Enter your Specetialization</span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="educationPercentage" className="label-style">
              What's Your Percentage<sup className="text-pink-200">*</sup>
            </label>
            <input
              type="number"
              name="educationPercentage"
              id="educationPercentage"
              className="input-style"
              placeholder="i.e 80, 70"
              {...register("educationPercentage", {
                required: true,
              })}
            />
            {errors.educationPercentage && (
              <span className="error-style">Enter Your respective marks</span>
            )}
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

export default Education;
