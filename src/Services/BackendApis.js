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
	SAVE_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/saveBookmarkedOpportunities",
	GET_ALL_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/getAllSavedOpportunities",
	REMOVE_BOOKMARK_OPPORTUNITY: BASE_URL + "/offCampus/removeBookmarkedOpportunity"
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