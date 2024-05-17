import React, { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import ActionBtn from "../../Common/ActionBtn";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgEditUnmask } from "react-icons/cg";
import { getUsetCompleteDetails } from "../../Services/Operations/SettingAPI";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaPencilAlt } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { formattedDate } from "../../Common/DateFormatter";
export default function MyProfile() {
  // const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(null);
  const completeUserDetails = async () => {
    try {
      console.log("showing....", userData);
      const result = await getUsetCompleteDetails(token);
      console.log("showing....", result);
      console.log("showing....", userData);
      if (result) {
        setUserData(result);
        console.log("hello", result);
        console.log(
          "socialll........",
          userData?.careerParticulars?.socialLinks
        );
      }
    } catch (error) {
      console.log(`Error While fetching the data: ${error}`);
    }
  };
  useEffect(() => {
    setLoading(true);
    completeUserDetails();
    setLoading(false);
  }, []);
  return (
    <>
      <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
        <div className="flex justify-center items-center py-12">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center dark:text-white ">
            Explore. Enhance. Express
            <span className="block text-primary-500">
              Your Profile Awaits!{" "}
            </span>
          </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="sm:mb-6 text-3xl font-bold text-black   dark:text-richblack-25 ml-4 sm:ml-5 mt-2 sm:mt-0 ">
            Your Profile
          </h1>
          <div className="mt-3 px-4 mb-3">
            <ActionBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/my-settings");
              }}
            >
              <RiEditBoxLine />
            </ActionBtn>
          </div>
        </div>
        {/* ------------------Profile section---------------- */}

        <div className="flex  items-center justify-between rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16 ">
          <div className="flex  flex-col-reverse items-center gap-x-72 w-full justify-center ">
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
        <div className="flex flex-col   rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16  mt-5">
          <p className="flex gap-1 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
            <span>
              <FaPencilAlt />
            </span>{" "}
            About
          </p>
          <hr className="w-full text-gray-400" />
          <div className="text-gray-500 text-base mt-4">
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
        {/*------------------------------- Your Work Experience ------------------------------- */}
        <div className="flex flex-col   rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16  mt-5">
          <p className="flex gap-1 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
            Work Experience
          </p>
          <hr className="w-full text-gray-400" />
          <div className="text-gray-500 text-base mt-4">
            {userData?.additionalDetails?.about ? (
              userData?.additionalDetails?.about
            ) : (
              <>
                <Link to="/dashboard/my-settings">
                  <p>Update your Work Experience</p>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* -------------------------------Educations -------------------------------*/}
        <div className="flex flex-col  rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16 mt-5">
          <p className="flex gap-2 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
            <span>
              <GiGraduateCap />
            </span>{" "}
            Education
          </p>
          <hr className="w-full text-gray-400" />
          <Table className="mt-4 dark:text-gray-400 text-gray-700">
            <Thead>
              <Tr>
                <Th>Education</Th>
                <Th>Education Board</Th>
                <Th>Specialization</Th>
                <Th>Percentage</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData?.careerParticulars?.education.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={4}
                    className="py-5 text-center text-base font-medium text-richblack-100"
                  >
                    <Link to="/dashboard/my-settings">
                      <p>Please Update Your Educational Details</p>
                    </Link>
                  </Td>
                </Tr>
              ) : (
                userData?.careerParticulars?.education.map((item, index) => {
                  return (
                    <>
                      <Tr
                        className="  gap-x-10 border-b border-richblack-800 px-6 py-8"
                        key={index}
                      >
                        <Td className="text-center">{item.education}</Td>
                        <Td className="text-center">{item.educationBoard}</Td>
                        <Td className="text-center">{item.educationDegree}</Td>
                        <Td className="text-center">
                          {" "}
                          {item.educationPercentage}
                        </Td>
                      </Tr>
                    </>
                  );
                })
              )}
            </Tbody>
          </Table>
        </div>
        {/* -------------------------------Internship------------------------------- */}
        <div className="flex flex-col  rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16 mt-5">
          <p className="flex gap-2 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
            Internship
          </p>
          <hr className="w-full text-gray-400" />
          <Table className="mt-4 dark:text-gray-400 text-gray-700">
            <Thead>
              <Tr>
                <Th>Company </Th>
                <Th>Certification Number</Th>
                <Th>Certificate Link</Th>
                <Th>Internship Start Date</Th>
                <Th>Internship Last Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData?.careerParticulars?.internships.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={5}
                    className="py-5 text-center text-base font-medium text-richblack-100"
                  >
                    <Link to="/dashboard/my-settings">
                      <p> Please Update Your Internship Details</p>
                    </Link>
                  </Td>
                </Tr>
              ) : (
                userData?.careerParticulars?.internships.map((item, index) => {
                  return (
                    <>
                      <Tr
                        className=" gap-x-10 border-b border-richblack-800 px-6 py-8"
                        key={index}
                      >
                        <Td className="text-center">{item.companyName}</Td>
                        <Td className="text-center">
                          {item.certificationNumber}
                        </Td>
                        <Td className="text-center">{item.certificateLink}</Td>
                        <Td className="text-center">
                          {formattedDate(item.internshipStartDate)}
                        </Td>
                        <Td className="text-center">
                          {formattedDate(item.internshipLastDate)}
                        </Td>
                      </Tr>
                    </>
                  );
                })
              )}
            </Tbody>
          </Table>
        </div>
        {/* -------------------------------Projects------------------------------- */}
        <div className="flex flex-col  rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16 mt-5">
          <p className="flex gap-2 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
            Project Description
          </p>
          <hr className="w-full text-gray-400" />
          <Table className="mt-4 dark:text-gray-400 text-gray-700">
            <Thead>
              <Tr>
                <Th>Project Name </Th>
                <Th>Project Description</Th>
                <Th>Technology Stack</Th>
                <Th>Project Link</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData?.careerParticulars?.projects.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={4}
                    className="py-5 text-center text-base font-medium text-richblack-100"
                  >
                    <Link to="/dashboard/my-settings">
                      <p> Please Update Your Project Details</p>
                    </Link>
                  </Td>
                </Tr>
              ) : (
                userData?.careerParticulars?.projects.map((item, index) => {
                  return (
                    <>
                      <Tr
                        className=" gap-x-10 border-b border-richblack-800 px-6 py-8"
                        key={index}
                      >
                        <Td className="text-center">{item.projectName}</Td>
                        <Td className="text-center">
                          {item.projectDescription}
                        </Td>
                        <Td className="text-center">
                          {item.projectTechnologyStack}
                        </Td>
                        <Td className="text-center">{item.projectLink}</Td>
                      </Tr>
                    </>
                  );
                })
              )}
            </Tbody>
          </Table>
        </div>
        {/* -------------------------------Carrer details------------------------------- */}
        <div className="flex flex-col  rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-richblack-800 p-8 px-16 mt-5">
          <p className="flex gap-2 items-center text-lg font-semibold px-2 dark:text-richblack-5 mb-4">
            Career Details
          </p>
          <hr className="w-full text-gray-400" />
          <Table className="mt-4 dark:text-gray-400 text-gray-700">
            <Thead>
              <Tr>
                <Th>Your Skills</Th>
                <Th>Work Experience</Th>
                <Th>Achievements</Th>
                <Th>Preference</Th>
                <Th>Work Mode</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData?.careerParticulars?.workExperience.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={5}
                    className="py-5 text-center text-base font-medium text-richblack-100"
                  >
                    <Link to="/dashboard/my-settings">
                      <p> Please Update Your Career Details</p>
                    </Link>
                  </Td>
                </Tr>
              ) : (
                userData?.careerParticulars?.workExperience.map(
                  (item, index) => {
                    return (
                      <>
                        <Tr
                          className=" gap-x-10 border-b border-richblack-800 px-6 py-8"
                          key={index}
                        >
                          <Td className="text-center">{item.skills}</Td>
                          <Td className="text-center">
                            {item.workExperiences}
                          </Td>
                          <Td className="text-center">{item.achievements}</Td>
                          <Td className="text-center">{item.oppToLookFor}</Td>
                          <Td className="text-center">{item.workModeChoice}</Td>
                        </Tr>
                      </>
                    );
                  }
                )
              )}
            </Tbody>
          </Table>
        </div>
        {/* </div> */}
      </div>
      ;
    </>
  );
}
