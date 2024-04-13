import { FaUser, FaSuitcase, FaChartBar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const userNavigation = [
  { name: "My Profile", icon: FaUser, href: "/dashboard/profile", id: 1 },
  {
    name: "Bookmarked",
    icon: FaSuitcase,
    href: "/dashboard/bookmarked",
    id: 2,
  },
  { name: "Analytics", icon: FaChartBar, href: "/dashboard/analytics", id: 3 },
  { name: "Settings", icon: IoMdSettings, href: "/dashboard/settings", id: 4 },
];

export default userNavigation;
