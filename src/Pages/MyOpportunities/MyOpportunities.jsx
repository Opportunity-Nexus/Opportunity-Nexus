import React, { useEffect, useState } from "react";
import SavedOpportunityCard from "../../Components/Opportunities/SavedOpportunityCard";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import { offCampusEndpoints } from "../../Services/BackendApis";
import { useSelector } from "react-redux";

const MyOpportunities = () => {
  /**
   * @type {string} - offCampus | onCampus
   */
  const [opportunityType, setOpportunityType] = useState("offCampus");
  const [savedOpportunitiesList, setSavedOpportunitiesList] = useState([]);
  const {token} = useSelector((state)=>state.auth);

  //----------------------PAGINTAION----------------------//

  // ! should be sent to backend to determine the number of results we need in a page
  const pageSize = 10;

  /**
   * this pagination meta is meant to be returned from backend call on every request
   * @typedef PaginationMeta
   * @property {number} currentPage
   * @property {number} totalResults
   * @property {boolean} hasNextPage
   */
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    totalResults: null,
    hasNextPage: false,
  });

  const totalPages = paginationMeta.totalResults
    ? paginationMeta.totalResults / pageSize
    : 1;

    useEffect(() => {
      async function getSavedOpportunities() {
    
        if (token) {
          try {
            const response = await fetch(offCampusEndpoints.GET_ALL_BOOKMARK_OPPORTUNITY, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
    
            const data = await response.json();
            if (response.ok) {
              console.log('Success:', data);
              setSavedOpportunitiesList(() => {return data.data});
    
              // setPaginationMeta(data.pagination);
            } 
            
            else {
              // If we get an HTTP error response
              console.error('Fetch error:', data.message);
              // Potentially show a toast notification with the error
            }
          } catch (error) {
            console.error('Request failed:', error);
            // Handle network errors or other unexpected errors
          }
        } 
        
        else {
          console.error('Token is undefined or not found');
          // Potentially handle the lack of a token, like redirecting to a login page
        }
      }
   
      getSavedOpportunities();
    }, [paginationMeta, token, opportunityType]); // Depend on paginationMeta and opportunityType
   

  return (
    <>
      <div className="flex flex-col mx-auto min-h-screen p-4 bg-white dark:bg-gray-900">
        <div className="w-full flex items-end justify-end">
          <select
            name="Opportunity Type"
            id="opportunity-type-selector"
            defaultValue="off-campus"
            className="w-fit  border-gray-500 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white  rounded-md "
            onChange={(e) => {
              setOpportunityType(() => e.target.value);
            }}
          >
            {["off-campus", "on-campus"].map((item) => {
              return (
                <option
                  value={item}
                  key={item}
                  className="uppercase gap-1 flex"
                >
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        {savedOpportunitiesList.length === 0 ? (
          <div className="flex flex-col justify-center items-center lg:w-2/4 flex-1 dark:text-white mx-auto self-center">
            <img src={OpportunitiesNotFoundImg} alt="OppNotFound" />
            <h2 className="text-2xl sm:text-3xl font-bold animate-bounce text-center ">
              You have not saved any opportunities yet!
            </h2>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center mx-auto mt-4 mb-7 flex-1">
              {savedOpportunitiesList.map((opportunity, index) => (
                <SavedOpportunityCard key={index} {...opportunity} />
              ))}
            </div>

            {/* ------------PAGINATION----------- */}
            <div className="flex items-center justify-center w-2/4 mt-8">
              <button
                className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
                  paginationMeta.currentPage <= 1
                    ? "cursor-not-allowed text-gray-400 "
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  setPaginationMeta((data) => ({
                    ...data,
                    currentPage: data.currentPage - 1,
                  }))
                }
                disabled={paginationMeta.currentPage <= 1}
              >
                <TbPlayerTrackPrevFilled />
                <span className="uppercase">previous</span>
              </button>
              <div className="flex items-center justify-center">
                {Array(totalPages)
                  .fill(null)
                  .map((_, index) => (
                    <button
                      key={index + 1}
                      className={
                        "border rounded-full px-4 py-2 ml-3 mr-3 dark:text-white focus:ring-2 "
                      }
                      onClick={() =>
                        setPaginationMeta((data) => ({
                          ...data,
                          currentPage: index + 1,
                        }))
                      }
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
              <button
                className={`flex items-center text-black dark:text-white rounded-lg p-3  ${
                  paginationMeta.currentPage >= paginationMeta.totalResults
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  setPaginationMeta((data) => ({
                    ...data,
                    currentPage: data.currentPage + 1,
                  }))
                }
                disabled={
                  paginationMeta.currentPage >= paginationMeta.totalResults
                }
              >
                <span className="uppercase ml-3">next</span>
                <TbPlayerTrackNextFilled />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyOpportunities;
