import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { authEndpoints } from "../BackendApis";
import { setLoading, setToken } from "../../Redux/Slices/AuthSlice";
import { setUser } from "../../Redux/Slices/ProfileSlice";

const {
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
} = authEndpoints;

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      console.log(`RESET PASSWORD TOKEN RESPONSE :  ${response}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("RESET EMAIL SENT !");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR.");
      toast.error("Failed to send an email for resetting password!");
    }
    dispatch(setLoading(false));
  };
}
export function resetPassword(
  password,
  confirmPassword,
  token,
  setPasswordResetDone
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log(`RESET PASSWORD RESPONSE : ${response}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully!");
      setPasswordResetDone(true);
    } catch (error) {
      console.log("RESET PASSWORD ERROR.", error);
      toast.error("Failed to reset the password!");
    }
    dispatch(setLoading(false));
  };
}

export function sendOtp(email, setShowOTPModel) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);
      console.log(response.data.success);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
      setShowOTPModel(true);
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  enrollmentNumber,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log(otp);
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        enrollmentNumber,
        otp,
      });
      console.log("SIGNUP API RESPONSE :", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR :", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
export function login(email, password, navigate,sourcePage) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading...");
		dispatch(setLoading(true));
		try {
			const response = await apiConnector("POST", LOGIN_API, {
				email,
				password,
			});
			console.log("LOGIN API RESPONSE :", response);
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("Login Successful");
			dispatch(setToken(response.data.token));
			console.log(response.data.user.firstName);
			console.log(response.data.user.lastName);
			const userImage = response.data?.user?.image
				? response.data.user.image
				: `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
			console.log('Rseponse of user',response.data.user);	
			dispatch(setUser({ ...response.data.user, image: userImage }));
			localStorage.setItem("token", JSON.stringify(response.data.token));
			localStorage.setItem("user", JSON.stringify(response.data.user));
			if (sourcePage && sourcePage !== "") {
				navigate(`/${sourcePage}`);
			  } else {
				navigate("/dashboard/my-profile");
			  }
		} catch (error) {
			console.log("LOGIN API ERROR:", error);
			toast.error("Login Failed");
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}
