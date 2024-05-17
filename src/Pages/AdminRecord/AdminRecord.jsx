import React, { useEffect, useState } from "react";
import OnCampusOpportunityCard from "../../Components/Opportunities/OnCampusOpportunityCard";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import { useSelector } from "react-redux";
import {
  getOnCampusBookmarkedOpportunities,
  getOncampusOpportunities,
} from "../../Services/Operations/OnCampusApi";

const AdminOpportunitiesRecords = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [onCampusOpportunities, setOnCampusOpportunities] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [onCampusOpportunityTag, setOnCampusOpportunityTag] = useState({
    availableTags: [],
    selectedTags: [],
  });

  const [totalOpportunitiesPages, setTotalOpportunitiesPages] = useState(
    Math.ceil(onCampusOpportunities.length / 6)
  );

  useEffect(() => {
    setTotalOpportunitiesPages(() => {
      const lengthOfOpportunities = onCampusOpportunities.filter((item) =>
        onCampusOpportunityTag.selectedTags.length === 0
          ? true
          : item.opportunityTags.filter((element) =>
              onCampusOpportunityTag.selectedTags.includes(element)
            ).length > 0
      ).length;
      return Math.ceil(lengthOfOpportunities / 6);
    });
  }, [onCampusOpportunities, onCampusOpportunityTag.selectedTags]);

  //----------------------PAGINTAION----------------------//

  const [currentPage, setCurrentPage] = useState(1);

  const [bookmarkedOpportunities, setBookmarkedOpportunities] = useState([]);

  const [refetchBookmarkOpp, setRefetchBookmarkOpp] = useState(false);

  useEffect(() => {
    if (!refetchBookmarkOpp) return;
    getOnCampusBookmarkedOpportunities({ token: token })
      .then((data) => {
        console.log({ bookmarkedOpps: data });
        setBookmarkedOpportunities(() => {
          return data || [];
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setRefetchBookmarkOpp(false));
  }, [token, refetchBookmarkOpp]);

  useEffect(() => {
    setIsFetching(() => true);
    getOncampusOpportunities({ token: token })
      .then((data) => {
        setOnCampusOpportunities(() => {
          return data;
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsFetching(false);
      });
  }, [token]);

  useEffect(() => {
    const tagSet = new Set();
    onCampusOpportunities.forEach((opp) => {
      (opp.opportunityTags || []).forEach((item) => tagSet.add(item));
    });

    setOnCampusOpportunityTag(() => ({
      availableTags: Array.from(tagSet),
      selectedTags: [],
    }));
  }, [onCampusOpportunities]);

  return (
    <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center py-12">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center dark:text-white ">
          OpportunityNexus
          <span className="block text-primary-500">
            Manage your Opportunities
          </span>
        </h1>
      </div>

      {onCampusOpportunities ? (
        <>
          {isFetching ? (
            <div className="h-screen flex flex-1 items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : onCampusOpportunities.length === 0 ? (
            <div className="flex flex-col justify-center items-center lg:w-2/4 flex-1 dark:text-white mx-auto self-center">
              <img src={OpportunitiesNotFoundImg} alt="OppNotFound" />
              <h2 className="text-2xl sm:text-3xl font-bold animate-bounce text-center ">
                You have not have any open opportunities published yet!
              </h2>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap mt-4 mb-7 gap-8 px-2">
                {/* tags */}
                {onCampusOpportunityTag.availableTags.length !== 0 ? (
                  <div className="hidden md:flex gap-1 flex-wrap">
                    <span className="text-black font-bold text-lg dark:text-white">
                      Search easily with these Keywords
                    </span>
                    {onCampusOpportunityTag.availableTags.map(
                      (item, itemIndex) => {
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
                              setCurrentPage(() => 1);
                            }}
                          >
                            {item}
                          </button>
                        );
                      }
                    )}
                  </div>
                ) : null}

                {onCampusOpportunities
                  .filter((item) =>
                    onCampusOpportunityTag.selectedTags.length === 0
                      ? true
                      : item.opportunityTags.filter((element) =>
                          onCampusOpportunityTag.selectedTags.includes(element)
                        ).length > 0
                  )
                  .slice(currentPage * 6 - 6, currentPage * 6)
                  .map((opportunity, index) => {
                    return (
                      <OnCampusOpportunityCard
                        key={index}
                        {...opportunity}
                        setOnCampusOpportunities={setOnCampusOpportunities}
                        setRefetchBookmarkOpp={setRefetchBookmarkOpp}
                        bookmarkedOpportunities={bookmarkedOpportunities}
                        isAlreadyBookMarked={
                          bookmarkedOpportunities.findIndex(
                            (item) => item.opportunityId._id === opportunity._id
                          ) > -1
                        }
                        isAdmin={true}
                      />
                    );
                  })}
              </div>

              {/* ------------PAGINATION----------- */}

              {totalOpportunitiesPages > 1 && (
                <div className="flex items-center justify-center w-2/4 mt-8 mx-auto ">
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
                    <span className="uppercase font-medium text-sm md:text-base">
                      previous
                    </span>
                  </button>
                  <div className="hidden lg:flex items-center justify-center">
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
                    <span className="uppercase ml-3 font-medium text-sm md:text-base">
                      next
                    </span>
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

export default AdminOpportunitiesRecords;
