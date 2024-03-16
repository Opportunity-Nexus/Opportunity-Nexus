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
      className={`sticky top-0 z-[9999] ${
        navbarColor ? "backdrop-blur-md" : null
      } `}
    >
      {({ open }) => (
        <>
          <div className="relative flex justify-between items-center px-4 py-2  sm:px-6 lg:justify-start lg:space-x-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="lg:hidden">
                {" "}
                <Popover.Button
                  className=" rounded-md p-2 inline-flex items-center justify-center hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  ref={menuRef}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon
                    className="h-6 w-6 dark:text-gray-100 text-gray-600"
                    aria-hidden="true"
                  />
                </Popover.Button>
              </div>

              <div>
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
            </div>

            <div className="-mr-2 -my-2 lg:hidden flex items-center">
              <div className="flex items-center ml-3">
                {token !== null ? (
                  <>
                    <ProfileDropdown />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="ml-3 cursor-pointer">
                <Theme />
              </div>
            </div>
            <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
              <Popover.Group as="nav" className="flex space-x-10">
                {Navigation.main.map((item) => (
                  <div key={item.name}>
                    {item.name === "Opportunities" ? (
                      <div className="group relative flex ">
                        <div className="flex items-center gap-1">
                          <span className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400">
                            {item.name}
                          </span>
                          <IoIosArrowDropdownCircle className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-400 " />
                        </div>
                        <div className="invisible absolute left-1/2 -translate-x-32 translate-y-7 top-1/2 flex flex-col rounded-md dark:bg-midnightblue bg-gray-100 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-72">
                          <div className="absolute left-1/2 top-0 h-6 w-6 rotate-45 rounded dark:bg-midnightblue bg-gray-100 -translate-y-2 translate-x-5"></div>
                          <ul className="py-1 text-base font-semibold dark:text-black flex flex-col items-start">
                            {item.opportunities.map((opportunity, subIndex) => (
                              <NavLink
                                key={subIndex}
                                to={`/opportunities/${opportunity.value}`}
                                className="block md:mt-0 px-4 py-2 text-black dark:text-white hover:text-slate-900  rounded-md hover:bg-white dark:hover:bg-richblack-900 dark:hover:text-white cursor-pointer w-full"
                              >
                                {opportunity.name}
                              </NavLink>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}
              </Popover.Group>
              <div className="flex items-center md:ml-12">
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
            <div className="hidden lg:flex cursor-pointer">
              <Theme />
            </div>
          </div>

          {/* mobile */}
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition lg:hidden"
            >
              <div className="divide-y-2 divide-gray-50 dark:divide-gray-800 rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-950 bg-white">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <a
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
                      </a>
                    </div>
                    <div className="-mr-2">
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
                  <div className="space-y-4 text-center flex flex-col ">
                    {Navigation.main.map((item) => (
                      <div key={item.name}>
                        {item.name === "Opportunities" ? (
                          <div className="group relative flex ">
                            <div className="flex items-center gap-1 mx-auto">
                              <span className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400">
                                {item.name}
                              </span>
                              <IoIosArrowDropdownCircle className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-400 " />
                            </div>
                            <div className="invisible absolute left-1/2 -translate-x-32 translate-y-7 top-1/2 flex flex-col rounded-md dark:bg-midnightblue bg-gray-100 p-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-72">
                              <div className="absolute left-1/2 top-0 h-6 w-6 rotate-45 rounded dark:bg-midnightblue bg-gray-100 -translate-y-2 translate-x-5"></div>
                              <ul className="py-1 text-base font-semibold dark:text-black flex flex-col items-start ">
                                {item.opportunities.map(
                                  (opportunity, subIndex) => (
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
                                      key={subIndex}
                                      to={`/opportunities/${opportunity.value}`}
                                      className=" md:mt-0 px-4 py-2 text-black dark:text-white hover:text-slate-900  rounded-md hover:bg-white dark:hover:bg-richblack-900 dark:hover:text-white cursor-pointer min-w-full flex items-start "
                                    >
                                      {opportunity.name}
                                    </NavLink>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <a
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
                            href={item.href}
                            className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-gray-400"
                          >
                            {item.name}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    {token !== null ? (
                      <></>
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
