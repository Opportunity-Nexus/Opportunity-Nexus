import React, { useEffect, useState } from "react";
import SavedOpportunityCard from "../../Components/Opportunities/SavedOpportunityCard";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import { useSelector } from "react-redux";
import { getOffCampusBookmarkedOpportunities } from "../../Services/Operations/MyOpportunity";
import { getOnCampusBookmarkedOpportunities } from "../../Services/Operations/OnCampusApi";
import SavedOnCampusOpportunityCard from "../../Components/Opportunities/SaveOnCampusOppCard";

const BookmarkedOpportunities = () => {
  const opportunityTypeArr = [
    "All",
    "Scholarships",
    "ITJobs",
    "CodingContests",
  ];

  const [opportunityType, setOpportunityType] = useState(["All"]);
  const [oncampusFilter, setOncampusFilter] = useState(["ALL"]);

  /**
   * @type {string} - off-campus | on-campus
   */
  const [campusType, setCampusType] = useState("on-campus");
  const [savedOpportunitiesList, setSavedOpportunitiesList] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const { token } = useSelector((state) => state.auth);

  console.log({ tryToken: token });

  useEffect(() => {
    if (campusType === "off-campus") {
      getOffCampusBookmarkedOpportunities({ token: token })
        .then((data) => {
          setSavedOpportunitiesList(() => {
            return data;
          });
        })
        .catch((error) => console.error(error));
    } else {
      // fetch all on-campus bookmarked opportunities
      getOnCampusBookmarkedOpportunities({ token: token })
        .then((data) => {
          setSavedOpportunitiesList(() => {
            return data;
          });
        })
        .catch((error) => console.error(error));
    }
  }, [token, campusType]);

  //----------------------PAGINTAION----------------------//

  useEffect(() => {
    console.log({ campusType, savedOpportunitiesList });
    if (savedOpportunitiesList) {
      if (campusType === "off-campus") {
        const filtered = savedOpportunitiesList.filter(
          (item) =>
            (opportunityType.includes("All") ||
              opportunityType.includes(item.opportunityType)) &&
            (opportunityType.includes("All") ||
              opportunityType.includes(item.opportunityType))
        );
        setFilteredOpportunities(() => filtered);
      } else {
        console.log("else block");
        setFilteredOpportunities(() => savedOpportunitiesList);
      }
      setCurrentPage(1); // Reset to first page on filter change
    }
  }, [savedOpportunitiesList, opportunityType, campusType]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalOpportunitiesPages = Math.ceil(
    filteredOpportunities.length / itemsPerPage
  );
  const currentOpportunities = filteredOpportunities.slice(
    currentPage * itemsPerPage - itemsPerPage,
    currentPage * itemsPerPage
  );
  const pageNumbers = Array.from(
    { length: totalOpportunitiesPages },
    (_, i) => i + 1
  );

  return (
    <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center py-12">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center dark:text-white ">
          OpportunityNexus:{" "}
          <span className="block lg:inline-flex">Save Spot</span>
          <span className="block text-primary-500">
            Apply Now! Something you've chosen{" "}
          </span>
        </h1>
      </div>
      <div className="w-full flex items-center justify-between sm:px-6">
        {campusType === "off-campus" ? (
          <div className="justify-between items-center gap-3 hidden lg:flex">
            {opportunityTypeArr.map((item, id) => {
              return (
                <button
                  key={id}
                  className={`px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-500 dark:border-gray-700 rounded-2xl text-base md:text-lg font-medium text-gray-500 cursor-pointer ${
                    opportunityType.includes(item)
                      ? "bg-gray-200 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => {
                    setOpportunityType((data) => {
                      if (data.includes("All")) {
                        if (item !== "All") {
                          return [item];
                        } else {
                          return data;
                        }
                      } else {
                        console.log("I am called");
                        if (data.includes(item)) {
                          return data.filter((i) => i === item);
                        } else {
                          return [item];
                        }
                      }
                    });
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="justify-between items-center gap-3 hidden lg:flex">
            {["ALL", "ACTIVE"].map((item, id) => {
              return (
                <button
                  key={id}
                  className={`px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-500 dark:border-gray-700 rounded-2xl text-base md:text-lg font-medium text-gray-500 cursor-pointer ${
                    opportunityType.includes(item)
                      ? "bg-gray-200 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => {
                    oncampusFilter((data) => {
                      if (data.includes("All")) {
                        if (item !== "All") {
                          return [item];
                        } else {
                          return data;
                        }
                      } else {
                        console.log("I am called");
                        if (data.includes(item)) {
                          return data.filter((i) => i === item);
                        } else {
                          return [item];
                        }
                      }
                    });
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}

        {campusType === "on-campus" ? (
          <select
            name="Opportunity Type"
            id="opportunity-type-selector"
            defaultValue="scholarships"
            className="w-fit border-gray-500 text-sm md:text-base dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 font-medium rounded-md lg:hidden "
            onChange={(e) => {
              setCampusType((data) => {
                const value = e.target.value;
                if (!value) return;
                return [value];
              });
            }}
          >
            {["all", "active"].map((item) => {
              return (
                <option
                  value={item}
                  key={item}
                  className="uppercase gap-1 flex text-sm"
                >
                  {item}
                </option>
              );
            })}
          </select>
        ) : (
          <select
            name="Opportunity Type"
            id="opportunity-type-selector"
            defaultValue="scholarships"
            className="w-fit border-gray-500 text-sm md:text-base dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 font-medium rounded-md lg:hidden "
            onChange={(e) => {
              setOpportunityType((data) => {
                const value = e.target.value;
                if (!value) return;
                return [value];
              });
            }}
          >
            {opportunityTypeArr.map((item) => {
              return (
                <option
                  value={item}
                  key={item}
                  className="uppercase gap-1 flex text-sm"
                >
                  {item}
                </option>
              );
            })}
          </select>
        )}

        <select
          name="Campus Type"
          id="Campus-type-selector"
          value={campusType}
          className="w-fit border-gray-500 text-sm md:text-base dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 font-medium rounded-md "
          onChange={(e) => {
            setSavedOpportunitiesList(() => []);
            setFilteredOpportunities(() => []);
            setCampusType(() => e.target.value);
          }}
        >
          {["off-campus", "on-campus"].map((item) => {
            return (
              <option
                value={item}
                key={item}
                className="uppercase gap-1 flex text-sm"
              >
                {item}
              </option>
            );
          })}
        </select>
      </div>

      {currentOpportunities ? (
        <>
          {currentOpportunities.length === 0 ? (
            <div className="flex flex-col justify-center items-center lg:w-2/4 flex-1 dark:text-white mx-auto self-center">
              <img src={OpportunitiesNotFoundImg} alt="OppNotFound" />
              <h2 className="text-2xl sm:text-3xl font-bold animate-bounce text-center ">
                You have not saved any opportunities yet!
              </h2>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center mt-4 mb-7 divide-y dark:divide-gray-700">
                {campusType === "off-campus" ? (
                  <>
                    {currentOpportunities
                      .filter((item) =>
                        opportunityType.includes("All")
                          ? !!item
                          : opportunityType.includes(item.opportunityType)
                      )
                      .map((opportunity, index) => {
                        return (
                          <SavedOpportunityCard
                            key={index}
                            {...opportunity}
                            setSavedOpportunitiesList={
                              setSavedOpportunitiesList
                            }
                          />
                        );
                      })}
                  </>
                ) : (
                  <>
                    {currentOpportunities
                      .filter((item) =>
                        opportunityType.includes("All")
                          ? !!item
                          : opportunityType.includes(item.opportunityType)
                      )
                      .map((opportunity, index) => {
                        return (
                          <SavedOnCampusOpportunityCard
                            key={index}
                            {...opportunity}
                            setSavedOpportunitiesList={
                              setSavedOpportunitiesList
                            }
                          />
                        );
                      })}
                  </>
                )}
              </div>

              {/* ------------PAGINATION----------- */}

              {pageNumbers.length > 1 && (
                <div className="flex items-center justify-center w-2/4 mt-8 mx-auto">
                  <button
                    className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
                      currentPage <= 1
                        ? "cursor-not-allowed text-gray-400 "
                        : "cursor-pointer"
                    }`}
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    <TbPlayerTrackPrevFilled className="h-5 w-5 mr-2" />
                    <span className="uppercase font-medium">previous</span>
                  </button>
                  <div className="hidden md:flex items-center justify-center">
                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`border rounded-full px-4 py-2 ml-3 mr-3 dark:text-white focus:ring-2 ${
                          currentPage === pageNumber
                            ? "bg-primary-500 text-white"
                            : ""
                        }`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                  <button
                    className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
                      currentPage >= totalOpportunitiesPages
                        ? "cursor-not-allowed text-gray-400"
                        : "cursor-pointer"
                    }`}
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={currentPage >= totalOpportunitiesPages}
                  >
                    <span className="uppercase ml-3 font-medium">next</span>
                    <TbPlayerTrackNextFilled className="h-5 w-5 ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="h-screen flex flex-1 items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default BookmarkedOpportunities;
