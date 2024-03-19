
import { FaUser, FaSuitcase, FaChartBar } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";



const userNavigation = [
  { name: "My Profile", icon: FaUser, href: "/dashboard/#myprofile", id: 1 }, 
  { name: "My Opportunities", icon: FaSuitcase, href: "/dashboard/#myopportunities", id: 2 }, 
  { name: "Analytics", icon: FaChartBar, href: "/dashboard/#analytics", id: 3 },
  { name: "Settings", icon: IoMdSettings, href: "/dashboard/", id: 4}
];

export default userNavigation;
