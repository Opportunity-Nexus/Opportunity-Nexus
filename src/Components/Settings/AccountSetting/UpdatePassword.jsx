import { changePassword } from "../../../Services/Operations/SettingAPI";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";

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
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };
  const submitPasswordForm = async (data) => {
    if (!isPasswordValid(data.newPassword)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE- ", error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className=" flex flex-col gap-y-4 rounded-md border-[1px] dark:border-richblack-700 dark:bg-richblack-800 p-8 sm:px-6">
          <h2 className="sm:text-2xl text-xl font-bold dark:text-richblack-5 mb-8 text-center sm:text-start ">
            Password
          </h2>
          <div className="flex-col  gap-2  ">
            <div className="relative flex flex-col gap-2 w-full">
              <label htmlFor="oldPassword" className="label-style">
                Current Password
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="input-style"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
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
              <label htmlFor="newPassword" className="label-style">
                New Password
                <sup className="text-pink-200">*</sup>
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="input-style"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
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

          <div className="flex justify-center sm:justify-end gap-2  flex-wrap">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
              className="cursor-pointer rounded-md dark:bg-red-500 py-2 px-5 font-semibold  dark:text-richblack-5 border dark:border-richblack-700"
            >
              Cancel
            </button>
            <button
              className="bg-primary-600 hover:bg-primary-700 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
