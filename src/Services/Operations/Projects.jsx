import { careerParticulars } from "../BackendApis";
import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
const {
  CREATE_PROJECT_DETAILS,
  // UPDATE_PROJECT_DETAILS
} = careerParticulars;
export const createProjectDetails = async (token, data) => {
  console.log("Sending data:", data);
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_PROJECT_DETAILS, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Created Project Details data", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success("Project details saved successfully");
    result = response?.data?.success;
  } catch (error) {
    console.log(" CREATE_PROJECT_DETAILS API ERROR", error.message);
    toast.error("Could not save this information");
  }
  toast.dismiss(toastId);
  return result;
};
