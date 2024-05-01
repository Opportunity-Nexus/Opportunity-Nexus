import React from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCareerParticular } from "../../../Services/Operations/SocialLinks";
const SocialProfile = () => {
  const { register, handleSubmit } = useForm();
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const submitSocialLinks = async (data) => {
    try {
      console.log(token, data);
      const result = await updateCareerParticular(data, token);
      if (result) {
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("Error ", error.message);
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(submitSocialLinks)}>
        <div className=" flex flex-col gap-y-4 rounded-md border-[1px] dark:border-richblack-700 dark:bg-richblack-800 p-8 sm:px-6">
          <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start  ">
            Social Links
          </h2>
          <div className="flex-col  gap-2">
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="linkedin" className="label-style">
                <div className="flex items-center gap-x-1">
                  <FaLinkedinIn /> LinkedIn
                </div>
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                placeholder="https://linkedin.com/in/username"
                className="input-style"
                {...register("linkedin")}
              />
            </div>
          </div>
          <div className="flex-col  gap-2">
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="github" className="label-style">
                <div className="flex items-center gap-x-1">
                  <FaGithub /> GitHub
                </div>
              </label>
              <input
                type="url"
                name="github"
                id="github"
                placeholder="https://github.com/username"
                className="input-style"
                {...register("github")}
              />
            </div>
          </div>
          <div className="flex-col  gap-2">
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="twitter" className="label-style">
                <div className="flex items-center gap-x-1">
                  <FaXTwitter /> Twitter
                </div>
              </label>
              <input
                type="url"
                name="twitter"
                id="twitter"
                placeholder="https://twitter.com/username"
                className="input-style"
                {...register("twitter")}
              />
            </div>
          </div>
          <div className="flex-col  gap-2">
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="website" className="label-style">
                <div className="flex items-center gap-x-1">
                  <TbWorld />
                  Website
                </div>
              </label>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="https://"
                className="input-style"
                {...register("website")}
              />
            </div>
          </div>
          <div className="flex sm:justify-end justify-center flex-wrap gap-2 mt-6 ">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md dark:bg-red-500  px-3 font-semibold dark:text-richblack-5 border dark:border-richblack-800"
            >
              Cancel
            </button>
            <button
              className="bg-primary-600 hover:bg-primary-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SocialProfile;
