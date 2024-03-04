import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../../Services/Operations/AuthenticationApi";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
	const { loading } = useSelector((state) => state.auth);
	const [emailSent, setEmailSent] = useState(false);
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(getPasswordResetToken(email, setEmailSent));
	};
	return (
		<>
			<div className="px-4 sm:px-6 max-w-7xl h-full mx-auto flex justify-center items-center ">
				{loading ? (
					<div className="loader"></div>
				) : (
					<div className="">
						<h1 className="font-bold text-xl mb-3 text-black dark:text-white">
							{!emailSent ? "Reset your Password" : "Check your email"}
						</h1>
						<p className="font-semibold text-base text-black dark:text-white">
							{!emailSent
								? "Rest assured, we'll send you an email with instructions to reset your password. If email isn't an option, we're here to assist with account recovery."
								: `We have sent the reset email to ${email}`}
						</p>
						<form onSubmit={handleOnSubmit}>
							{!emailSent && (
								<label>
									<p className="mt-4 text-base text-black dark:text-white mb-1">
										Email Address<sup className="text-pink-200">*</sup>
									</p>
									<input
										required
										type="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email address"
										className="border dark:border-none rounded-md text-richblack-5 w-full p-3 bg-gray-50 dark:bg-richblack-800"
										style={{
											boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
										}}
									/>
								</label>
							)}
							<button
								type="submit"
								className=" bg-primary-600 hover:bg-primary-700 text-white  font-semibold px-[12px] rounded-[8px] py-[8px] mt-2"
							>
								{!emailSent ? "Reset Password" : "Resend Email"}
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
				)}
			</div>
		</>
	);
};

export default ForgotPassword;
