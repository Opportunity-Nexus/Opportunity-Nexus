import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createProjectDetails } from "../../../Services/Operations/Projects";
import { useSelector } from "react-redux";
import { FaDeleteLeft } from "react-icons/fa6";
export default function Project() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [techStacks, setTechStacks] = useState([]);
  const handleTechStackSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTech = event.target.value.trim();
      if (newTech && !techStacks.includes(newTech)) {
        setTechStacks([...techStacks, newTech]);
        event.target.value = " ";
      }
    }
  };
  const handleDeleteTechStack = (techStackToDelete) => {
    setTechStacks(techStacks.filter((stack) => stack !== techStackToDelete));
  };
  const onSubmit = async (data) => {
    const projectData = {
      ...data,
      projectTechnologyStack: JSON.stringify([techStacks.join(", ")]),
    };
    console.log(projectData, token);
    console.log(techStacks);
    data.techStacks = techStacks;
    try {
      const result = await createProjectDetails(token, projectData);
      if (result) {
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("error message", error);
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4 rounded-md border-[1px] dark:border-richblack-700 dark:bg-richblack-800 p-8 sm:px-6">
          <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start  ">
            Project Description
          </h2>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="projectName" className="label-style">
              Project Name<sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="projectName"
              id="projectName"
              className="input-style"
              placeholder="Enter Your project Name"
              {...register("projectName", { required: true })}
            />
            {errors.projectName && (
              <span className="error-style">Enter your project name</span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="projectDescription" className="label-style">
              Project Description<sup className="text-pink-200">*</sup>
            </label>
            <textarea
              type="text"
              name="projectDescription"
              id="projectDescription"
              className="input-style"
              placeholder="Enter Your project Description"
              {...register("projectDescription", { required: true })}
            />
            {errors.projectDescription && (
              <span className="error-style">
                Enter your project description
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="projectTechnologyStack" className="label-style">
              Technology Stack<sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="projectTechnologyStack"
              id="projectTechnologyStack"
              className="input-style"
              placeholder="Enter Tech stacks you used e.g  MERN and then press Enter"
              onKeyDown={handleTechStackSubmit}
              {...register("projectTechnologyStack", { required: true })}
            />
            {errors.projectTechnologyStack && (
              <span className="error-style">Enter your project name</span>
            )}
            <div>
              {techStacks.map((techStack) => (
                <span
                  key={techStack}
                  className="font-semibold text-sm flex-col px-1 items-center gap-x-2 justify-center "
                >
                  {techStack}
                  <button
                    type="button"
                    className=""
                    onClick={() => handleDeleteTechStack(techStack)}
                  >
                    <FaDeleteLeft />
                  </button>
                  {"  "}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="projectLink" className="label-style">
              Project Link<sup className="text-pink-200">*</sup>
            </label>
            <input
              type="url"
              name="projectLink"
              id="projectLink"
              className="input-style"
              placeholder="Enter Your project link"
              {...register("projectLink", { required: true })}
            />
            {errors.projectLink && (
              <span className="error-style">Enter your project link</span>
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
}
