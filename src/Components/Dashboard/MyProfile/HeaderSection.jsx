import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import ActionBtn from "../../../Common/ActionBtn";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/profile-section/editIcon.svg";

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
      <div className="flex justify-end">
        <div className="mt-3 px-4 mb-3">
          <ActionBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/my-settings");
            }}>
            <img  src={EditIcon} alt="" />
          </ActionBtn>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
