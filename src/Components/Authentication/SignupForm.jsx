import React, { useState} from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import InputOtp from "../../Pages/Authentication/InputOtp";
import axios from "axios";

const SignupForm = ({ setIsLoggedIn }) => {
  const [accountType, setAccountType] = useState("student");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [showOTPModel, setShowOTPModel] = useState(false);
  const handleOnClose = () => {
    setShowOTPModel(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
  });
  const handleEnrollmentNoChange = (event) => {
    const inputValue = event.target.value;
    setEnrollmentNo(inputValue);
  };
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

    if (formData.createPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (formData.createPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!/^BU\d{10}$/.test(enrollmentNo)) {
      toast.error("Please enter a valid enrollment number");
      return;
    }

    const finalData = {
      ...formData,
      accountType,
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/v1/auth/sendotp",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({email:finalData.email}),
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setShowOTPModel(true);
          toast.success("OTP has been sent successfully");
        }
        else{
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-0">
      {/* Button Group */}
      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-2 mt-3"
      >
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="border border-gray-3 text-black dark:text-richblack-5  bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px] 
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
              className=" absolute top-[38px] right-3  cursor-pointer"
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
              className="  absolute top-[82px] right-3  cursor-pointer"
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
        <label>
          <p className="text-black dark:text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem] mt-3">
            Enrollment No<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="border border-gray-300 text-black dark:text-richblack-5 bg-gray-50 dark:bg-richblack-800 dark:border-none rounded-[8px] w-full px-[12px] py-[8px]"
            required
            placeholder="BUxxxxxxxxxx"
            value={enrollmentNo}
            onChange={handleEnrollmentNoChange}
          />
        </label>
        <button className=" bg-primary-600 hover:bg-primary-700 text-white  font-semibold px-[12px] rounded-[8px] py-[8px] mt-2">
          Create Account
        </button>
        <p className="text-sm font-light text-black dark:text-white">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </a>
        </p>
      </form>
      <InputOtp
        email={formData.email}
        onClose={handleOnClose}
        visible={showOTPModel}
        data={{
          ...formData,
          accountType,
        }}
      />
    </div>
  );
};

export default SignupForm;
