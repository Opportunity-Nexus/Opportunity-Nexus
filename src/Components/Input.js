import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function Input() {
  const [otp, setOtp] = useState("");

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderInput={(props) => (
        <input
          {...props}
          placeholder="-"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-[48px] lg:w-[60px] border-0 bg-richblack-25 dark:bg-richblack-800 rounded-[0.5rem] text-black dark:text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
        />
      )}
      containerStyle={{
        justifyContent: "space-between",
        gap: "0 6px",
      }}
    />
  );
}
