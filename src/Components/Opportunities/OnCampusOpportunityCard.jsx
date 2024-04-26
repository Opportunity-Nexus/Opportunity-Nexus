import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLens } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import { FaHourglassEnd, FaRupeeSign, FaClock } from "react-icons/fa";
import {
  bookmarkOnCampusOpportunity as bookmarkHelper,
  removeBookmark as removeBookmarkHelper,
} from "../../Services/Operations/OnCampusApi";
import BookMarkSound from "../../assets/sounds/bookmark-sound.mp3";
import { useSelector } from "react-redux";

import ApplyModal from "./ApplyModal";

const OnCampusOpportunityCard = (opportunity) => {
  const {
    isAlreadyBookMarked,
    bookmarkedOpportunities,
    setRefetchBookmarkOpp,
  } = opportunity;
  console.log({ opportunity, isAlreadyBookMarked });
  const isExpired = new Date(opportunity.opportunityFillLastDate) < new Date();
  const audio = new Audio();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  audio.src = BookMarkSound;
  const { token } = useSelector((state) => state.auth);

  const bookmarkOnCampusOpportunity = async () => {
    const result = await bookmarkHelper({ opportunity, token });
    if (result) {
      audio.play();
      setRefetchBookmarkOpp(() => true);
    }
  };

  const removeBookmark = async () => {
    const oppToBeRemoved = bookmarkedOpportunities.find(
      (item) => item.opportunityId._id === opportunity._id
    );
    console.log({ oppToBeRemoved });
    if (!oppToBeRemoved) return;
    const result = await removeBookmarkHelper({
      opportunityId: oppToBeRemoved._id,
      token,
    });
    if (result) {
      audio.play();
      setRefetchBookmarkOpp(() => true);
    }
  };

  return (
    <>
      <ApplyModal
        isOpen={isApplyModalOpen}
        opportunity={opportunity}
        setIsOpen={setIsApplyModalOpen}
      />
      <div className="bg-white dark:bg-gray-900 overflow-hidden sm:rounded-md w-full shadow-lg">
        <ul className="">
          <li
            key={opportunity._id}
            className="border dark:border-gray-700 rounded-lg p-3"
          >
            <div className=" dark:hover:bg-gray-800 hover:bg-gray-50 group p-4 flex flex-col w-full gap-8">
              <div className="flex flex-col flex-1 gap-4">
                {/* title with role */}
                <div className="flex flex-col gap-1">
                  <p className="text-lg md:text-xl font-bold text-primary-500">
                    {opportunity.opportunityName}
                  </p>
                  <p className="font-medium text-black dark:text-white text-sm  md:text-base">
                    {opportunity.opportunityRole}
                  </p>
                </div>

                {/* package + location + drive time */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="font-medium flex items-center gap-px">
                    <FaRupeeSign className="h-5 w-5 text-gray-400" />
                    <p>{opportunity.opportunityPackage}</p>
                  </div>
                  <span className="mr-1">|</span>
                  <div className="font-medium flex items-center gap-px">
                    {" "}
                    <IoMdPin
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      <span className="uppercase font-medium">
                        {opportunity.opportunityMode}
                      </span>
                    </p>
                  </div>
                  <span className="mr-1">
                    {opportunity.opportunityMode === "TBD (To Be Decided)" ? (
                      <></>
                    ) : (
                      <>|</>
                    )}
                  </span>
                  <div className="font-medium flex items-center gap-1">
                    {opportunity.opportunityMode === "TBD (To Be Decided)" ? (
                      <></>
                    ) : (
                      <div className="font-medium flex items-center gap-1">
                        <FaClock
                          className="h-5 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        {""}
                        <p className="font-medium">
                          Drive Time: {opportunity.opportunityDriveTime}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* drive date and application last date */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-start lg:items-center text-sm text-gray-500 font-medium gap-1">
                    <FaCalendarAlt
                      className="h-5 w-5  text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      {new Date(opportunity.opportunityDriveDate) > new Date()
                        ? "Drive Date"
                        : " Drive Ended"}{" "}
                      {new Date(
                        opportunity.opportunityDriveDate
                      ).toDateString()}
                    </p>
                  </div>
                  <span className="mr-1 hidden lg:flex">|</span>
                  <div className="flex items-start lg:items-center text-sm text-gray-500 font-medium gap-1">
                    <FaHourglassEnd
                      className="h-4 w-5  text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      {new Date(opportunity.opportunityFillLastDate) >
                      new Date()
                        ? "Fill Last Date is"
                        : "Application closed"}{" "}
                      {new Date(
                        opportunity.opportunityFillLastDate
                      ).toDateString()}
                    </p>
                  </div>
                </div>

                {/* Job location */}
                <div className="flex text-gray-500 gap-px max-w-4xl">
                  <ul className="flex text-gray-500 text-base font-semibold gap-2">
                    <h4>Job Location:</h4>
                    <p className=" uppercase">
                      {" "}
                      {opportunity.opportunityLocation}
                    </p>{" "}
                  </ul>
                </div>

                {/* description */}
                <div className="flex flex-col text-gray-500 gap-px max-w-4xl">
                  <h4 className="text base font-semibold">Description:</h4>
                  <p className="text-sm">
                    {opportunity.opportunityDescription
                      ? opportunity.opportunityDescription
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cent "}
                  </p>
                </div>

                {/* eligibility criteria */}
                <div className="flex text-gray-500 gap-px max-w-4xl">
                  <ul className="flex flex-col text-gray-500">
                    <h4 className="text base font-semibold">
                      Eligibility Criteria:
                    </h4>
                    {opportunity.eligibilityCriteria
                      ? opportunity.eligibilityCriteria.map((item, id) => (
                          <li className="flex items-start gap-px" key="index">
                            <MdLens
                              className="h-3 w-4 text-gray-400 mt-1"
                              aria-hidden="true"
                            />
                            <p className="text-sm">{item}</p>
                          </li>
                        ))
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cent "}
                  </ul>
                </div>

                {/* Extra Details */}
                {opportunity.opportunityExtraDetails ? (
                  <div className="flex flex-col text-gray-500 gap-px max-w-4xl">
                    <h4 className="text base font-semibold">Extra Details:</h4>
                    <p className="text-sm">
                      {opportunity.opportunityExtraDetails}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col flex-1   gap-2">
                <div className="flex-shrink-0 flex items-center md:justify-end gap-3">
                  <div
                    className={`flex items-center justify-center ${
                      isExpired ? "hidden" : ""
                    }`}
                  >
                    <button
                      onClick={() => {
                        setIsApplyModalOpen(() => true);
                      }}
                      className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-base font-medium  rounded-md text-white bg-primary-500 hover:bg-primary-700 cursor-pointer"
                    >
                      Apply now
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        if (isAlreadyBookMarked) {
                          removeBookmark().catch((error) =>
                            console.error(error)
                          );
                        } else {
                          bookmarkOnCampusOpportunity().catch((error) =>
                            console.error(error)
                          );
                        }
                      }}
                      className={` items-center justify-center px-1 py-1  border border-black dark:border-white text-base font-medium rounded-md hover:bg-black dark:hover:bg-white hover:text-white  dark:hover:text-black ${
                        isExpired ? "hidden" : "inline-flex"
                      } ${
                        isAlreadyBookMarked
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "text-black dark:text-white "
                      }

                      `}
                    >
                      {isAlreadyBookMarked ? "Unsave" : "Save"}
                    </button>
                  </div>
                  <div>
                    {opportunity.opportunityMode === "ON-LINE" &&
                    !isExpired &&
                    new Date(opportunity.opportunityDriveDate) ===
                      new Date() ? (
                      <div className="flex items-center justify-center">
                        <a href={opportunity.opportunityDriveLink}>
                          <button className="items-center justify-center px-1 py-1  border border-black dark:border-transparent dark:bg-yellow-400 bg-black text-white dark:text-black text-base font-medium rounded-md  dark:hover:border-yellow-400 hover:bg-transparent hover:text-black  dark:hover:text-yellow-400">
                            Join the Drive
                          </button>
                        </a>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="inline-flex text-base leading-5 font-semibold">
                    {!isExpired ? (
                      <></>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 rounded-md">
                        Expired
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OnCampusOpportunityCard;
