import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import {
  FaHourglassEnd,
  FaRupeeSign,
  FaExclamationTriangle,
  FaClock,
} from "react-icons/fa";
import BookMarkSound from "../../assets/sounds/bookmark-sound.mp3";
import { useSelector } from "react-redux";
import { removeBookmark as removeBookmarkHelper } from "../../Services/Operations/OnCampusApi";
import ApplyModal from "./ApplyModal";

const SavedOnCampusOpportunityCard = (
  opportunity,
  setSavedOpportunitiesList
) => {
  console.log({ opportunity });
  const isExpired =
    new Date(opportunity.opportunityId.opportunityFillLastDate) < new Date();
  const audio = new Audio();
  audio.src = BookMarkSound;
  const { token } = useSelector((state) => state.auth);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const removeBookmark = async () => {
    const result = await removeBookmarkHelper({ opportunity, token });
    if (result) {
      audio.play();
      setSavedOpportunitiesList((data) =>
        data.filter((item) => item !== opportunity)
      );
    }
  };
  return (
    <>
      <ApplyModal
        isOpen={isApplyModalOpen}
        opportunity={opportunity}
        setIsOpen={setIsApplyModalOpen}
      />
      <div className="bg-white dark:bg-gray-900 overflow-hidden sm:rounded-md w-full">
        <ul className="divide-y divide-gray-200">
          <li key={opportunity.opportunityId}>
            <div className=" dark:hover:bg-gray-800 hover:bg-gray-50 group px-4 py-4 sm:px-6 flex flex-col lg:flex-row lg:justify-between w-full gap-6">
              <div className="flex flex-col flex-1 gap-2">
                {/* title + role + package */}
                <div className="flex flex-col gap-1">
                  <p className="text-lg md:text-xl font-bold text-primary-500">
                    {opportunity.opportunityId.opportunityName}
                  </p>
                  <div className="flex items-center font-medium text-black dark:text-white text-sm  md:text-base gap-2">
                    <p>{opportunity.opportunityId.opportunityRole}</p>
                    <span>|</span>
                    <div className="flex items-center gap-px">
                      <FaRupeeSign className="h-4 w-4" />
                      <p>{opportunity.opportunityId.opportunityPackage}</p>
                    </div>
                  </div>
                </div>

                {/* drive date */}
                <div className="flex items-center text-sm text-gray-500 sm:mt-0 gap-px">
                  <FaCalendarAlt
                    className="flex-shrink-0  h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    {new Date(opportunity.opportunityId.opportunityDriveDate) >
                    new Date()
                      ? "Drive Date"
                      : " Drive Ends"}{" "}
                    {new Date(
                      opportunity.opportunityId.opportunityDriveDate
                    ).toDateString()}
                  </p>
                </div>

                {/* application fill deadline */}
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 gap-px">
                  <FaHourglassEnd
                    className="flex-shrink-0  h-4 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    {new Date(
                      opportunity.opportunityId.opportunityFillLastDate
                    ) > new Date()
                      ? "Fill Last Date is"
                      : "Application closed"}{" "}
                    {new Date(
                      opportunity.opportunityId.opportunityFillLastDate
                    ).toDateString()}
                  </p>
                </div>
                {/* <div className="sm:flex items-start">
                  <ul className="flex flex-col text-sm text-gray-500 md:max-w-lg items-start text-justify">
                    <FaExclamationTriangle
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-300 text-start hidden lg:flex"
                      aria-hidden="true"
                    />
                    {opportunity.opportunityId.eligibilityCriteria
                      ? opportunity.opportunityId.eligibilityCriteria.map(
                          (item, id) => <li className="">{item}</li>
                        )
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cent "}
                  </ul>
                </div> */}
              </div>
              <div className="mt-2 sm:flex flex-col flex-1 lg:mr-auto lg:items-end gap-2">
                <div className="mt-2 sm:flex flex-col flex-1 gap-2 items-start">
                  {/* active OR Expire */}
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center ${
                        isExpired ? "hidden" : ""
                      }`}
                    >
                      <div
                        onClick={() => {
                          setIsApplyModalOpen(() => true);
                        }}
                        className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-xs rounded-md text-white bg-primary-500 hover:bg-primary-600 cursor-pointer"
                      >
                        Apply now
                      </div>
                    </div>
                    <p className="inline-flex text-xs leading-5 font-semibold">
                      {!isExpired ? (
                        <span className="bg-green-100 text-green-800 px-2 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 rounded-full">
                          Expired
                        </span>
                      )}
                    </p>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          removeBookmark().catch((error) =>
                            console.error(error)
                          );
                        }}
                        className="inline-flex items-center justify-center px-1 py-1  border bg-red-600 text-xs font-medium rounded-md text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* drive date */}
                  {/* <div className="flex items-center text-sm text-gray-500 sm:mt-0 gap-px">
                    <FaCalendarAlt
                      className="flex-shrink-0  h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      {new Date(
                        opportunity.opportunityId.opportunityDriveDate
                      ) > new Date()
                        ? "Drive Date"
                        : " Drive Ends"}{" "}
                      {new Date(
                        opportunity.opportunityId.opportunityDriveDate
                      ).toDateString()}
                    </p>
                  </div> */}

                  {/* locatoin + time */}
                  <div className="flex items-center gap-2">
                    {" "}
                    <div className="flex items-center text-sm text-gray-500 sm:mt-0 gap-2">
                      <div className="flex items-center gap-px">
                        {" "}
                        <IoMdPin
                          className="flex-shrink-0 h-4 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          {opportunity.opportunityId.opportunityMode ===
                            "OFF-LINE" ||
                          opportunity.opportunityId.opportunityMode ===
                            "Offline" ? (
                            <span className="uppercase font-medium">
                              {opportunity.opportunityId.opportunityLocation}
                            </span>
                          ) : (
                            <span className="uppercase font-medium">
                              {opportunity.opportunityId.opportunityMode}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center">
                        {opportunity.opportunityId.opportunityMode ===
                        "TBD (To Be Decided)" ? (
                          <></>
                        ) : (
                          <div className="flex items-center gap-px">
                            <span className="mr-1">|</span>
                            <FaClock
                              className="flex-shrink-0 h-4 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <p className="uppercase font-medium">
                              {opportunity.opportunityId.opportunityDriveTime}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* application fill deadline */}
                  {/* <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 gap-px">
                    <FaHourglassEnd
                      className="flex-shrink-0  h-4 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      {new Date(
                        opportunity.opportunityId.opportunityFillLastDate
                      ) > new Date()
                        ? "Fill Last Date is"
                        : "Application closed"}{" "}
                      {new Date(
                        opportunity.opportunityId.opportunityFillLastDate
                      ).toDateString()}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SavedOnCampusOpportunityCard;
