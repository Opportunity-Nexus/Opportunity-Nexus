import React, { useEffect, useState } from "react";
import SavedOpportunityCard from "../../Components/Opportunities/SavedOpportunityCard";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import { useSelector } from "react-redux";
import { getSavedOpportunities } from "../../Services/Operations/MyOpportunity";

const BookmarkedOpportunities = () => {
  const opportunityTypeArr = [
    "All",
    "Scholarships",
    "ITJobs",
    "CodingContests",
  ];

  const [opportunityType, setOpportunityType] = useState(["All"]);

  /**
   * @type {string} - off-campus | on-campus
   */
  const [campusType, setCampusType] = useState("off-campus");
  const [savedOpportunitiesList, setSavedOpportunitiesList] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getSavedOpportunities({ token: token })
      .then((data) => {
        console.log({ data });
        setSavedOpportunitiesList(() => {
          return data;
        });
      })
      .catch((error) => console.error(error));
  }, [token, opportunityType]);

  //----------------------PAGINTAION----------------------//

  useEffect(() => {
    if (savedOpportunitiesList) {
      const filtered = savedOpportunitiesList.filter(
        (item) =>
          (opportunityType.includes("All") ||
            opportunityType.includes(item.opportunityType)) &&
          (campusType === "off-campus" || campusType === item.campusType)
      );
      setFilteredOpportunities(filtered);
      setCurrentPage(1); // Reset to first page on filter change
    }
  }, [savedOpportunitiesList, opportunityType, campusType]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalOpportunitiesPages = Math.ceil(
    filteredOpportunities.length / itemsPerPage
  );
  const currentOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("total opp pages are", totalOpportunitiesPages);
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
        <select
          name="Campus Type"
          id="Campus-type-selector"
          defaultValue="off-campus"
          className="w-fit border-gray-500 text-sm md:text-base dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 font-medium rounded-md "
          onChange={(e) => {
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
          {filteredOpportunities.length === 0 ? (
            <div className="flex flex-col justify-center items-center lg:w-2/4 flex-1 dark:text-white mx-auto self-center">
              <img src={OpportunitiesNotFoundImg} alt="OppNotFound" />
              <h2 className="text-2xl sm:text-3xl font-bold animate-bounce text-center ">
                You have not saved any opportunities yet!
              </h2>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center mt-4 mb-7 flex-1">
                {currentOpportunities
                  .filter((item) =>
                    opportunityType.includes("All")
                      ? !!item
                      : opportunityType.includes(item.opportunityType)
                  )
                  .filter(() => campusType === "off-campus")
                  .map((opportunity, index) => (
                    <SavedOpportunityCard
                      key={index}
                      {...opportunity}
                      setSavedOpportunitiesList={setSavedOpportunitiesList}
                    />
                  ))}
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
                  <div className="flex items-center justify-center">
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
