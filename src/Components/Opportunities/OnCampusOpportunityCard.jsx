import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLens } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import { FaHourglassEnd, FaRupeeSign, FaClock } from "react-icons/fa";
import {
  bookmarkOnCampusOpportunity as bookmarkHelper,
  deleteOpportunity,
  removeBookmark as removeBookmarkHelper,
} from "../../Services/Operations/OnCampusApi";
import BookMarkSound from "../../assets/sounds/bookmark-sound.mp3";
import { useDispatch, useSelector } from "react-redux";
import { IoBookmarks } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import ApplyModal from "./ApplyModal";
import EnrolledStudentsModal from "./EnrolledStudentsModal";
import { useNavigate } from "react-router-dom";
import {
  setEditOpportunity,
  setOpportunity,
} from "../../Redux/Slices/OpportunitySlice";

const OnCampusOpportunityCard = (opportunity) => {
  const {
    isAlreadyBookMarked,
    isAlreadyApplied,
    bookmarkedOpportunities,
    setRefetchBookmarkOpp,
    isAdmin,
    setRefetchAppliedOpportunities,
  } = opportunity;
  const oppExpiryDate = new Date(opportunity.opportunityFillLastDate);
  const isExpired = oppExpiryDate < new Date();
  const audio = new Audio();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isStudentsEnrolledModelOpen, setIsStudentsEnrolledModelOpen] =
    useState(false);

  const driveDateAndTime = (() => {
    const dateStr = opportunity.opportunityDriveDate;
    const timeStr = opportunity.opportunityDriveTime;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date(dateStr);
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);

    return date;
  })();

  const [meetLinkMeta] = useState(() => {
    if (!opportunity.opportunityMode === "ON-LINE" || isExpired || isAdmin) {
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

  const deleteOpportunityHandler = async () => {
    const result = await deleteOpportunity({
      opportunity,
      token,
    });
    if (result) {
      audio.play();
    }
  };

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const currentTime = new Date();
      const difference = oppExpiryDate - currentTime;

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
  }, [oppExpiryDate]);

  return (
    <>
      <ApplyModal
        isOpen={isApplyModalOpen}
        setRefetchAppliedOpportunities={setRefetchAppliedOpportunities}
        opportunity={opportunity}
        opportunityId={opportunity._id}
        setIsOpen={setIsApplyModalOpen}
      />
      <EnrolledStudentsModal
        isOpen={isStudentsEnrolledModelOpen}
        opportunityId={opportunity._id}
        setIsOpen={setIsStudentsEnrolledModelOpen}
        token={token}
      />
      <div className="bg-white dark:bg-gray-900 overflow-hidden sm:rounded-md w-full shadow-lg">
        <ul className="">
          <li
            key={opportunity._id}
            className="border dark:border-gray-700 rounded-lg p-3"
          >
            <div className=" dark:hover:bg-gray-800 hover:bg-gray-50 group p-4 flex flex-col w-full gap-8 relative">
              {/* save icon absolute in position */}

              <div className="flex flex-col flex-1 gap-4">
                {/* title with role */}
                <div className="flex flex-col gap-1">
                  <div className="flex  flex-col-reverse items-start md:flex-row justify-between md:items-center gap-6 md:gap-5 w-full">
                    {" "}
                    <div className="text-lg md:max-w-[18rem] lg:max-w-none md:text-xl font-bold text-primary-500">
                      <p>{opportunity.opportunityName}</p>
                    </div>
                    <div className="gap-2 flex items-center justify-between">
                      <p className="inline-flex text-base leading-5 font-semibold absolute top-4 right-2">
                        {!isExpired ? (
                          <></>
                        ) : (
                          <span className="bg-red-100 dark:bg-red-800 dark:bg-opacity-70 dark:text-red-300 text-red-800 px-2 rounded-md">
                            Expired
                          </span>
                        )}
                      </p>
                      {isAdmin ? (
                        <></>
                      ) : (
                        <div className="flex items-center justify-center absolute top-4 right-2">
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
                            className={` items-center justify-center px-1 py-1 gap-2 text-xl font-medium dark:text-white ${
                              isExpired ? "hidden" : "inline-flex"
                            }`}
                          >
                            {isExpired ? null : (
                              <span className="text-sm   text-green-600 dark:text-green-500">
                                {timeLeft}
                              </span>
                            )}
                            {isAlreadyBookMarked ? (
                              <IoBookmarks />
                            ) : (
                              <IoBookmarksOutline />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="font-medium text-black dark:text-white text-sm  md:text-base">
                    {opportunity.opportunityRole}
                  </p>
                </div>

                {/* package + location + drive time */}
                <div className="flex flex-col items-start lg:flex-row lg:items-center gap-2 text-sm text-gray-500">
                  <div className="font-medium flex items-center gap-px">
                    <FaRupeeSign className="h-5 w-5 text-gray-400" />
                    <p>{opportunity.opportunityPackage}</p>
                  </div>
                  <span className="mr-1 hidden lg:flex">|</span>
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
                  <span className="mr-1 hidden lg:flex">
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
              <div className="flex flex-col flex-1 gap-2 ml-auto">
                <div className="flex-shrink-0 flex items-center md:justify-end">
                  <div
                    className={`flex items-center gap-3 justify-center ${
                      isExpired && !isAdmin ? "hidden" : ""
                    }`}
                  >
                    {isAdmin ? (
                      <button
                        onClick={() => {
                          console.log({ opportunity });
                          dispatch(setEditOpportunity(true));
                          dispatch(
                            setOpportunity({
                              ...opportunity,
                              setOnCampusOpportunities: null,
                              setRefetchBookmarkOpp: null,
                            })
                          );
                          navigate("/dashboard/opportunity-panel");
                        }}
                        className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-base font-medium  rounded-md text-white bg-primary-500 hover:bg-primary-700 cursor-pointer"
                      >
                        Edit
                      </button>
                    ) : null}

                    {isAdmin ? (
                      <button
                        onClick={() => {
                          setIsStudentsEnrolledModelOpen(() => true);
                        }}
                        className="inline-flex items-center justify-center px-1 py-1 cursor-pointer border border-black dark:border-transparent dark:bg-yellow-400 bg-black text-white dark:text-black text-sm sm:text-base font-medium rounded-md  dark:hover:border-yellow-400 hover:bg-transparent hover:text-black  dark:hover:text-yellow-400"
                      >
                        Enrolled Student
                      </button>
                    ) : null}
                    {isAdmin ? (
                      <button
                        onClick={() => {
                          deleteOpportunityHandler().catch((error) =>
                            console.error(error)
                          );
                        }}
                        className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-base font-medium  rounded-md text-white bg-red-500 hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsApplyModalOpen(() => true);
                        }}
                        disabled={isAlreadyApplied}
                        className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-base font-medium  rounded-md text-white bg-primary-500 hover:bg-primary-700 disabled:bg-primary-300 disabled:hover:bg-primary-300 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isAlreadyApplied ? "Applied" : "Apply now"}
                      </button>
                    )}
                  </div>

                  <div className="ml-3">
                    {meetLinkMeta.shouldBeVisible ? (
                      <div className="flex items-center justify-center">
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
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default OnCampusOpportunityCard;
