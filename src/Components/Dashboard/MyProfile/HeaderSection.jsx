import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import ActionBtn from "../../../Common/ActionBtn";
import { useNavigate } from "react-router-dom";

const HeaderSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center py-12">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center dark:text-white ">
          Explore. Enhance. Express
          <span className="block text-primary-500">Your Profile Awaits! </span>
        </h1>
      </div>
      <div className="flex justify-between">
        <h1 className="sm:mb-6 text-3xl font-bold text-black   dark:text-richblack-25 ml-4 sm:ml-5 mt-2 sm:mt-0 ">
          Your Profile
        </h1>
        <div className="mt-3 px-4 mb-3">
          <ActionBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/my-settings");
            }}
          >
            <RiEditBoxLine />
          </ActionBtn>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
