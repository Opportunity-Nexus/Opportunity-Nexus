import { useState } from "react";
import toast from "react-hot-toast";
import CustomModal from "../CustomModal";
import { FaCheckCircle } from "react-icons/fa";

const ApplyModal = ({ opportunity, isOpen, setIsOpen }) => {
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  const [answerValue, setAnswerValue] = useState(null);

  async function applyToOpportunity() {
    try {
      if (answerValue) {
        toast.error("Please fill up the answer first to apply");
        return;
      }

      // ! TODO: backend call here

      const response = {}; // placeholder for now
      if (response.data.success) {
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
              <p className="max-w-lg text-center">
                Give the answer to this question to apply to the opportunity.
              </p>

              <form
                className="flex w-full max-w-md flex-col items-center justify-center gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  applyToOpportunity().catch((error) => console.error(error));
                }}
              >
                <div className="flex w-full flex-col gap-3">
                  <textarea
                    label="Your product description (optional)"
                    id="description"
                    type="text"
                    onChangeHandler={(e) => {
                      setAnswerValue(() => e.target.value);
                    }}
                    placeholder="Description"
                    fullWidth
                    value={answerValue}
                  />
                </div>

                <div className="w-fit">
                  <button className="flex" type="submit">
                    Submit
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
