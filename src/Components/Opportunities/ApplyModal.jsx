import { useState } from "react";
import toast from "react-hot-toast";
import CustomModal from "../CustomModal";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { apiConnector } from "../../Services/ApiConnector";
import { oncampusEndpoints } from "../../Services/BackendApis";
import { getStudentEnrolled } from "../../Services/Operations/OnCampusApi";
// const {  GET_STUDENT_ENROLLED } = oncampusEndpoints;

const ApplyModal = ({ opportunityId, opportunity, isOpen, setIsOpen }) => {
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  async function applyToOpportunity({ opportunity, opportunityId, token }) {
    try {
      // console.log("DATA BEFORE DELETE", token, opportunity.frontendId);
      const result = await getStudentEnrolled(
        opportunityId,
        token
      );

      // ! TODO: backend call here

      // const response = {}; // placeholder for now
      if (result.data.success) {
        toast.success("Successfully applied to opportunity!");
        setIsApplicationSubmitted(true);
      } else {
        throw new Error("Something went wrong while applying to opportunity");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  

  return (
    <>
      <CustomModal
        closeModal={() => {
          setIsOpen(() => false);
        }}
        isOpen={isOpen}
      >
        <div className="lg:min-w-lg flex w-full flex-col items-center justify-center gap-4 py-5">
          {!isApplicationSubmitted ? (
            <>
              <p className="max-w-lg text-center text-xl font-medium text-gray-500 dark:text-gray-300 py-2">
                Your details will be shared, make sure all the deatils are
                updated!!
              </p>

              <form
                className="flex w-full max-w-md flex-col items-center justify-center gap-5"
                onSubmit={() => {
               
                  applyToOpportunity()
                }}
              >
                <div className="flex flex-col justify-center gap-2 items-center w-full">
                  <button
                  // onClick={(() => applyToOpportunity())}
                    className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium  rounded-md text-white bg-primary-500 hover:bg-primary-700 cursor-pointer w-full"
                    type="submit"
                  >
                    Submit
                  </button>

                  <button
                    onClick={() => {
                      navigate("/dashboard/my-settings");
                    }}
                    className="inline-flex items-center justify-center px-3 py-2 border border-black dark:border-white text-base font-medium  rounded-md text-black dark:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white cursor-pointer w-full"
                  >
                    Update Details
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p className="flex max-w-lg flex-col gap-4 text-center">
                <span>Successfully applied to opportunity!!</span>
                <FaCheckCircle className="mx-auto h-10 w-10 text-green-500" />
              </p>
            </>
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default ApplyModal;
