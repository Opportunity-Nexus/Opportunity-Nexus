import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
const Education = ({ userData }) => {
  return (
    <>
      <h1 className="flex justify-start items-center gap-x-2 text-2xl font-semibold dark:text-richblack-25 mb-4 my-8 ">
        {" "}
        <span>
          <FaGraduationCap />
        </span>{" "}
        Education Details
      </h1>

      {userData?.careerParticulars?.education.length === 0 ? (
        <>
          <span>
            {" "}
            <Link to="/dashboard/my-settings">
              <button className="dark:text-blue-600 flex justify-start px-4 text-lg ">
                + Add your Education
              </button>
            </Link>
          </span>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-2 ">
            {userData?.careerParticulars?.education.map((item, index) => {
              return (
                <div
                  className="flex flex-col rounded-lg dark:border-richblack-700 bg-gray-100 dark:bg-richblack-800 p-6  px-4 mt-5 flex-grow "
                  key={index}
                >
                  <Link to="/dashboard/my-settings">
                    <span className="flex justify-end text-blue-600">
                      <MdOutlineEdit size={24} />
                    </span>
                  </Link>
                  <h1 className="text-2xl font-semibold mb-3 text-primary-600">
                    {item.education}
                  </h1>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col ">
                      <span className="text-lg dark:text-gray-400">
                        {item.educationBoard}
                      </span>
                      <span className=" dark:text-gray-400 text-lg">
                        {item.educationDegree}
                      </span>
                    </div>
                    <span className="text-lg dark:text-gray-400">
                      {item.educationPercentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            {userData?.careerParticulars?.education.length < 3 && (
              <span>
                {" "}
                <Link to="/dashboard/my-settings">
                  <button className="dark:text-blue-600 flex justify-start px-4 mt-4 text-lg ">
                    + Add your Education
                  </button>
                </Link>
              </span>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Education;
