import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

const LoginForm = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    toast.success("Logged in Successfully");
    console.log(formData);
    setIsLoggedIn(true);
    navigate("/");
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label htmlFor="" className="w-full">
        <p className="text-[0.875rem] text-black dark:text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address
          <sup className="text-pink-200">*</sup>
        </p>

        <input
          type="email"
          required
          value={formData.email}
          placeholder="Enter your email address"
          onChange={changeHandler}
          name="email"
          className="border border-gray-300 bg-gray-50 dark:bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-black dark:text-richblack-5 dark:border-none"
        />
      </label>

      <label htmlFor="" className="w-full relative">
        <p className="text-[0.875rem] text-black dark:text-richblack-5 mb-1 leading-[1.375rem]">
          Password
          <sup className="text-pink-200">*</sup>
        </p>

        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          placeholder="Enter Password"
          onChange={changeHandler}
          name="password"
          className="border border-gray-300 bg-gray-50 dark:bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-black dark:text-richblack-5 dark:border-none"
        />

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/ForgetPass">
          <p className="text-xs mt-1 text-primary-600 max-w-max ml-auto">
            Forgot Password
          </p>
        </Link>
      </label>

      <button className="bg-primary-600 hover:bg-primary-700 text-white  py-[8px] px-[12px] rounded-[8px] mt-2 font-semibold">
        Sign in
      </button>
      <p class="text-sm font-light text-black dark:text-white">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Signup here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
