import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { careerParticulars } from "../BackendApis";
const {
  CREATE_EDUCATION_DETAILS,
  // UPDATE_EDUCATION_DETAILS
} = careerParticulars;

export const createEducatoinDetails = async (data, token) => {
  console.log(data);
  console.log(token);
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      CREATE_EDUCATION_DETAILS,
      data,
      { Authorization: `Bearer ${token}` }
    );
    console.log("Created Internship data :", response);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    toast.success("Created Education data");
    result = response?.data?.success;
  } catch (error) {
    console.log(" CREATE_EDUCATION_DETAILS API ERROR", error);
    toast.error("Could not save this information");
  }
  toast.dismiss(toastId);
  return result;
};
