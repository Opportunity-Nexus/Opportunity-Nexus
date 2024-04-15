import React, { useEffect, useState } from "react";
import OnCampusOpportunityCard from "../../Components/Opportunities/OnCampusOpportunityCard";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import OpportunitiesNotFoundImg from "../../assets/utils/opp-not-found.svg";
import { useSelector } from "react-redux";
import { getOncampusOpportunities } from "../../Services/Operations/OnCampusApi";


const MyOpportunities = () => {
 
  const [onCampusOpportunities, setOnCampusOpportunities] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getOncampusOpportunities({ token: token })
      .then((data) => {
        console.log({ data });
        setOnCampusOpportunities(() => {
          return data;
        });
      })
      .catch((error) => console.error(error));
  }, [token]);

  //----------------------PAGINTAION----------------------//

  const [currentPage, setCurrentPage] = useState(1);
  const totalOpportunitiesPages = Math.ceil(onCampusOpportunities.length / 6);
  const currentOpportunities = onCampusOpportunities.slice(
    currentPage * 6 - 6,
    currentPage * 6
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

      {onCampusOpportunities ? (
        <>
          {onCampusOpportunities.length === 0 ? (
            <div className="flex flex-col justify-center items-center lg:w-2/4 flex-1 dark:text-white mx-auto self-center">
              <img src={OpportunitiesNotFoundImg} alt="OppNotFound" />
              <h2 className="text-2xl sm:text-3xl font-bold animate-bounce text-center ">
                You have not saved any opportunities yet!
              </h2>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center mt-4 mb-7 flex-1">
                {currentOpportunities.map((opportunity, index) => (
                    <OnCampusOpportunityCard
                      key={index}
                      {...opportunity}
                      setOnCampusOpportunities={setOnCampusOpportunities}
                    />
                  ))}
              </div>

              {/* ------------PAGINATION----------- */}

              {pageNumbers.length > 1 && (
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
                    <span className="uppercase font-medium text-sm md:text-base">previous</span>
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
                    <span className="uppercase ml-3 font-medium text-sm md:text-base">next</span>
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

export default MyOpportunities;
