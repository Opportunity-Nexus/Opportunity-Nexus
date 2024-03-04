import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import InputOtp from "../../Pages/Authentication/InputOtp";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../Services/Operations/AuthenticationApi";
import { setSignupData } from "../../Redux/Slices/AuthSlice";
import {Link} from 'react-router-dom';

const SignupForm = () => {
	const dispatch = useDispatch();
	const accountType = "Student";
	const [enrollmentNumber, setEnrollmentNumber] = useState("");
	const [showOTPModel, setShowOTPModel] = useState(false);
	const handleOnClose = () => {
		setShowOTPModel(false);
	};

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		enrollmentNumber: "",
	});
	console.log(formData);
	function changeHandler(event) {
		const { name, value } = event.target;
		if (name === "enrollmentNumber") {
			setEnrollmentNumber(value);
		}
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false,
	});

	const handleClick = (buttonName) => {
		setShowPassword({
			...showPassword,
			[buttonName]: !showPassword[buttonName],
		});
	};

	function submitHandler(event) {
		event.preventDefault();
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (!emailRegex.test(formData.email)) {
			toast.error("Please enter a valid email address");
			return;
		}
		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		if (!/^BU\d{12}$/.test(enrollmentNumber)) {
			toast.error("Please enter a valid enrollment number");
			return;
		}
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}
		const accountData = {
			...formData,
		};
		const signupData = {
			...accountData,
			accountType,
		};
		// To be used after otp verification
		dispatch(setSignupData(signupData));
		dispatch(sendOtp(formData.email, setShowOTPModel));
		console.log("Printing Final Account Data...");
		console.log("Total SignUp Data:", JSON.stringify(signupData));
	}
	return (
		<div className="mt-0">
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
							type={showPassword.password ? "text" : "password"}
							name="password"
							id="password"
							onChange={changeHandler}
							value={formData.password}
							placeholder="Enter Password"
						/>

						<span
							className=" absolute top-[38px] right-3  cursor-pointer"
							onClick={() => handleClick("password")}
						>
							{showPassword.password ? (
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
						value={formData.enrollmentNumber}
						onChange={changeHandler}
						name="enrollmentNumber"
					/>
				</label>
				<button className=" bg-primary-600 hover:bg-primary-700 text-white  font-semibold px-[12px] rounded-[8px] py-[8px] mt-2">
					Create Account
				</button>
				<p className="text-sm font-light text-black dark:text-white">
					Already have an account?{" "}
					<Link
						to="/login"
						className="font-medium text-primary-600 hover:underline dark:text-primary-500"
					>
						Login here
					</Link>
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
