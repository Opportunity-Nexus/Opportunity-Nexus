import React from "react";
import { formattedDate } from "../../../Common/DateFormatter";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
const Internship = ({ userData }) => {
  return (
    <>
      <h1 className="flex justify-start items-center gap-x-2 text-2xl font-semibold dark:text-richblack-25  my-12 ">
        {" "}
        <span>
          <FaGraduationCap />
        </span>{" "}
        My Internships
      </h1>

      {userData?.careerParticulars?.internships.length === 0 ? (
        <>
          <span>
            {" "}
            <Link to="/dashboard/my-settings">
              <button className="dark:text-blue-600 flex justify-start px-4 text-lg ">
                + Add your Internships
              </button>
            </Link>
          </span>
        </>
      ) : (
        <>
          <div>
            {userData?.careerParticulars?.internships.map((item, i) => {
              return (
                <div className="">
                  <div className="border dark:border-gray-800 border-gray-300 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100 mb-2 p-4">
                    <div className="flex justify-between items-center ">
                      <h1 className="text-2xl font-semibold mb-3 text-primary-600">
                        {item.companyName}
                      </h1>
                      <span className="flex items-center gap-2">
                        {item.certificationNumber && (
                          <span className="text-lg font-semibold dark:text-gray-300">
                            {item.certificationNumber}
                          </span>
                        )}
                        <Link to="/dashboard/my-settings">
                          <span className="flex justify-end text-blue-600">
                            <MdOutlineEdit size={20} />
                          </span>
                        </Link>
                      </span>
                    </div>
                    <div className=" flex flex-col">
                      <span className="flex  items-center text-md dark:text-gray-500 text-gray-600 gap-2 ">
                        <IoCalendarOutline />
                        <span>
                          Internship Started On
                          {formattedDate(item.internshipStartDate)}
                        </span>
                      </span>
                      {item.internshipLastDate ? (
                        <span className="flex  items-center text-md dark:text-gray-500 text-gray-600 gap-2 ">
                          <IoCalendarOutline />
                          <span>
                            Internship Closed On
                            {formattedDate(item.internshipLastDate)}
                          </span>
                        </span>
                      ) : (
                        <span className="flex  items-center text-md text-green-500  gap-2 ">
                          On-Going Internship
                        </span>
                      )}
                    </div>
                    <Link
                      to={item.certificateLink}
                      className="flex justify-end dark:text-gray-600"
                    >
                      <button className="bg-yellow-400 text-base p-2 rounded-md mt-4 px-2  ">
                        View Certificate
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Internship;
