import { careerParticulars } from "../BackendApis";
import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
const { UPDATE_SOCIAL_DETAILS } = careerParticulars;
export const updateCareerParticular = async (data, token) => {
  console.log(data);
  console.log(token);
  const toastId = toast.loading("Loading....");
  let result = null;
  try {
    const response = await apiConnector("PUT", UPDATE_SOCIAL_DETAILS, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Created SocialLink data ", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Career Particular Created Successfully ");
    result = response?.data?.success;
  } catch (error) {
    console.log("UPDATE_SOCIAL_DETAILS API ERROR", error);
    toast.error("Could not save this information");
  }

  toast.dismiss(toastId);
  return result;
};
