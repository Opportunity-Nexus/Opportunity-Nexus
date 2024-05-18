import React from "react";
import UserIcon from "../../../assets/profile-section/user.svg";
import EmailIcon from "../../../assets/profile-section/email.svg";
import LayerIcon from "../../../assets/profile-section/layers.svg";
import GoogleIcon from "../../../assets/profile-section/smallGoogleIcon.svg";
import InstagramIcon from "../../../assets/profile-section/instagramIcon.svg";
import FacebookIcon from "../../../assets/profile-section/smallFacebookIcon.svg";
import LinkedinIcon from "../../../assets/profile-section/linkedinIcon.svg";
import YoutubeIcon from "../../../assets/profile-section/youtubeIcon.svg";
// import SaveIcon from '../../../assets/profile-section/saveIcon.svg'

const ProfileSection = ({ userData }) => {
  const socialMediaList = [
    GoogleIcon,
    InstagramIcon,
    FacebookIcon,
    LinkedinIcon,
    YoutubeIcon,
  ];

  return (
    <>
      <div className="profile-card flex flex-col dark:border-gray-800 border border-solid rounded-2xl">
        <div className="relative rounded-t-2xl w-full h-[180px] gradient dark:dark-gradient"></div>

        <div className="profile-info flex flex-col md:flex-row lg:gap-24">
          <div className="DP relative -inset-y-[105px] left-[17%] md:inset-x-4 w-fit">
            <img
              src={userData?.image}
              alt={`profile-${userData?.firstName}`}
              className="aspect-square w-[200px] rounded-full flex "
            />
          </div>
          <div className="profile-details flex flex-col items-between mt-[-80px] md:mt-5 lg:mr-5 mx-auto lg:ml-0  divide-y dark:divide-gray-800 space gap-7 px-4 lg:px-0 lg:mx-none">
            <div className="flex flex-col flex-wrap gap-5">
              <div className="flex flex-col">
                <div className="name flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-primary-500">
                    {userData?.firstName + " " + userData?.lastName}{" "}
                  </h2>
                </div>
                <span className="flex items-center text-base font-normal dark:text-gray-700 text-gray-400">
                  <img className=" w-auto mx-1" src={UserIcon} alt="" />
                  <p className="text-base font-medium dark:text-gray-700 text-gray-400">
                    {userData?.accountType}
                  </p>
                </span>
                <span className="flex items-center text-base font-normal dark:text-gray-700 text-gray-400">
                  <img className=" w-auto mx-1" src={EmailIcon} alt="" />
                  <p>{userData?.email}</p>
                </span>
                <span className="flex items-center text-base font-normal dark:text-gray-700 text-gray-400">
                  <img className=" w-auto mx-1" src={LayerIcon} alt="" />
                  <p>{userData?.enrollmentNumber}</p>
                </span>
              </div>
            </div>
            <div className="socials-bttn flex items-center justify-between gap-8  mt-3">
              <div className="socials flex my-5 gap-3 ">
                {socialMediaList.map((socialAccOption, index) => (
                  <img
                    className="socialaccount-option p-2 border border-solid dark:border-gray-800 rounded-lg cursor-pointer h-10 w-10"
                    key={index}
                    src={socialAccOption}
                    alt=""
                  />
                ))}
              </div>
              <span className="flex gap-4">
									<a href="https://resume-builder-rouge-ten.vercel.app/" className="bg-primary-500 text-sm text-white font-semibold rounded-md py-2 px-4">
										Resume Builder
									</a>
								</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
