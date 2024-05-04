// const BASE_URL = "http://localhost:4000/api/v1";
// const BASE_URL = "https://api.hostellelo.in/api/v1";
const BASE_URL = "https://opportunity-nexus-backend.onrender.com/api/v1";

// AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

//OFF-CAMPUS ENDPOINTS
export const offCampusEndpoints = {
  SAVE_BOOKMARK_OPPORTUNITY:
    BASE_URL + "/offCampus/saveBookmarkedOpportunities",
  GET_ALL_BOOKMARK_OPPORTUNITY:
    BASE_URL + "/offCampus/getAllSavedOpportunities",
  GET_ALL_FRONTEND_BOOKMARK_OPPORTUNITY:
    BASE_URL + "/offCampus/getAllFrontendBookmarks",
  REMOVE_BOOKMARKED_OPPORTUNITY: BASE_URL + "/offCampus/removeBookmark",
};

//PROFILE-SETTINGS ENDPOINTS
export const profileSettingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  R_COMPLETE_DETAILS_API: BASE_URL + "/profile//getusercompletedetails",
};

//ON-CAMPUS ENDPOINTS
export const oncampusEndpoints = {
  CREATE_OPPORTUNITY: BASE_URL + "/onCampus/createopportunity",
  EDIT_OPPORTUNITY: BASE_URL + "/onCampus/editopportunity",
  GET_ALL_OPPORTUNITIES: BASE_URL + "/onCampus/getallopportunities",
  GET_OPPORTUNITY_DETAILS: BASE_URL + "/onCampus/getopportunitydetails",
  DELETE_OPPORTUNITY: BASE_URL + "/onCampus/deleteOpportunity",
  GET_USER_OPPORTUNITY: BASE_URL + "/onCampus/getuseropportunities",
  GET_STUDENT_ENROLLED: BASE_URL + "/onCampus/getstudentenrolled",
  GET_OPPORTUNITY_ENROLLMENTS: BASE_URL + "/onCampus/getstudentenrollments",
};

//ON-CAMPUS BOOKMARK OPPORTUNITY ENDPOINTS
export const onCampusBookMarkEndpoints = {
  SAVE_ONCAMPUS_BOOKMARK_OPPORTUNITY: BASE_URL + "/onCampus/saveopportunity",
  GET_ALL_ONCAMPUS_BOOKMARKED_OPPORTUNITIES:
    BASE_URL + "/onCampus/getAllBookmarkedOpportunities",
  DELETE__ONCAMPUS_BOOKMARK_OPPORTUNITY:
    BASE_URL + "/onCampus/removeBookmarkedOpportunity",
};

//CAREER-PARTICULARS
export const careerParticulars = {
  //--------EDUCATION--------//
  CREATE_EDUCATION_DETAILS:
    BASE_URL + "/careerParticulars/create-education-details",
  UPDATE_EDUCATION_DETAILS:
    BASE_URL + "/careerParticulars/update-education-details",
  //--------INTERNSHIP--------//
  CREATE_INTERNSHIP_DETAILS:
    BASE_URL + "/careerParticulars/create-internships-details",
  UPDATE_INTERNSHIP_DETAILS:
    BASE_URL + "/careerParticulars/update-internships-details",
  //--------PROJECTS--------//
  CREATE_PROJECT_DETAILS:
    BASE_URL + "/careerParticulars/create-project-details",
  UPDATE_PROJECT_DETAILS:
    BASE_URL + "/careerParticulars/update-project-details",
  //-------SOCIALS----------//
  UPDATE_SOCIAL_DETAILS: BASE_URL + "/careerParticulars/update-socials-details",
  UPDATE_CAREER_PARTICULARS:
    BASE_URL + "/careerParticulars/updatecareerparticulars",
};
