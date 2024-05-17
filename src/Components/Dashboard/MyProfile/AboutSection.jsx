import React from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
const AboutSection = ({ userData }) => {
  return (
    <>
      <div className="flex flex-col   rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16  mt-5">
        <p className="flex gap-1 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
          <span>
            <FaPencilAlt />
          </span>{" "}
          About
        </p>
        <hr className="w-full text-gray-400" />
        <div className="text-gray-600 dark:text-gray-500 text-justify text-base mt-4">
          {userData?.additionalDetails?.about ? (
            userData?.additionalDetails?.about
          ) : (
            <>
              <Link to="/dashboard/my-settings">
                <p>Write Something About Yourself</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutSection;
