import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../Services/Operations/AuthenticationApi";
import { sendOtp } from "../../Services/Operations/AuthenticationApi";

export default function InputOtp({ visible, onClose, email }) {
	const { signupData } = useSelector((state) => state.auth);
	const [otp, setOtp] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleOnClose = (e) => {
		if (e.target.id === "cotainer") onClose();
	};
	console.log(
		"Total account data recieved on OTP page :" + JSON.stringify(signupData)
	);

	useEffect(() => {
		// Only allow access of this route when user has filled the signup form
		if (!signupData) {
			navigate("/signup");
		}
		// eslint-disable-next-line
	}, []);

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const {
			accountType,
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			enrollmentNumber,
		} = signupData;
		console.log(
			"Total account data recieved on submitting otp here:" +
				JSON.stringify(signupData)
		);
		dispatch(
			signUp(
				accountType,
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				otp,
				enrollmentNumber,
				navigate
			)
		);
		console.log("I came here");
	};

	if (!visible) return null;
	return (
		<div
			id="cotainer"
			onClick={handleOnClose}
			className=" flex min-h-screen flex-col justify-center overflow-hidden py-12 
      fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm"
		>
			<div className="relative bg-white dark:bg-richblack-900   px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
				<div className="mx-auto flex w-full max-w-md flex-col space-y-16">
					<div className="flex flex-col items-center justify-center text-center space-y-2">
						<div className="font-semibold text-3xl text-black dark:text-white">
							<p>Email Verification</p>
						</div>
						<div className="flex flex-row text-sm font-medium text-black dark:text-white">
							<p>Enter the OTP you received at your registered email {email}</p>
						</div>
					</div>

					<div>
						<form onSubmit={handleOnSubmit}>
							<div className="flex flex-col space-y-16">
								<div className="flex justify-center ">
									<OtpInput
										value={otp}
										onChange={setOtp}
										numInputs={6}
										renderInput={(props) => (
											<input
												{...props}
												placeholder="-"
												style={{
													boxShadow:
														"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
												}}
												className="w-[48px] lg:w-[60px] border-0 bg-richblack-25 dark:bg-richblack-800 rounded-[0.5rem] text-black dark:text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
											/>
										)}
										containerStyle={{
											justifyContent: "space-between",
											gap: "0 6px",
										}}
									/>
								</div>

								<div className="flex flex-col space-y-5">
									<div>
										<button
											type="submit"
											className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-xl shadow-sm"
										>
											Verify Account
										</button>
									</div>
								</div>
							</div>
						</form>
						<div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
								<p>Didn't recieve code?</p>{" "}
								<button
									onClick={() => dispatch(sendOtp(signupData.email, navigate))}
									className="flex flex-row items-center text-blue-600"
									target="_blank"
									rel="noopener noreferrer"
								>
									Resend
								</button>
							</div>
					</div>
				</div>
			</div>
		</div>
	);
}
