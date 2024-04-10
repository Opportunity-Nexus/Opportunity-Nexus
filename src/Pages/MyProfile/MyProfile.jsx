import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
      <div className="border    ">
        <h1 className="text-center text-blur">My Profile</h1>
        <div className="flex ">
          <img
            alt={`profile-${user?.firstName}`}
            src={user.image}
            className="w-16 h-16 object-cover  rounded-full ml-4"
          />{" "}
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
