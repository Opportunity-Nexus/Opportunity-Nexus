import { changePassword } from "../../../Services/Operations/SettingAPI";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconBtn from "../../../Common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE- ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className=" flex flex-col gap-y-6 rounded-md border-[1px] dark:border-richblack-700 dark:bg-richblack-900 p-8 sm:px-6">
          <h2 className="text-xl font-bold dark:text-richblack-5 mb-6">
            Password
          </h2>
          <div className="flex-col  gap-2 ">
            <div className="relative flex flex-col gap-2 w-full">
              <label
                htmlFor="oldPassword"
                className="text-base font-semibold text-[14px] dark:text-richblack-5"
              >
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-700 dark:border-none rounded-lg w-full px-3 py-3 shadow-[0_1px_0_0] shadow-white/25"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Enter Your Current Password
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 w-full mt-3">
              <label
                htmlFor="newPassword"
                className="text-base font-semibold  text-[14px] dark:text-richblack-5"
              >
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-700 dark:border-none rounded-lg w-full px-3 py-3 shadow-[0_1px_0_0] shadow-white/25"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] dark:text-yellow-100">
                  Enter Your New Password
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2  flex-wrap">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md dark:bg-red-500 py-2 px-5 font-semibold  dark:text-richblack-5 border dark:border-richblack-700"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Update" />
          </div>
        </div>
      </form>
    </>
  );
}
