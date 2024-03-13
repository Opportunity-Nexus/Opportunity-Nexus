
import { Link } from "react-router-dom";
import LogoLight from "../../src/assets/logo/opportunity-nexus-light-logo.png";
import LogoDark from "../../src/assets/logo/opportunity-nexus-dark-logo.png";

import { MdDashboard as HomeIcon } from 'react-icons/md';
import { FaCode as UsersIcon } from 'react-icons/fa';
import { MdWorkOutline as FolderIcon } from 'react-icons/md';
import { IoIosRocket as CalendarIcon } from 'react-icons/io';
import { MdSettings as InboxIcon } from 'react-icons/md';
import { MdSchool as ChartBarIcon } from 'react-icons/md';

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "#", current: true },
  { name: "Coding Challenges", icon: UsersIcon, href: "#", current: false },
  { name: "Projects", icon: FolderIcon, href: "#", current: false },
  { name: "Opportunities", icon: CalendarIcon, href: "#", current: false },
  { name: "Settings", icon: InboxIcon, href: "#", current: false },
  { name: "Scholarships", icon: ChartBarIcon, href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ApplicationLayoutSidebar() {
  return (
    <div className="flex-grow border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 bg-white h-screen dark:bg-gray-900 hidden md:flex md:flex-col md:fixed md:inset-y-0">
      <div className="flex items-center flex-shrink-0 px-4">
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
      <div className="mt-5 flex-grow flex flex-col">
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
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:dark:bg-gray-500 hover:text-gray-900 hover:dark:text-gray-300",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
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
  );
}
