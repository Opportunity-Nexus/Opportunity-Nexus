import React from "react";
import { Link } from "react-router-dom";
import { VscDebugBreakpointLog } from "react-icons/vsc";

const WorkExperience = ({ userData }) => {
  return (
    <>
      <div className="flex flex-col   rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16  mt-5">
        <p className="flex gap-1 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
          Work Experience
        </p>
        <hr className="w-full text-gray-400 mb-3" />
        {userData?.careerParticulars?.workExperience.length === 0 ? (
          <>
            <span>
              {" "}
              <Link to="/dashboard/my-settings">
                <button className="dark:text-blue-600 flex justify-start px-4 mt-4 text-lg ">
                  + Tell us about the professional roles you have held.
                </button>
              </Link>
            </span>
          </>
        ) : (
          <>
            {userData?.careerParticulars?.workExperience.map((item, index) => {
              return (
                <div key={index} className="mt-2 gap-y-2">
                  <p className="flex text-justify  text-gray-600 dark:text-gray-500  text-base">
                    <span>
                      {" "}
                      <VscDebugBreakpointLog size={18} />{" "}
                    </span>
                    {item}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default WorkExperience;
