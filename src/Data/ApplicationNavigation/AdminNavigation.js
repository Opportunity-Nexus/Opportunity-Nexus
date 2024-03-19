import { FaUserCircle, FaRegFileAlt, FaChartPie } from 'react-icons/fa';
import {  MdDashboard } from 'react-icons/md';
import { IoMdSettings } from "react-icons/io";


const adminNavigation = [
  { name: "My Profile", icon: FaUserCircle, href: "/dashboard/", id: 1 }, 
  { name: "Opportunity Panel", icon: MdDashboard, href: "/dashboard/", id: 2 }, 
  { name: "Record", icon: FaRegFileAlt, href: "/dashboard/", id: 3 }, 
  { name: "Analytics", icon: FaChartPie, href: "/dashboard/", id: 4 }, 
  { name: "Settings", icon: IoMdSettings, href: "/dashboard/", id: 5}
];

export default adminNavigation;
