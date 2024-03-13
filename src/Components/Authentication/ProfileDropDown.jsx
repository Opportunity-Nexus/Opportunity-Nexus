import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { VscQuestion } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../Hooks/OutsideClick";
import { logout } from "../../Services/Operations/AuthenticationApi";

export default function ProfileDropdown() {
	const { user } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	useOnClickOutside(ref, () => setOpen(false));
	if (!user) return null;
	return (
		<button className="relative" onClick={() => setOpen(true)}>
			<div className="flex items-center gap-x-1">
				<img
					src={user?.image}
					alt={`profile-${user?.firstName}`}
					className="aspect-square w-8 rounded-full object-cover"
				/>
				<AiOutlineCaretDown className="text-sm text-richblack-100" />
			</div>
			{open && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="absolute px-9 top-15 mt-2 -right-20 z-[9999] divide-y-[1px] dark:divide-richblack-700 overflow-hidden rounded-md  border-richblack-700 bg-gray-100 dark:bg-midnightblue"
					ref={ref}
				>
					<div className="flex flex-row justify-between items-center my-2 gap-x-3 ">
						<img
							src={user?.image}
							alt={`profile-${user?.firstName}`}
							className="aspect-square w-[30px] rounded-full object-cover"
						/>
						<div className="flex flex-col items-start">
							<p className="text-black dark:text-white font-semibold font-mono">{`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}</p>
							<p className="text-black dark:text-white font-semibold">{`${user.email} `}</p>
						</div>
					</div>
					<hr className="border-2 mt-4 " />
					
					<Link to="/dashboard/settings" onClick={() => setOpen(false)}>
						<div className="flex w-full items-center gap-x-1 my-2  py-3 px-8 text-sm transition-all text-black dark:text-white hover:text-slate-900  rounded-md hover:bg-white dark:hover:bg-richblack-900 dark:hover:text-white">
							<VscQuestion className="text-lg" />
							Settings
						</div>
					</Link>
					<div
						onClick={() => {
							dispatch(logout(navigate));
							setOpen(false);
						}}
						className="flex w-full items-center  gap-x-1 my-2  py-3 px-8 text-sm transition-all dark:text-white hover:text-slate-900  rounded-md hover:bg-white dark:hover:bg-richblack-900 dark:hover:text-white"
					>
						<VscSignOut className="text-lg" />
						Logout
					</div>
				</div>
			)}
		</button>
	);
}
