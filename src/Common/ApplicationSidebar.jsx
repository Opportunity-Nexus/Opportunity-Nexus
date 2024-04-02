import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import LogoLight from "../../src/assets/logo/opportunity-nexus-light-logo.png";
import LogoDark from "../../src/assets/logo/opportunity-nexus-dark-logo.png";
import { useSelector } from "react-redux";
import userNavigation from "../Data/ApplicationNavigation/UserNavigation";
import adminNavigation from "../Data/ApplicationNavigation/AdminNavigation";
import Theme from "../Components/theme";
import { IoNotificationsSharp } from "react-icons/io5";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ProfileDropdown from "../Components/Authentication/ProfileDropDown";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ApplicationLayoutSidebar() {

  const location = useLocation();
  const pathName = location.pathname;

  const [ navigationToUse, setNavigationToUse ] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeNavigation, setActiveNavigation] = useState(
    useState(() => {
      const activeTabIndex = navigationToUse.findIndex(
        (item) => item.slug === pathName.split("/").at(-1)
      );

      return activeTabIndex + 1 || 1;
    })
  );

  useEffect(() => {
    if(user.accountType === 'Admin'){
      setNavigationToUse(adminNavigation)
    }
    else{
      setNavigationToUse(userNavigation)
    }
  }, [user])


  return (
    <>
      <div className="sticky top-0 z-[9999]">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-gray-900">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link to="/" reloadDocument className="flex">
                    <span className="sr-only">Opportunity Nexus</span>

                    <img
                      className="h-12 w-auto dark:flex hidden items-center"
                      src={LogoDark}
                      alt=""
                    />
                    <img
                      className="h-12 w-auto dark:hidden  items-center"
                      src={LogoLight}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav
                    className="flex-1 px-2 bg-white dark:bg-gray-900 space-y-1"
                    aria-label="Sidebar"
                  >
                    {navigationToUse.map((item, index) => (
                      <Link
                        key={item.name}
                        reloadDocument
                        to={item.href}
                        className={classNames(
                          index + 1 === activeNavigation
                            ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:dark:bg-gray-700 hover:text-gray-900 hover:dark:text-gray-300",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        onClick={() => {
                          setActiveNavigation(() => item.id);
                          setSidebarOpen(false);
                        }}
                      >
                        <item.icon
                          className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                          aria-hidden="true"
                        />
                        <span className="flex-1">{item.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="cursor-pointer px-4">
                  {" "}
                  <Theme />
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14 " aria-hidden="true"></div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-700 pt-5 bg-white dark:bg-gray-900 overflow-y-auto">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex">
                <span className="sr-only">Opportunity Nexus</span>

                <img
                  className="h-12 w-auto dark:flex hidden items-center"
                  src={LogoDark}
                  alt=""
                />
                <img
                  className="h-12 w-auto dark:hidden  items-center"
                  src={LogoLight}
                  alt=""
                />
              </Link>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav
                className="flex-1 px-2 bg-white dark:bg-gray-900 space-y-1"
                aria-label="Sidebar"
              >
                {navigationToUse.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      index + 1 === activeNavigation
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:dark:bg-gray-800 hover:text-gray-900 hover:dark:text-gray-300",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() => setActiveNavigation(() => item.id)}
                  >
                    <item.icon
                      className={classNames("mr-3 flex-shrink-0 h-6 w-6")}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1 md:w-full">
          <div className="sticky top-0 z-10 flex-shrink-0 flex justify-end items-center h-16 bg-white  dark:bg-gray-900 shadow dark:shadow-gray-700 min-w-full">
            <button
              type="button"
              className="px-2  text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex items-center justify-center md:hidden">
              <Link
                to="/"
                aria-label="Home"
                className="h-auto w-auto select-none"
              >
                <img
                  className="h-12 w-auto sm:h-10 dark:flex hidden"
                  src={LogoDark}
                  alt=""
                />
                <img
                  className="h-12 w-auto sm:h-10 dark:hidden"
                  src={LogoLight}
                  alt=""
                />
              </Link>
            </div>
            <div className="flex-1 px-4 flex items-center justify-end md:pt-5">
              {/* <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-black  dark:text-white focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent bg-transparent text-black  dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div> */}
              <div className="ml-4 flex items-center md:ml-6 gap-3">
                <button
                  type="button"
                  className="bg-white  dark:bg-gray-900 p-1 rounded-full text-black  dark:text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span className="sr-only">View notifications</span>
                  <IoNotificationsSharp
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </button>

                <ProfileDropdown />
                <div className="cursor-pointer hidden md:flex">
                  {" "}
                  <Theme />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
