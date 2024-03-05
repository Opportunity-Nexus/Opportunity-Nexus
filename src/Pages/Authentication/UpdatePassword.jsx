import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
import { resetPassword } from "../../Services/Operations/AuthenticationApi";
import { BiArrowBack } from "react-icons/bi";

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
		<>
			<div className="px-4 sm:px-6 max-w-7xl mx-auto text-black dark:text-white">
				{loading ? (
					<div className="loader"></div>
				) : (
					<div>
						{!passwordResetDone ? (
							<>
								<h1>Choose new password</h1>
								<p>Almost done. Enter your new password and you're all set.</p>
								<form onSubmit={handleOnSubmit}>
									<label className="relative">
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
											className="border dark:border-none rounded-md text-richblack-5 w-full p-3 bg-gray-50 dark:bg-richblack-800"
											style={{
												boxShadow:
													"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
											}}
										/>
										<span
											className="absolute right-3 top-[30px] cursor-pointer"
											onClick={() => setShowPassword((prev) => !prev)}
										>
											{showPassword ? (
												<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
											) : (
												<AiOutlineEye fontSize={24} fill="#AFB2BF" />
											)}
										</span>
									</label>
									<label className="relative">
										<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] mt-4">
											Confirm New Password<sup className="text-pink-200">*</sup>
										</p>
										<input
											required
											type={showConfirmPassword ? "text" : "password"}
											name="confirmPassword"
											value={formData.confirmPassword}
											onChange={handleOnChange}
											placeholder="Confirm Password"
											className="border dark:border-none rounded-md text-richblack-5 w-full p-3 bg-gray-50 dark:bg-richblack-800"
											style={{
												boxShadow:
													"inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
											}}
										/>
										<span
											className="absolute right-3 top-[30px] cursor-pointer"
											onClick={() => setShowConfirmPassword((prev) => !prev)}
										>
											{showConfirmPassword ? (
												<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
											) : (
												<AiOutlineEye fontSize={24} fill="#AFB2BF" />
											)}
										</span>
									</label>
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
							</>
						) : (
							<div className="mt-6 text-center text-gray-700 dark:text-gray-300">
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
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default UpdatePassword;
