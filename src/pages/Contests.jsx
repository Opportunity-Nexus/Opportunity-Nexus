import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contests({ isLoggedIn }) {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [codingContests, setCodingContests] = useState([
    {
      id: 1,
      name: "CodeJam 2024",
      deadline: "31/01/2024",
      url:"https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
      image:
        "https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
    },
    {
      id: 2,
      name: "HackerRank Monthly Challenge",
      deadline: "31/01/2024",
      url:"https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
      image:
        "https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
    },
    {
      id: 1,
      name: "CodeJam 2024",
      deadline: "31/01/2024",
      url:"https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
      image:
        "https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
    },
    {
      id: 2,
      name: "HackerRank Monthly Challenge",
      deadline: "31/01/2024",
      url:"https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
      image:
        "https://www.finsmes.com/wp-content/uploads/2022/03/hackerrank.png",
    },
  ]);
  const [appliedContests, setAppliedContests] = useState([]);


  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://api.hostellelo.in/api/v1/auth/user",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setAppliedContests(response.data.data.appliedContests);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);

  





  /*useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://kontests.net/api/v1/all");
      setCodingContests(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 fetchData();
}, []);*/

  const handleAdd = (c) => {
    const finalData=JSON.stringify({
      appliedContests:[...appliedContests,c]
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://api.hostellelo.in/api/v1/auth/user",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: finalData,
    };

    axios
      .request(config)
      .then((response) => {
          console.log("applied");
          window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-11/12 max-w-[1160px] py-8 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-black dark:text-richblack-5 mb-6">
          Coding Contests
        </h1>
        <p className="text-lg text-center text-gray-700 dark:text-gray-300">
          Whether it's Google, Apple, or free software, we've got some fantastic
          competitors, and it keeps us on our toes. <br />{" "}
          <span className="text-primary-600 italic">
            Participate in contests to future-proof your career.
          </span>
        </p>
      </div>
      <h2 className="text-3xl font-semibold text-center text-black dark:text-richblack-5 mb-6">
        Upcoming Contests
      </h2>

      {/* List of Coding Contests */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-11/12 max-w-[1160px] ">
        {codingContests.map((contest) => (
          <div
            key={contest.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold text-black dark:text-richblack-5 mb-2">
              {contest.name}
            </h2>
            <p className="">Deadline: {contest.deadline}</p>
            <button
              onClick={() => handleAdd(contest)}
              className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition duration-300"
            >
              Apply Now
            </button>
            
            <a href={contest.url} target="_blank" rel="noopener noreferrer">
              &nbsp;   Link to Contest
            </a>

          </div>
        ))}
      </div>

      {/* List of Applied Contests */}
      <div className="mt-12 w-11/12 max-w-[1160px]">
        {appliedContests.length !== 0 && (
          <h2 className="text-3xl font-semibold text-center text-black dark:text-richblack-5 mb-6">
            Applied Contests
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {appliedContests?.map((appliedContest) => (
            <div
              key={appliedContest.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={appliedContest.image}
                alt={appliedContest.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold text-black dark:text-richblack-5 mb-2">
                {appliedContest.name}
              </h2>
              <p className="text-sm text-gray-500">Applied</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contests;
