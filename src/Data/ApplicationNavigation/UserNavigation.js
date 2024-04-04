import { FaUser, FaSuitcase, FaChartBar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const userNavigation = [
  { name: "My Profile", icon: FaUser, href: "/dashboard/profile", id: 1 },
  {
    name: "My Opportunities",
    icon: FaSuitcase,
    href: "/dashboard/my-opportunities",
    id: 2,
  },
  { name: "Analytics", icon: FaChartBar, href: "/dashboard/analytics", id: 3 },
  { name: "Settings", icon: IoMdSettings, href: "/dashboard/settings", id: 4 },
];

export default userNavigation;
