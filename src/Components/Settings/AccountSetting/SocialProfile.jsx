import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { updateCareerParticular } from "../../../Services/Operations/SocialLinks";

const SocialProfile = () => {
  const { user, token } = useSelector((state) => state.auth); // Assuming token is stored in the auth state
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      linkedin: user?.careerParticulars?.socialLinks?.LinkedIn || "",
      github: user?.careerParticulars?.socialLinks?.GitHub || "",
      twitter: user?.careerParticulars?.socialLinks?.Twitter || "",
      website: user?.careerParticulars?.socialLinks?.Website || "",
    },
  });

  const submitSocialLinks = async (data) => {
    try {
      const result = await updateCareerParticular({ ...data, token });
      if (result) {
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.log("Error ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitSocialLinks)}>
      <div className="flex flex-col gap-y-4 rounded-md border dark:border-richblack-700 dark:bg-richblack-800 p-8">
        <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start  ">
          Social Links
        </h2>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="linkedin"
            className="flex items-center gap-x-1 text-base font-semibold text-black dark:text-richblack-5"
          >
            <FaLinkedin /> LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            placeholder="https://linkedin.com/in/username"
            className="input-style"
            {...register("linkedin", {
              pattern: {
                value: /^https:\/\/(www\.)?linkedin\.com\/in\/[^/]+\/?$/,
                message: "Enter a valid LinkedIn URL",
              },
            })}
          />
          {errors.linkedin && (
            <p className="text-red-500">{errors.linkedin.message}</p>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="github"
            className="flex items-center gap-x-1 text-base font-semibold text-black dark:text-richblack-5"
          >
            <FaGithub /> GitHub
          </label>
          <input
            type="url"
            name="github"
            id="github"
            placeholder="https://github.com/username"
            className="input-style"
            {...register("github", {
              pattern: {
                value: /^https:\/\/(www\.)?github\.com\/[^/]+\/?$/,
                message: "Enter a valid GitHub URL",
              },
            })}
          />
          {errors.github && (
            <p className="text-red-500">{errors.github.message}</p>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="X"
            className="flex items-center gap-x-1 text-base font-semibold text-black dark:text-richblack-5"
          >
            <FaXTwitter /> Twitter
          </label>
          <input
            type="url"
            name="twitter"
            id="twitter"
            placeholder="https://twitter.com/username"
            className="input-style"
            {...register("twitter", {
              pattern: {
                value: /^https:\/\/(www\.)?twitter\.com\/[^/]+\/?$/,
                message: "Enter a valid X URL",
              },
            })}
          />
          {errors.twitter && (
            <p className="text-red-500">{errors.twitter.message}</p>
          )}
        </div>

        <div className="relative flex flex-col gap-2">
          <label
            htmlFor="website"
            className="flex items-center gap-x-1 text-base font-semibold text-black dark:text-richblack-5"
          >
            <TbWorld /> Website
          </label>
          <input
            type="url"
            name="website"
            id="website"
            placeholder="https://example.com"
            className="input-style"
            {...register("website", {
              pattern: {
                value: /^https:\/\/.+$/,
                message: "Enter a valid Website URL",
              },
            })}
          />
          {errors.website && (
            <p className="text-red-500">{errors.website.message}</p>
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
  );
};

export default SocialProfile;
