import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsetCompleteDetails } from "../../Services/Operations/SettingAPI";
import HeaderSection from "../../Components/Dashboard/MyProfile/HeaderSection";
import ProfileSection from "../../Components/Dashboard/MyProfile/ProfileSection";
import AboutSection from "../../Components/Dashboard/MyProfile/AboutSection";
import WorkExperience from "../../Components/Dashboard/MyProfile/WorkExperience";
import Education from "../../Components/Dashboard/MyProfile/Education";
import Internship from "../../Components/Dashboard/MyProfile/Internship";
import Project from "../../Components/Dashboard/MyProfile/Project";
export default function MyProfile() {
  const { token } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(null);
  const completeUserDetails = async () => {
    try {
      console.log("showing....", userData);
      const result = await getUsetCompleteDetails(token);
      console.log("showing....", result);
      console.log("showing....", userData);
      if (result) {
        setUserData(result);
        console.log("hello", result);
        console.log(
          "socialll........",
          userData?.careerParticulars?.socialLinks
        );
      }
    } catch (error) {
      console.log(`Error While fetching the data: ${error}`);
    }
  };
  useEffect(() => {
    setLoading(true);
    completeUserDetails();
    setLoading(false);
  }, []);
  return (
    <div className=" bg-white dark:bg-gray-900">
      <div className="flex flex-col mx-auto max-w-5xl min-h-screen p-1 md:p-4">
        <HeaderSection />
        <ProfileSection userData={userData} />
        <AboutSection userData={userData} />
        <WorkExperience userData={userData} />
        <Education userData={userData} />
        <Project userData={userData} />
        <Internship userData={userData} />
      </div>
    </div>
  );
}
