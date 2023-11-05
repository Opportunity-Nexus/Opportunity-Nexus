import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsLoggedIn }) => {
  const [accountType, setAccountType] = useState("student");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const [showPassword, setShowPassword] = useState({
    createPassword: false,
    confirmPassword: false,
  });

  const handleClick = (buttonName) => {
    setShowPassword({
      ...showPassword,
      [buttonName]: !showPassword[buttonName],
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.createPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const finalData = {
      ...formData,
      accountType,
    };

    console.log(finalData);
    setIsLoggedIn(true);
    toast.success("Account Created Successfully");
    navigate("/");
  };

  return (
    <div className="mt-1">
      {/* Button Group */}
      <div className="flex border border-gray-300  bg-gray-50 dark:bg-richblack-800 dark:border-none max-w-max rounded-full p-0 m-0 gap-x-1">
        <button
          className={`${
            accountType === "student"
              ? " bg-primary-600 dark:bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("student")}
        >
          Student
        </button>

        <button
          className={`${
            accountType === "instructor"
              ? "bg-primary-600 dark:bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("instructor")}
        >
          Instructor
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4 mt-6"
      >
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border border-gray-300 text-black dark:text-richblack-5  bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px] 
              "
              required
              type="text"
              name="firstName"
              id="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="Enter first name"
            />
          </label>

          <label className="w-full">
            <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="lastName"
              id="lastName"
              onChange={changeHandler}
              value={formData.lastName}
              placeholder="Enter last name"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px]"
            required
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="Enter email address"
            onChange={changeHandler}
          />
        </label>

        <div className="flex-col gap-x-4  ">
          <label className="w-full relative ">
            <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px]"
              required
              type={showPassword.createPassword ? "text" : "password"}
              name="createPassword"
              id="createPassword"
              onChange={changeHandler}
              value={formData.createPassword}
              placeholder="Enter Password"
            />

            <span
              className="absolute top-[38px] right-3 z-10 cursor-pointer"
              onClick={() => handleClick("createPassword")}
            >
              {showPassword.createPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </span>
          </label>

          <label className="w-full relative ">
            <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem] mt-3">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px]"
              required
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
            />

            <span
              className="absolute top-[82px] right-3 z-10 cursor-pointer"
              onClick={() => handleClick("confirmPassword")}
            >
              {showPassword.confirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </span>
          </label>
        </div>

        <button className=" bg-primary-600 hover:bg-primary-700 text-white dark:text-richblack-900 font-semibold px-[12px] rounded-[8px] py-[8px] mt-2">
          Create Account
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
