import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
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
  const pathName = window.location.pathname;

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
          className="absolute px-4 top-15 mt-2 right-0 z-[9999] overflow-hidden rounded-md  border-richblack-700 dark:border-gray-700 bg-white dark:bg-gray-800 origin-top-right  w-fit shadow-lg  py-1 focus:outline-none  text-gray-900  dark:text-gray-300"
          ref={ref}
        >
          <div className="flex flex-col justify-between items-center my-2 gap-x-3 ">
            <div className="flex flex-col items-start">
              <p className="text-gray-900 dark:text-white font-semibold">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-gray-900 dark:text-white font-semibold">{`${user.email} `}</p>
            </div>
          </div>
          <hr className="border-px dark:border-gray-700" />
          {!(pathName === "/dashboard" || pathName === "/dashboard/")? (
            <Link to="/dashboard"  onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 my-2  p-2 text-sm transition-all font-medium   rounded-md dark:hover:bg-richblack-900 hover:bg-gray-50 hover:dark:bg-gray-500">
              Dashboard   
              </div>
            </Link>
          ) : (
            <Link to="/"  onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 my-2  p-2 text-sm transition-all font-medium   rounded-md dark:hover:bg-richblack-900 hover:bg-gray-50 hover:dark:bg-gray-500">
                Home
              </div>
            </Link>
          )}
          <Link to="/dashboard/settings" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 my-2  p-2 text-sm transition-all font-medium   rounded-md dark:hover:bg-richblack-900 hover:bg-gray-50 hover:dark:bg-gray-500">
              Settings
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center  gap-x-1 my-2 p-2 text-sm font-medium transition-all rounded-md  dark:hover:bg-richblack-900 hover:bg-gray-50 hover:dark:bg-gray-500 "
          >
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
