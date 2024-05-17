import React, { useEffect, useState } from "react";
import SavedOpportunityCard from "../../Components/Opportunities/SavedOpportunityCard";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import { useSelector } from "react-redux";
import { getOffCampusBookmarkedOpportunities } from "../../Services/Operations/MyOpportunity";
import {
  getOnCampusBookmarkedOpportunities,
  getUserOpportunities,
} from "../../Services/Operations/OnCampusApi";
import SavedOnCampusOpportunityCard from "../../Components/Opportunities/SaveOnCampusOppCard";

const BookmarkedOpportunities = () => {
  const opportunityTypeArr = [
    "All",
    "Scholarships",
    "ITJobs",
    "CodingContests",
  ];

  const [isFetching, setIsFetching] = useState(false);

  const onCampusOppFilters = ["All", "Active", "Applied"];

  // for off-campus
  const [opportunityType, setOpportunityType] = useState(["All"]);

  // type of this is 'All' | 'Active', for on campus
  const [onCampusFilter, setOnCampusFilter] = useState("All");

  const [onCampusOpportunityTag, setOnCampusOpportunityTag] = useState({
    availableTags: [],
    selectedTags: [],
  });

  /**
   * @type {string} - off-campus | on-campus
   */
  const [campusType, setCampusType] = useState("on-campus");
  const [savedOpportunitiesList, setSavedOpportunitiesList] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState(null);
  const { token } = useSelector((state) => state.auth);

  console.log({ tryToken: token });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [totalOpportunitiesPages, setTotalOpportunitiesPages] = useState(
    Math.max(Math.ceil(filteredOpportunities?.length / itemsPerPage), 0)
  );

  useEffect(() => {
    if (!filteredOpportunities) return;
    setTotalOpportunitiesPages(() => {
      if (campusType === "off-campus") {
        return filteredOpportunities.length;
      } else {
        const lengthOfOpportunities = filteredOpportunities?.filter((item) =>
          campusType === "on-campus" &&
          onCampusOpportunityTag.selectedTags.length === 0
            ? true
            : item.opportunityId?.opportunityTags.filter((element) =>
                onCampusOpportunityTag.selectedTags.includes(element)
              ).length > 0
        ).length;

        return Math.ceil(lengthOfOpportunities / 6);
      }
    });
  }, [campusType, filteredOpportunities, onCampusOpportunityTag.selectedTags]);

  useEffect(() => {
    setIsFetching(() => true);
    if (campusType === "off-campus") {
      getOffCampusBookmarkedOpportunities({ token: token })
        .then((data) => {
          setSavedOpportunitiesList(() => {
            return data || [];
          });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsFetching(() => false);
        });
    } else {
      // fetch all on-campus bookmarked opportunities
      getOnCampusBookmarkedOpportunities({ token: token })
        .then((data) => {
          setSavedOpportunitiesList(() => {
            return data || [];
          });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsFetching(() => false);
        });
    }
  }, [token, campusType]);

  const [refetchAppliedOpportunities, setRefetchAppliedOpportunities] =
    useState(true);
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);
  useEffect(() => {
    if (!refetchAppliedOpportunities) return;
    getUserOpportunities({ token: token })
      .then((data) => {
        setAppliedOpportunities(() => {
          return data || [];
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setRefetchAppliedOpportunities(false));
  }, [refetchAppliedOpportunities, token]);

  //----------------------PAGINTAION----------------------//

  useEffect(() => {
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
        setFilteredOpportunities(() => savedOpportunitiesList);
      }
      setCurrentPage(1); // Reset to first page on filter change
    }
  }, [
    savedOpportunitiesList,
    opportunityType,
    campusType,
    filteredOpportunities,
  ]);

  useEffect(() => {
    if (!filteredOpportunities || !filteredOpportunities.length) return;

    const tagSet = new Set();
    filteredOpportunities.forEach((opp) => {
      (
        (campusType === "on-campus" && opp.opportunityId?.opportunityTags) ||
        []
      ).forEach((item) => tagSet.add(item));
    });

    setOnCampusOpportunityTag(() => ({
      availableTags: Array.from(tagSet),
      selectedTags: [],
    }));
  }, [campusType, currentPage, filteredOpportunities]);

  return (
    <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center py-12">
        <h1 className="font-bold text-base sm:text-3xl md:text-2xl lg:text-4xl text-center dark:text-white ">
          OpportunityNexus: Save Spot
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
                    setCurrentPage(() => 1);
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="justify-between items-start gap-3 hidden lg:flex flex-col">
            <div className="justify-between items-start gap-3 flex">
              {onCampusOppFilters.map((item, id) => {
                return (
                  <button
                    key={id}
                    className={`px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-500 dark:border-gray-700 rounded-2xl text-base md:text-lg font-medium text-gray-500 cursor-pointer ${
                      onCampusFilter.toLowerCase() === item.toLowerCase()
                        ? "bg-gray-200 dark:bg-gray-800"
                        : ""
                    }`}
                    onClick={(e) => {
                      setOnCampusFilter(() => item);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {campusType === "on-campus" &&
            onCampusOpportunityTag.availableTags.length !== 0 ? (
              <div className="flex gap-1 flex-wrap">
                <span className="text-black font-bold text-lg dark:text-white">
                  Search easily with these Keywords
                </span>
                {onCampusOpportunityTag.availableTags.map((item, itemIndex) => {
                  return (
                    <button
                      key={itemIndex}
                      className={`px-1 py-.5 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-500 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 cursor-pointer ${
                        onCampusOpportunityTag.selectedTags.includes(item)
                          ? "bg-gray-200 dark:bg-gray-800"
                          : ""
                      }`}
                      onClick={() => {
                        setOnCampusOpportunityTag((data) => {
                          if (data.selectedTags.includes(item)) {
                            return {
                              ...data,
                              selectedTags: data.selectedTags.filter(
                                (i) => i !== item
                              ),
                            };
                          } else {
                            return {
                              ...data,
                              selectedTags: [...data.selectedTags, item],
                            };
                          }
                        });
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}

        {campusType === "on-campus" ? (
          <select
            name="Opportunity Type"
            id="opportunity-type-selector"
            defaultValue="scholarships"
            className="w-fit border-gray-500 text-sm md:text-base dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 font-medium rounded-md lg:hidden "
            onChange={(e) => {
              setOnCampusFilter(() => e.target.value);
            }}
          >
            {onCampusOppFilters.map((item) => {
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

      {filteredOpportunities ? (
        <>
          {isFetching ? (
            <div className="h-screen flex flex-1 items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : filteredOpportunities.length === 0 ? (
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
                    {filteredOpportunities
                      .filter((item) =>
                        opportunityType.includes("All")
                          ? !!item
                          : opportunityType.includes(item.opportunityType)
                      )
                      .slice(
                        currentPage * itemsPerPage - itemsPerPage,
                        currentPage * itemsPerPage
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
                    {filteredOpportunities
                      .filter((item) =>
                        onCampusFilter.toLowerCase() === "all"
                          ? !!item
                          : onCampusFilter.toLowerCase() === "active"
                          ? new Date(
                              item.opportunityId?.opportunityFillLastDate
                            ) > new Date()
                          : // applied filter
                            appliedOpportunities.some(
                              (appOp) => appOp._id === item.opportunityId?._id
                            )
                      )
                      .filter((item) =>
                        campusType === "on-campus" &&
                        onCampusOpportunityTag.selectedTags.length === 0
                          ? true
                          : item.opportunityId?.opportunityTags.filter(
                              (element) =>
                                onCampusOpportunityTag.selectedTags.includes(
                                  element
                                )
                            ).length > 0
                      )
                      .slice(
                        currentPage * itemsPerPage - itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((opportunity, index) => {
                        console.log({ bookmarkedArryOp: opportunity });
                        if (!opportunity.opportunityId) return null;
                        return (
                          <SavedOnCampusOpportunityCard
                            key={index}
                            {...opportunity}
                            setSavedOpportunitiesList={
                              setSavedOpportunitiesList
                            }
                            isAlreadyApplied={
                              appliedOpportunities.findIndex((item) => {
                                return (
                                  item._id === opportunity.opportunityId._id
                                );
                              }) > -1
                            }
                            setRefetchAppliedOpportunities={
                              setRefetchAppliedOpportunities
                            }
                          />
                        );
                      })}
                  </>
                )}
              </div>

              {/* ------------PAGINATION----------- */}

              {totalOpportunitiesPages > 1 && (
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
                    {Array(totalOpportunitiesPages)
                      .fill(null)
                      .map((_, index) => (
                        <button
                          key={index + 1}
                          className={`border rounded-full px-4 py-2 ml-3 mr-3 dark:text-white focus:ring-2 ${
                            currentPage === index + 1
                              ? "bg-primary-500 text-white"
                              : ""
                          }`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
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
