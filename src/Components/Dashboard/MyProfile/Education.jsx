import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router-dom";
const Education = ({ userData }) => {
  return (
    <>
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
    </>
  );
};

export default Education;
