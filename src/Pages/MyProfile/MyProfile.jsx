import React from "react";
import { RiEditBoxLine } from "react-icons/ri";
import ActionBtn from "../../Common/ActionBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgEditUnmask } from "react-icons/cg";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mx-auto min-h-screen p-1 md:p-4 bg-white dark:bg-gray-900">
        <div className="flex justify-center items-center py-12">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center dark:text-white ">
            Explore. Enhance. Express
            <span className="block text-primary-500">
              Your Profile Awaits!{" "}
            </span>
          </h1>
        </div>
        <div className="">
          <h1 className="sm:mb-6 text-3xl font-bold text-black   dark:text-richblack-25 ml-4 sm:ml-5 mt-2 sm:mt-0 ">
            Your Profile
          </h1>

          <div className="flex  items-center justify-between rounded-md border-[1px] dark:border-richblack-700  bg-white dark:bg-gray-900 p-8 px-16 w-[]">
            <div className="flex items-center gap-x-4 w-full justify-between ">
              <div className="space-y-0">
                <p className="text-xl font-semibold px-4 dark:text-richblack-5 ">
                  <span>{user?.firstName + " " + user?.lastName} </span>
                </p>
                <p className="text-sm font-semibold px-2 dark:text-richblack-5">
                  <div className="flex items-center gap-x-2 text-sm font-semibold px-2 dark:text-richblack-5">
                    <MdEmail />
                    <span>{user?.email}</span>
                  </div>
                </p>
                <p className="text-sm font-semibold px-2 dark:text-richblack-5">
                  <div className="flex items-center gap-x-2 text-sm font-semibold px-2 dark:text-richblack-5">
                    <FaRegUserCircle />
                    <span>{user?.accountType} </span>
                  </div>
                </p>
                <p className="text-sm font-semibold px-2 dark:text-richblack-5 ">
                  <div className="flex items-center gap-x-2 text-sm font-semibold px-2 dark:text-richblack-5">
                    <CgEditUnmask />
                    <span>{user?.enrollmentNumber}</span>
                  </div>
                </p>
                <div className="mt-3 px-4">
                  <ActionBtn
                    text="Edit"
                    onclick={() => {
                      navigate("/dashboard/settings");
                    }}
                  >
                    <RiEditBoxLine />
                  </ActionBtn>
                </div>
              </div>
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[150px] rounded-full object-cover"
              />
            </div>
            {/* <div className="my-10 flex flex-col gap-y-0 rounded-md dRK:bg-richblack-800 p-2 px-12">
              <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold px-2 dark:text-richblack-5">
                  About
                </p>
              </div>
              <p
                className={`${
                  user?.additionalDetails?.about
                    ? "dark:text-richblack-5"
                    : "text-richblack-5"
                } text-sm font-semibold px-2`}
              >
                {user?.additionalDetails?.about ??
                  "Write Something About Yourself"}
              </p>
            </div> */}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
