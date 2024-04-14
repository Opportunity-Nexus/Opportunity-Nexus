const BASE_URL = "http://localhost:4000/api/v1";
// const BASE_URL = "https://api.hostellelo.in/api/v1";
// const BASE_URL = "https://opportunity-nexus-backend.onrender.com/api/v1";

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
	SAVE_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/saveBookmarkedOpportunities",
	GET_ALL_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/getAllSavedOpportunities",
	REMOVE_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/removeBookmarkedOpportunity",
	GET_ALL_FRONTEND_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/getAllFrontendBookmarks",
	REMOVE_BOOKMARKED_OPPORTUNITY: BASE_URL + "/offCampus/removeBookmark"
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
	GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  }

//ON-CAMPUS ENDPOINTS
export const oncampusEndpoints = {
     CREATE_OPPORTUNITY: BASE_URL + "/onCampus/createopportunity",
	 EDIT_OPPORTUNITY: BASE_URL + "/onCampus/editopportunity",
	 GET_ALL_OPPORTUNITIES: BASE_URL + "/onCampus/getallopportunities",
	 GET_OPPORTUNITY_DETAILS: BASE_URL + "/onCampus/getopportunitydetails",
	 DELETE_OPPORTUNITY: BASE_URL + "/onCampus/deleteOpportunity",
	 GET_USER_OPPORTUNITY: BASE_URL + "/onCampus/getuseropportunities",  //TESTING PART 2 REMAINING : HOW TO MAKE THE STUDENT ENROLLED.
}

//ON-CAMPUS BOOKMARK OPPORTUNITY ENDPOINTS
export const onCampusBookMarkEndpoints = {
	SAVE_ONCAMPUS_BOOKMARK_OPPORTUNITY : BASE_URL + "/onCampus/saveopportunity",
	GET_ALL_ONCAMPUS_BOOKMARKED_OPPORTUNITIES : BASE_URL + "/onCampus/getAllBookmarkedOpportunities",
	DELETE__ONCAMPUS_BOOKMARK_OPPORTUNITY : BASE_URL + "/onCampus/removeBookmarkedOpportunity",
}
