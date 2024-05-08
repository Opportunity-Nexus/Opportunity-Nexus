import { setUser } from "../../Redux/Slices/ProfileSlice";
import { apiConnector } from "../ApiConnector";
import { profileSettingsEndpoints } from "../BackendApis";
import { toast } from "react-hot-toast";
import { careerParticulars } from "../BackendApis";
import { logout } from "./AuthenticationApi";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = profileSettingsEndpoints;
const { CREATE_INTERNSHIP_DETAILS, UPDATE_INTERNSHIP_DETAILS } =
  careerParticulars;
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR: ", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE ", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      );
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR......", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CHANGE_PASSWORD_API API ERROR.........", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password updated successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API ERROR.....", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}
export const createInternshipDetails = async (data, token) => {
  console.log("here is the data", data);
  console.log("here is the token", token);
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CREATE_INTERNSHIP_DETAILS,
      data,
      { Authorization: `Bearer ${token}` }
    );
    console.log("Created Internship data :", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Created Internship data");
    result = response?.data?.success;
  } catch (error) {
    console.log("CREATE_INTERNSHIP_DETAILS API ERROR", error);
    toast.error("Could not save this information");
  }
  toast.dismiss(toastId);
  return result;
};

export const updateInternshipDetails = async (token, data) => {
  console.log(token);
  console.log(data);

  const toastId = toast.loading("...Loading");

  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_INTERNSHIP_DETAILS,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Updated Internship Details", response);
    if (!response.success) {
      throw new Error(response.message);
    }
    toast.success("Updated Internship Details");
    result = response?.data?.success;
  } catch (error) {
    console.log("UPDATE_INTERNSHIP_DETAILS API ERROR", error);
    toast.error("Could not update this information");
  }
  toast.dismiss(toastId);
  return result;
};
