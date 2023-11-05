import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";

const Template = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  return (
    <div
      className="flex w-11/12 max-w-[1160px] py-0 mx-auto  gap-y-0 gap-x-12 justify-center align-center  h-[90vh] text-richblack-100 
    "
    >
      <div className="w-11/12 max-w-[450px] flex flex-col justify-center  ">
        <h1 className="text-black dark:text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] ">
          {props.title}
        </h1>
        <p className="text-[1.125rem] mt-0 leading-[1.625rem]">
          <span className="text-black dark:text-richblack-100">
            {props.description1}
          </span>
          <span className="text-primary-600 italic ">
            {" "}
            {props.description2}
          </span>
        </p>

        {props.formType === "login" ? (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        )}

        <div className="flex w-full items-center gap-x-2 my-2">
          <div className="h-[1px] bg-richblack-700 w-full"></div>
          <p className="uppercase text-richblack-700 font-medium leading-[1.375rem]">
            or
          </p>
          <div className="h-[1px] bg-richblack-700 w-full"></div>
        </div>

        <button className=" flex rounded-md items-center justify-center border hover:bg-slate-100 dark:hover:bg-slate-600 border-richblack-700 font-medium text-black dark:text-richblack-100 px-[12px] py-[8px] gap-x-2 mt-4 	">
          <FcGoogle />
          <p>Continue with Google</p>
        </button>
      </div>

      <div className=" relative w-11/12 max-w-[450px] hidden md:block my-auto ">
        <img
          src={props.image}
          alt="patter"
          width={558}
          height={504}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Template;
