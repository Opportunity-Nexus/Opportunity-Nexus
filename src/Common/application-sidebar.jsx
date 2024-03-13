import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import LogoLight from "../../src/assets/logo/opportunity-nexus-light-logo.png";
import LogoDark from "../../src/assets/logo/opportunity-nexus-dark-logo.png";

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

export default function ApplicationLayoutSidebar() {
  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 bg-white overflow-y-auto h-screen dark:bg-gray-900">
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
      </div>
    </div>
  );
}
