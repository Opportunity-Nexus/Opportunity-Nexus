import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { fetchAllStudentEnrolledInAOpportunity } from "../../Services/Operations/OnCampusApi";
import { Link } from "react-router-dom";

const EnrolledStudentsModal = ({ opportunityId, token, isOpen, setIsOpen }) => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    fetchAllStudentEnrolledInAOpportunity({
      opportunityId: opportunityId,
      token: token,
    })
      .then((data) => {
        setEnrolledStudents(() => {
          console.log({ enrolledStudents: data });
          return data || [];
        });
      })
      .catch((error) => console.error(error));
  }, [opportunityId, token, isOpen]);

  return (
    <>
      <CustomModal
        closeModal={() => {
          setIsOpen(() => false);
        }}
        isOpen={isOpen}
      >
        <div className="lg:min-w-lg flex w-full flex-col items-center justify-center gap-4 py-5">
          {enrolledStudents ? (
            <>
              {enrolledStudents.length > 0 ? (
                <>
                  <div className="text-center px-2 py-1 rounded-lg mr-auto text-base md:text-lg font-semibold text-primary-500">
                    {enrolledStudents.length} Student Enrolled in this
                    opportunity
                  </div>
                  <ul className="flex flex-col gap-2 px-2 py-3 items-start mr-auto w-full">
                    {enrolledStudents.map((student, index) => (
                      <li className="flex flex-row justify-between w-full gap-4 items-center">
                        <div className="flex justify-center items-center gap-3 font-medium text-gray-500 dark:text-gray-300">
                          <span>{index + 1}.</span>
                          <span>
                            {student.firstName + " " + student.lastName}
                          </span>
                        </div>
                        <Link to={`/enrolled-student/${student._id}`} target="_blank">
                          <FaExternalLinkSquareAlt className="h-6 w-6 p-1 text-black dark:text-white" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p className="flex max-w-lg flex-col gap-4 text-center text-base md:text-lg font-medium text-gray-500 dark:text-gray-300">
                    <span>
                      No Student has applied to this opportunity yet!!
                    </span>
                  </p>
                </>
              )}
            </>
          ) : (
            <div className="h-screen flex flex-1 items-center justify-center">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default EnrolledStudentsModal;
