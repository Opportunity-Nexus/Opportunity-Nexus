import { Fragment, useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Theme from "../theme";
import { Link, NavLink } from "react-router-dom";
import LogoLight from "../../assets/logo/opportunity-nexus-light-logo.png";
import LogoDark from "../../assets/logo/opportunity-nexus-dark-logo.png";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import Navigation from "../../Data/Home/Navigation";
import ProfileDropdown from "../Authentication/ProfileDropDown";
import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
  } from "@heroicons/react/outline";

  const navigation = [
    { name: "Dashboard", icon: HomeIcon, href: "#", current: true },
    { name: "Team", icon: UsersIcon, href: "#", count: 3, current: false },
    { name: "Projects", icon: FolderIcon, href: "#", count: 4, current: false },
    { name: "Calendar", icon: CalendarIcon, href: "#", current: false },
    { name: "Documents", icon: InboxIcon, href: "#", count: 12, current: false },
    { name: "Reports", icon: ChartBarIcon, href: "#", current: false },
  ];
  

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export default function Header() {
  const [navbarColor, setNavbarColor] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const menuRef = useRef(null);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        setNavbarColor(true);
      } else {
        setNavbarColor(false);
      }
    });
  }
  return (
    <Popover
      className={`sticky top-0 z-[9999] border-b py-2 border-gray-200 dark:border-gray-700 ${
        navbarColor ? "backdrop-blur-md" : null
      } `}
    >
      {({ open }) => (
        <>
          <div className="relative flex justify-end items-center px-4 py-2  sm:px-6 lg:space-x-10 max-w-7xl mx-auto ">
            <div className="-mr-2 -my-2 lg:hidden flex items-center justify-end">
              <Popover.Button
                className=" rounded-md p-2 inline-flex items-center justify-end hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                ref={menuRef}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon
                  className="h-6 w-6 dark:text-gray-100 text-gray-600"
                  aria-hidden="true"
                />
              </Popover.Button>
              <div>
                      <Link
                        href="/"
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
              
            </div>
            <div className="flex-1 flex items-center justify-end">
              <div className="flex items-center mr-4">
                {token !== null ? (
                  <>
                    <ProfileDropdown />
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-400 "
                    >
                      Sign in
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 text-center"
                    >
                      Sign up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
           
              <Theme className="cursor-pointer" />
            
          </div>

          {/* mobile */}
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition lg:hidden w-fit "
            >
              <div className="divide-y-2 divide-gray-50 dark:divide-gray-800 rounded-lg  ring-1 ring-black ring-opacity-5 dark:bg-gray-950 bg-white w-full h-screen">
                <div className="px-5 pb-6 pt-5 flex flex-row items-center">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href="/"
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
                    <div className="ml-2">
                      <Popover.Button
                        className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-secondary-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-secondary-900 [&:not(:focus-visible)]:focus:outline-none"
                        aria-label="Toggle site navigation"
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon
                          className="h-6 w-6 dark:text-gray-100 text-gray-600"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 px-5 py-6">
                  <div>
                    {token !== null ? (
                      <>    <div className="mt-5 flex-grow flex flex-col">
                      <nav
                        className="flex-1 px-2 bg-white dark:bg-gray-900 space-y-1"
                        aria-label="Sidebar"
                      >
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700"
                                : "text-gray-600 hover:bg-gray-50 hover:dark:bg-gray-500 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span className="flex-1">{item.name}</span>
                          </Link>
                        ))}
                      </nav>
                    </div></>
                    ) : (
                      <>
                        <NavLink
                          onClick={() => {
                            if (open) {
                              if (menuRef.current) {
                                menuRef.current.click();
                              } else {
                                // impossible case
                              }
                            } else {
                              // do nothing
                            }
                          }}
                          to="/signup"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Sign up
                        </NavLink>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                          Existing user?{" "}
                          <NavLink
                            onClick={() => {
                              if (open) {
                                if (menuRef.current) {
                                  menuRef.current.click();
                                } else {
                                  // impossible case
                                }
                              } else {
                                // do nothing
                              }
                            }}
                            to="/login"
                            className="text-primary-600 hover:text-primary-500 text-center"
                          >
                            Sign in
                          </NavLink>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
