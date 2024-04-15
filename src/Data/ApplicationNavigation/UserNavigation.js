import { FaUser, FaSuitcase, FaChartBar, FaBookmark } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const userNavigation = [
  { name: "My Profile", icon: FaUser, href: "/dashboard/my-profile", id: 1 },
  {
    name: "Bookmarked",
    icon: FaBookmark,
    href: "/dashboard/bookmarked",
    id: 2,
  },
  {
    name: "My Opportunities",
    icon: FaSuitcase,
    href: "/dashboard/my-opportunities",
    id: 3,
  },
  { name: "Analytics", icon: FaChartBar, href: "/dashboard/analytics", id: 4 },
  {
    name: "Settings",
    icon: IoMdSettings,
    href: "/dashboard/my-settings",
    id: 5,
  },
];

export default userNavigation;
