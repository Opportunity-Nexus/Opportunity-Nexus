import React from "react";
import ChangeProfilePicture from "./AccountSetting/ChangeProfilePicture";
import EditProfile from "./AccountSetting/EditProfile";
import UpdatePassword from "./AccountSetting/UpdatePassword";
import DeleteAccount from "./AccountSetting/DeleteAccount";
const AccountSetting = () => {
  return (
    <div className="sm:p-[5%] mt-2 flex ">
      <div className="space-y-8 rounded-md border border-1 dark:border-richblack-700  dark:bg-richblack-800 sm:p-6 dark:text-gray-500 ">
        <h1 className="sm:mb-12 text-3xl font-medium text-richblack-700 p-2 dark:text-richblack-25">
          Edit Profile
        </h1>

        <div className="flex  flex-col gap-y-2 lg:gap-x-10 sm:p-4 lg:flex-row justify-between">
          <div className="">
            <h1 className="text-xl font-semibold dark:text-white px-2">
              About us
            </h1>
            <p className="text-sm px-2">
              Tell us about yourself so startups know who you are.
            </p>
          </div>
          <div className="lg:w-[70%] w-full ">
            <ChangeProfilePicture />
            <EditProfile />
          </div>
        </div>
        <hr className="border-t border-richblack-200" />
        <div className="flex  flex-col gap-y-2 lg:gap-x-10 sm:p-4 lg:flex-row justify-between ">
          <div>
            <h1 className="text-xl font-semibold dark:text-white px-2">
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
        <hr className="border-t border-richblack-200" />
        <div className="flex  flex-col gap-y-2 lg:gap-x-10 sm:p-4 lg:flex-row justify-between">
          <div>
            <h1 className="text-xl font-semibold dark:text-white px-2">
              Delete account
            </h1>
            <p className="text-sm px-2">Want to delete your account?</p>
          </div>
          <div className="lg:w-[70%] w-full">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;