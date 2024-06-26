import React from "react";
import { CalendarIcon } from "@heroicons/react/solid";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";
import { removeBookmarkedOpportunity } from "../../Services/Operations/MyOpportunity";
import { useSelector } from "react-redux";

const SavedOpportunityCard = (opportunity) => {
  const isExpired = new Date(opportunity.endDate) < new Date();
  const { token } = useSelector((state) => state.auth);

  const handleOpportunityDelete = async () => {
    try {
      console.log("DATA BEFORE DELETE", token, opportunity.frontendId);
      const result = await removeBookmarkedOpportunity(
        opportunity.frontendId,
        token
      );
      if (result) {
        opportunity.setSavedOpportunitiesList((data) =>
          data.filter((i) => i._id !== opportunity._id)
        );
        toast.success("Opportunity removed from your profile!", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 overflow-hidden sm:rounded-md w-full">
        <ul className="divide-y divide-gray-200">
          <li>
            <div className=" dark:hover:bg-gray-800 hover:bg-gray-50 group px-4 py-4 sm:px-6 flex flex-col lg:flex-row lg:justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-lg md:text-xl font-bold text-primary-500">
                  {opportunity.name}
                </p>

                <div className="sm:flex items-start">
                  <div className="flex flex-col  text-gray-500 md:max-w-lg items-start text-justify">
                    <h4 className="text base font-semibold">Description:</h4>
                    <p className="text-sm">
                      {opportunity.description
                        ? opportunity.description
                        : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cent "}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <CalendarIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    {new Date(opportunity.endDate) > new Date()
                      ? "Closing on"
                      : " Closed on"}{" "}
                    {new Date(opportunity.endDate).toDateString()}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <FaBookmark
                    className="flex-shrink-0 mr-1.5 h-4 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    Bookmarked on{" "}
                    {new Date(opportunity.createdAt).toDateString()}{" "}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex flex-col gap-2">
                <div className="flex-shrink-0 flex items-center justify-end gap-2 ml-auto">
                  <div
                    className={`flex items-center justify-center ${
                      isExpired ? "hidden" : ""
                    }`}
                  >
                    <a
                      href={opportunity.applicationUrl}
                      className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-xs rounded-md text-white bg-primary-500 hover:bg-primary-600"
                    >
                      Apply now
                    </a>
                  </div>
                  <p className="inline-flex text-xs leading-5 font-semibold">
                    {!isExpired ? (
                      <></>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 rounded-full">
                        Expired
                      </span>
                    )}
                  </p>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleOpportunityDelete}
                      className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-xs rounded-md text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SavedOpportunityCard;
