import React from "react";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
const Project = ({ userData }) => {
  return (
    <div>
      <h1 className="flex justify-start items-center gap-x-2 text-2xl font-semibold dark:text-richblack-25 mb-12 my-10 ">
        {" "}
        <span>
          <IoInformationCircle size={28} />
        </span>
        My Projects
      </h1>
      <div className="grid grid-cols-12 gap-6 ">
        {userData?.careerParticulars?.projects.length === 0 ? (
          <>
            <span className="col-span-12 ">
              {" "}
              <Link to="/dashboard/my-settings">
                <button className="text-blue-600 flex justify-start px-4 text-lg ">
                  + Kindly share the specifics of your project.
                </button>
              </Link>
            </span>
          </>
        ) : (
          <>
            {userData?.careerParticulars?.projects.map((item, i) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-4 border dark:border-richblack-700 rounded-[20px]"
                key={i}
              >
                <div className="bg-white dark:bg-[#162231] h-full rounded-[20px] flex flex-col">
                  <img
                    // src={ProjectImage}
                    src={`https://source.unsplash.com/random/?Coding/${item.projectName}`}
                    alt={item.projectName}
                    className="max-w-full h-64 w-full rounded-[20px]  "
                  />
                  <div className="flex flex-col grow p-4 lg:p-6 ">
                    <div className="grow ">
                      <h4 className="text-2xl text-primary-600 font-semibold mb-4">
                        {item.projectName}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-500 text-base tracking-tighter text-justify ">
                        {item.projectDescription}
                      </p>
                    </div>
                    <div className="flex mt-2 flex-wrap mb-0">
                      {item.projectTechnologyStack.map((data, i) => {
                        return (
                          <>
                            <span
                              key={i}
                              className="m-1 w-fit flex items-center rounded-full bg-primary-700 px-3 py-1 text-sm text-richblack-5"
                            >
                              {data}
                              {"  "}
                            </span>
                          </>
                        );
                      })}
                    </div>

                    <Link to={item.projectLink}>
                      <button className="border border-blue-600 rounded hover:bg-primary-600 dark:text-gray-300 hover:text-white transition duration-300 py-2 px-5 mt-6">
                        Review Project
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Project;
