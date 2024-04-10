import React from "react";
const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  // inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline
          ? "border border-blue-500 bg-transparent"
          : "bg-primary-600 hover:bg-primary-700"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-blue-500"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
