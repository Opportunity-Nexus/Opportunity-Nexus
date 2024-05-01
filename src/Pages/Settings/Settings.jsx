import React from "react";
import ChangeProfilePicture from "../../Components/Settings/AccountSetting/ChangeProfilePicture";
import EditProfile from "../../Components/Settings/AccountSetting/EditProfile";
import UpdatePassword from "../../Components/Settings/AccountSetting/UpdatePassword";
import DeleteAccount from "../../Components/Settings/AccountSetting/DeleteAccount";
import SocialProfile from "../../Components/Settings/AccountSetting/SocialProfile";
import Internship from "../../Components/Settings/AccountSetting/Internship";
import Education from "../../Components/Settings/AccountSetting/Education";
import Project from "../../Components/Settings/AccountSetting/Project";
import UdateCareerParticulars from "../../Components/Settings/AccountSetting/UdateCareerParticulars";
const AccountSetting = () => {
  return (
    <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center py-12">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center dark:text-white ">
          Account Settings Hub
          <span className="block text-primary-500">
            Personalize Your Own Account{" "}
          </span>
        </h1>
      </div>

      <div className="space-y-8 rounded-md border border-1 dark:border-richblack-700  sm:p-6 dark:text-gray-500 ">
        <h1 className="sm:mb-6 text-3xl font-bold text-black   dark:text-richblack-25 ml-4 sm:ml-5 mt-2 sm:mt-0 ">
          Edit Profile
        </h1>

        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between ">
          <div className=" lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              About us
            </h1>
            <p className="text-sm px-2">
              Describe yourself to us so we can get to know you.
            </p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <ChangeProfilePicture />
            <EditProfile />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between ">
          <div className="lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2 ">
              Change Password
            </h1>
            <p className="text-sm px-2">
              Change Your Password to secure your account
            </p>
          </div>
          <div className="lg:w-[70%] w-full">
            <UpdatePassword />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between">
          <div className="pr-4  lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              Delete account
            </h1>
            <p className="text-sm px-2 ">
              Do you wish to have your account deleted?
            </p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <DeleteAccount />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between">
          <div className="pr-4  lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              Social Profile
            </h1>
            <p className="text-sm px-2 ">Where can people find you online?</p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <SocialProfile />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between">
          <div className="pr-4  lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              Your work experience
            </h1>
            <p className="text-sm px-2 ">What other position have you held?</p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <Internship />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between">
          <div className="pr-4  lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              Education
            </h1>
            <p className="text-sm px-2 ">
              What school / college have you studied at?
            </p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <Education />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex  flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between">
          <div className="pr-4  lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              Projects
            </h1>
            <p className="text-sm px-2 ">What Project have you created ?</p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <Project />
          </div>
        </div>
        <hr className="border-t dark:border-richblack-700" />
        <div className="flex flex-col gap-y-8 lg:gap-x-10 p-2 sm:p-4 lg:flex-row justify-between">
          <div className="pr-4  lg:w-[30%]">
            <h1 className="text-2xl font-semibold dark:text-white px-2">
              Career Options
            </h1>
            <p className="text-sm px-2 ">What's Your preferences ?</p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <UdateCareerParticulars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
