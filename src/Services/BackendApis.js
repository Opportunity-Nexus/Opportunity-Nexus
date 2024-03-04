const BASE_URL = "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const authEndpoints = {
	SENDOTP_API: BASE_URL + "/auth/sendotp",
	SIGNUP_API: BASE_URL + "/auth/signup",
	LOGIN_API: BASE_URL + "/auth/login",
	RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
	RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};
