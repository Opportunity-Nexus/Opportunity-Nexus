export default function ActionBtn({
	text,
	onclick,
	children,
	disabled,
	outline = false,
	customClasses,
	type,
}) {
	return (
		<button
			disabled={disabled}
			onClick={onclick}
			className={`flex justify-center items-center text-xs sm:text-base  ${
				outline
					? "border border-primary-500 bg-transparent"
					: "px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-700 hover:bg-primary-600"
			} cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
			type={type}
		>
			{children ? (
				<>
					<span className={` ${outline && "text-white"}`}>
						{text}
					</span>
					{children}
				</>
			) : (
				text
			)}
		</button>
	);
}
