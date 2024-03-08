import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../../Services/Operations/AuthenticationApi";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className="flex justify-center items-center  dark:bg-richblack-900 bg-white  h-[90vh]">
      <div className=" flex flex-col justify-center items-center p-1 lg:p-4  rounded-lg shadow-2xl">
        {loading ? (
          <div className="loader  h-[80vh] "></div>
        ) : (
          <div className="p-4 lg:p-8 ">
            <h1 className="flex justify-center text-center  text-[1.875rem] text-blue-600 font-bold leading-[2.375rem] my-5 dark:text-white">
              {!emailSent ? "Reset your Password" : "Check your email"}
            </h1>
            <div className="">
              <p className="m-1 text-center text-[1.25rem] font-semibold leading-[1.625rem]  text-black  dark:text-white mb-6 p-2 mx-9">
                {!emailSent
                  ? "Rest assured, we'll send you an email with instructions to reset your password. If email isn't an option, we're here to assist with account recovery."
                  : `The reset email has been delivered to ${email}`}
              </p>
            </div>
            <form onSubmit={handleOnSubmit}>
              {!emailSent && (
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black dark:text-white ">
                    Email Address<sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="border dark:border-none rounded-md text-richblack-5 dark:text-white w-full p-3 bg-gray-50 dark:bg-richblack-800"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                  />
                </label>
              )}
              <div className="flex  justify-center items-center">
                <button
                  type="submit"
                  className="flex justify-center bg-primary-600 hover:bg-primary-700 text-white  font-semibold px-[12px] rounded-[8px] py-[8px] mt-6"
                >
                  {!emailSent ? "Reset Password" : "Resend Email"}
                </button>
              </div>
            </form>
            <div className="flex justify-center">
              <div className="mt-6 flex  items-center justify-between">
                <Link to="/login">
                  <p className="flex flex-row items-center  gap-x-2 text-black dark:text-white mt-3">
                    <BiArrowBack /> Back To Login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
