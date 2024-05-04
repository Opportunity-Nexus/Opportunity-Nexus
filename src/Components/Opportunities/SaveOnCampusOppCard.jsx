import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { FaHourglassEnd, FaRupeeSign, FaClock } from "react-icons/fa";
import BookMarkSound from "../../assets/sounds/bookmark-sound.mp3";
import { useSelector } from "react-redux";
import { removeBookmark as removeBookmarkHelper } from "../../Services/Operations/OnCampusApi";
import ApplyModal from "./ApplyModal";

const SavedOnCampusOpportunityCard = (opportunity) => {
  const {
    setSavedOpportunitiesList,
    isAlreadyApplied,
    setRefetchAppliedOpportunities,
  } = opportunity;

  const [isExpired, setIsExpired] = useState(() => {
    return (
      new Date(opportunity.opportunityId.opportunityFillLastDate) < new Date()
    );
  });

  useEffect(() => {
    setIsExpired(
      () =>
        new Date(opportunity.opportunityId.opportunityFillLastDate) < new Date()
    );
  }, [opportunity.opportunityId.opportunityFillLastDate]);

  const driveDateAndTime = (() => {
    const dateStr = opportunity.opportunityId.opportunityDriveDate;
    const timeStr = opportunity.opportunityId.opportunityDriveTime;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date(dateStr);
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);

    return date;
  })();

  const [meetLinkMeta] = useState(() => {
    if (!opportunity.opportunityId.opportunityMode === "ON-LINE" || isExpired) {
      return {
        shouldBeVisible: false,
        shouldBeEnabled: false,
      };
    }

    if (isAlreadyApplied) {
      const currentTime = new Date();
      let differenceInMinutes = Math.floor(
        (driveDateAndTime - currentTime) / (1000 * 60)
      );
      if (differenceInMinutes <= 5 && differenceInMinutes > 0) {
        return {
          shouldBeVisible: true,
          shouldBeEnabled: true,
        };
      } else {
        return {
          shouldBeVisible: true,
          shouldBeEnabled: false,
        };
      }
    } else {
      return {
        shouldBeVisible: false,
        shouldBeEnabled: false,
      };
    }
  });

  const audio = new Audio();
  audio.src = BookMarkSound;
  const { token } = useSelector((state) => state.auth);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const removeBookmark = async () => {
    const result = await removeBookmarkHelper({
      opportunityId: opportunity._id,
      token,
    });
    if (result) {
      audio.play();
      setSavedOpportunitiesList((data) =>
        data.filter((item) => item._id !== opportunity._id)
      );
    }
  };

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!opportunity.opportunityId) return;

    const updateCountdown = () => {
      const currentTime = new Date();
      const difference =
        new Date(opportunity.opportunityId.opportunityFillLastDate) -
        currentTime;

      // Stop the countdown when the target date is reached
      if (difference <= 0) {
        setTimeLeft("Time's up!");
        clearInterval(intervalId);
        return;
      }

      // Calculate time difference
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      let timeString = "";

      if (days) timeString = timeString + `${days}d `;
      if (hours) timeString = timeString + `${hours}h `;
      if (minutes) timeString = timeString + `${minutes}m `;
      if (seconds) timeString = timeString + `${seconds}s `;

      setTimeLeft(timeString);
    };

    // Set up the interval to update the countdown
    const intervalId = setInterval(updateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [opportunity.opportunityId]);

  return (
    <>
      <ApplyModal
        isOpen={isApplyModalOpen}
        opportunity={opportunity}
        setIsOpen={setIsApplyModalOpen}
        setRefetchAppliedOpportunities={setRefetchAppliedOpportunities}
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
                {/* Job location */}
                <div className="flex font-medium text-black dark:text-white text-sm  md:text-base gap-px max-w-4xl">
                  <ul className="flex gap-2">
                    <h4>Job Location:</h4>
                    <p className=" uppercase">
                      {" "}
                      {opportunity.opportunityId.opportunityLocation}
                    </p>{" "}
                  </ul>
                </div>
                {/* locatoin + time */}{" "}
                <div className="flex text-sm text-gray-500 sm:mt-0 gap-2">
                  <div className="flex items-center gap-px">
                    {" "}
                    <IoMdPin
                      className="flex-shrink-0 h-4 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      <span className="uppercase font-medium">
                        {opportunity.opportunityId.opportunityMode}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center gap-px">
                      <span className="mr-1">|</span>
                      <FaClock
                        className="h-5 w-4 text-gray-400 mr-px"
                        aria-hidden="true"
                      />
                      {""}
                      <p className="font-medium">
                        Drive Time:{" "}
                        {opportunity.opportunityId.opportunityDriveTime}
                      </p>
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
              </div>

              <div className="mt-2 flex  flex-row lg:flex-col flex-1 gap-2 items-end  justify-between lg:items-start lg:justify-start">
                <div className="flex flex-col lg:ml-auto">
                  {" "}
                  {isExpired ? null : (
                    <span className="text-sm pl-1 lg:ml-auto text-green-600 dark:text-green-500">
                      {timeLeft}
                    </span>
                  )}
                  <div className="flex sm:hidden justify-center items-center gap-2">
                    {" "}
                    <div
                      className={`flex items-center gap-2 justify-center ${
                        isExpired ? "hidden" : ""
                      }`}
                    >
                      <button
                        onClick={() => {
                          setIsApplyModalOpen(() => true);
                        }}
                        disabled={isAlreadyApplied}
                        className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-xs rounded-md text-white bg-primary-500 hover:bg-primary-700 disabled:bg-primary-300 disabled:hover:bg-primary-300 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isAlreadyApplied ? "Applied" : "Apply now"}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          removeBookmark().catch((error) =>
                            console.error(error)
                          );
                        }}
                        className="inline-flex items-center justify-center px-1 py-1 bg-red-600 text-xs font-medium rounded-md text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/*  Expire + apply + remove button + join drive */}
                <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 ml-auto">
                  <p className="inline-flex text-xs leading-5 font-semibold">
                    {!isExpired ? (
                      <></>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 rounded-full">
                        Expired
                      </span>
                    )}
                  </p>
                  <div className="hidden sm:flex justify-center items-center gap-2">
                    {" "}
                    <div
                      className={`flex items-center gap-2 justify-center ${
                        isExpired ? "hidden" : ""
                      }`}
                    >
                      <button
                        onClick={() => {
                          setIsApplyModalOpen(() => true);
                        }}
                        disabled={isAlreadyApplied}
                        className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-xs rounded-md text-white bg-primary-500 hover:bg-primary-700 disabled:bg-primary-300 disabled:hover:bg-primary-300 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isAlreadyApplied ? "Applied" : "Apply now"}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          removeBookmark().catch((error) =>
                            console.error(error)
                          );
                        }}
                        className="inline-flex items-center justify-center px-1 py-1 bg-red-600 text-xs font-medium rounded-md text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* join drive button */}
                  {meetLinkMeta.shouldBeVisible ? (
                    <div className="flex items-center">
                      <a
                        href={opportunity.opportunityDriveLink}
                        className={
                          meetLinkMeta.shouldBeEnabled
                            ? ""
                            : "pointer-events-none"
                        }
                      >
                        <button
                          className="items-center justify-center px-1 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:hover:text-white  border border-black dark:border-transparent dark:bg-yellow-400 bg-black text-white dark:text-black text-base font-medium rounded-md  dark:hover:border-yellow-400 hover:bg-transparent hover:text-black  dark:hover:text-yellow-400"
                          disabled={!meetLinkMeta.shouldBeEnabled}
                        >
                          Join the Drive
                        </button>
                      </a>
                    </div>
                  ) : null}
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
