import React from "react";
import { MdEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { CgEditUnmask } from "react-icons/cg";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";

const ProfileSection = ({ userData }) => {
  return (
    <>
      <div className="flex  items-center justify-between rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16 ">
        <div className="flex  flex-col lg:flex-col items-center gap-x-72 w-full justify-center ">
          <div className="space-y-0">
            <div className="text-3xl font-semibold px-4 text-gray-700 dark:text-richblack-25 ">
              <span>{userData?.firstName + " " + userData?.lastName} </span>
            </div>
            <div className="text-sm font-semibold px-2 text-gray-700 dark:text-richblack-25">
              <div className="flex items-center gap-x-2 text-base font-semibold px-2 dark:text-richblack-5">
                <MdEmail />
                <span>{userData?.email}</span>
              </div>
            </div>
            <div className="text-sm font-semibold px-2 text-gray-700 dark:text-richblack-25">
              <div className="flex items-center gap-x-2 text-base font-semibold px-2 dark:text-richblack-5">
                <FaRegUserCircle />
                <span>{userData?.accountType} </span>
              </div>
            </div>
            <div className="text-sm font-semibold px-2 text-gray-700 dark:text-richblack-25 ">
              <div className="flex items-center gap-x-2 text-base font-semibold px-2 dark:text-richblack-5 mb-5">
                <CgEditUnmask />
                <span>{userData?.enrollmentNumber}</span>
              </div>
            </div>
          </div>

          {/* img div */}
          <div className="flex flex-col justify-center  ">
            <div className="flex items-center justify-center">
              <img
                src={userData?.image}
                alt={`profile-${userData?.firstName}`}
                className="aspect-square w-[130px] rounded-full flex "
              />
            </div>
            <div className="flex gap-x-3 justify-center m-2 py-2">
              {/* {userData?.careerParticulars?.socialLinks} */}
              <FaLinkedin size={24} className="text-blue-500" />
              <FaGithub size={24} className="dark:text-white" />
              <FaXTwitter size={24} className="dark:text-white" />
              <TbWorldWww size={24} className="dark:text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
