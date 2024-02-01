import Features from "../../Data/Home/About";

export default function About() {
	return (
		<section className=" dark:bg-gray-950 " id="about">
			<div className="relative pb-32 bg-gray-800">
				<div className="absolute inset-0">
					<img
						className="w-full h-full object-cover"
						src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
						alt=""
					/>
					<div
						className="absolute inset-0  bg-gray-200 dark:bg-gray-800 mix-blend-multiply"
						aria-hidden="true"
					/>
				</div>
				<div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-extrabold tracking-tight text-black dark:text-white md:text-5xl lg:text-6xl">
						Your All-in-One Solution
					</h1>
					<p className="mt-6 max-w-3xl text-xl font-semibold tracking-tighter text-black  dark:text-white">
						Think of us as your personal career assistant. You can effortlessly
						create a professional profile, manage your resume, and track your
						application progress, all within a single platform. We understand
						the challenges students face and provide a centralized solution.
					</p>
				</div>
			</div>

			{/* Overlapping cards */}
			<div
				className="-mt-32 max-w-7xl mx-auto relative z-10 pb-16 px-4 sm:px-6 lg:px-8"
				aria-labelledby="contact-heading"
			>
				<div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
					{Features.map((link) => (
						<div
							key={link.name}
							className="flex flex-col bg-white dark:bg-midnightblue rounded-2xl shadow-xl"
						>
							<div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
								<div className="absolute top-0 p-5 inline-block bg-primary-600 rounded-xl shadow-lg transform -translate-y-1/2">
									<link.icon className="h-6 w-6 " aria-hidden="true" />
								</div>
								<h3 className="text-xl font-medium text-gray-900 dark:text-gray-300">
									{link.name}
								</h3>
								<p className="mt-4 text-base tracking-tighter text-gray-500">
									{link.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
