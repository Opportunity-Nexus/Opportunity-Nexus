import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
import { resetPassword } from "../../Services/Operations/AuthenticationApi";
import { BiArrowBack } from "react-icons/bi";
import forgoticon from "../../assets/utils/forgot.png";
const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordResetDone, setPasswordResetDone] = useState(false);
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const { password, confirmPassword } = formData;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(
      resetPassword(password, confirmPassword, token, setPasswordResetDone)
    );
  };
  return (
    <div className="flex justify-center items-center  dark:bg-richblack-900 bg-white  h-[90vh] ">
      <div className=" flex flex-col justify-center max-w-3xl items-center p-5 lg:p-4  rounded-lg   ">
        {loading ? (
          <div className="loader h-screen "></div>
        ) : (
          <div className="p-5 lg:p-8 shadow-lg dark:shadow-2xl dark:bg-midnightblue rounded-xl ">
            {!passwordResetDone ? (
              <div className="w-full px-8 dark:text-white ">
                <h1 className="text-blue-600 text-center  text-4xl font-bold ">
                  Choose new password
                </h1>
                <p className="font-semibold text-center text-xl">
                  Almost done. <br /> Enter your new password and you're all
                  set.
                </p>
                <form onSubmit={handleOnSubmit}>
                  <div className="gap-x-4 ">
                    <label className="relative  ">
                      <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] mt-4">
                        New Password<sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder="Enter Password "
                        className="border dark:border-none rounded-md text-richblack-5 w-full h-fit p-3 bg-gray-50 dark:bg-richblack-800"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                      />
                      <span
                        className="absolute top-[38px] right-3  cursor-pointer "
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                          <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                      </span>
                    </label>
                    <label className="relative ">
                      <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] mt-2">
                        Confirm New Password
                        <sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm Password"
                        className="border  dark:border-none rounded-md text-richblack-5 w-full p-3 bg-gray-50 dark:bg-richblack-800"
                        style={{
                          boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                      />
                      <span
                        className="absolute top-[82px] right-3  cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                          <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className=" bg-primary-600 hover:bg-primary-700 text-white  font-semibold px-[12px] rounded-[8px] py-[8px] mt-4"
                  >
                    Reset Password
                  </button>
                </form>
                <div>
                  <Link to="/login">
                    <p className="flex items-center gap-x-2 text-black dark:text-white mt-3">
                      <BiArrowBack /> Back To Login
                    </p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex  h-[90vh] flex-col justify-center  items-center  text-center text-gray-700 dark:text-gray-300">
                <div className="hidden ">
                  {/* <img
                    src={forgoticon}
                    alt="Forgot Icon"
                    style={{
                      height: "400px",
                      width: "400px",
                      objectFit: "contain",
                    }}
                  /> */}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    🎉 Password Successfully Reset! 🎉
                  </h2>
                  <p className="text-lg">You've unlocked a new password!</p>

                  <p className="mt-4 text-xl font-semibold">
                    Are you ready to reclaim control of your account and unlock
                    new possibilities?
                  </p>

                  <Link
                    to="/login"
                    className="mt-6 inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Let's Go! Back to login
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
