import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { onCampusBookMarkEndpoints, oncampusEndpoints } from "../BackendApis";
const { CREATE_OPPORTUNITY, GET_STUDENT_ENROLLED, DELETE_OPPORTUNITY } =
  oncampusEndpoints;
const {
  SAVE_ONCAMPUS_BOOKMARK_OPPORTUNITY,
  DELETE__ONCAMPUS_BOOKMARK_OPPORTUNITY,
} = onCampusBookMarkEndpoints;

//---------------CREATE_OPPORTUNITY------------------//
export const createOpportunity = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const formattedData = {
      ...data,
      eligibilityCriteria: JSON.stringify(data.eligibilityCriteria),
      opportunityTags: JSON.stringify(data.opportunityTags),
    };
    console.log("FORMATTED DATA", formattedData);
    const response = await apiConnector(
      "POST",
      CREATE_OPPORTUNITY,
      formattedData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE OPPORTUNITY API RESPONSE...........", response);
    if (!response?.data?.success) {
      throw new Error("OPPORTUNITY COULD NOT BE CREATED");
    }
    toast.success("OPPORTUNITY CREATED SUCCESSFULLY");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE OPPORTUNITY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//---------------EDIT_OPPORTUNITY------------------//
export const editOpportunity = async (data, token) => {};

//---------------FETCH ALL ONCAMPUS OPPORTUNITY------------------//
export async function getOncampusOpportunities(params) {
  const { token } = params;

  if (token) {
    try {
      const response = await fetch(oncampusEndpoints.GET_ALL_OPPORTUNITIES, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);

        return data.data;
      } else {
        // If we get an HTTP error response
        console.error("Fetch error:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  } else {
    console.error("Token is undefined or not found");
  }
}

//---------------SAVE BOOKMARKED ONCAMPUS OPPORTUNITY------------------//
export const bookmarkOnCampusOpportunity = async ({ opportunity, token }) => {
  console.log({ opportunity });

  const toastId = toast.loading("Saving opportunity...");
  try {
    const response = await apiConnector(
      "POST",
      SAVE_ONCAMPUS_BOOKMARK_OPPORTUNITY,
      {
        opportunityId: opportunity._id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log({ response });

    if (!response.data.success) {
      toast.error("Something went wrong while saving the opportunity");
      throw new Error(
        response.data.message || "Failed to bookmark opportunity"
      );
    }
    toast.dismiss(toastId);
    toast.success("Opportunity successfully bookmarked!");
    return true;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.message || "Failed to bookmark opportunity.");
    return false;
  }
};

//---------------FETCH BOOKMARKED ONCAMPUS OPPORTUNITY------------------//
export async function getOnCampusBookmarkedOpportunities(params) {
  const { token } = params;
  console.log({ paramToken: token });

  if (token) {
    try {
      const response = await fetch(
        onCampusBookMarkEndpoints.GET_ALL_ONCAMPUS_BOOKMARKED_OPPORTUNITIES,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);

        return data.data;
      } else {
        // If we get an HTTP error response
        console.error("Fetch error:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  } else {
    console.error("Token is undefined or not found");
  }
}

//---------------REMOVE BOOKMARKED ONCAMPUS OPPORTUNITY------------------//
export async function removeBookmark({ opportunityId, token }) {
  const toastId = toast.loading("Un-bookmarking opportunity...");
  try {
    const response = await apiConnector(
      "POST",
      DELETE__ONCAMPUS_BOOKMARK_OPPORTUNITY,
      {
        opportunityId: opportunityId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      toast.error("Something went wrong while unbookmarking the opportunity");
      throw new Error(
        response.data.message || "Failed to unbookmark opportunity"
      );
    }
    toast.dismiss(toastId);
    toast.success("Opportunity Unbookmarked!");
    return true;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.message || "Failed to unbookmark opportunity.");
    return false;
  }
}

// --------------STUDENT ENROLLED ON CLICKING APPLY NOW----------------//
export async function getStudentEnrolled({ opportunity, token }) {
  const toastId = toast.loading("loading...");
  try {
    const response = await apiConnector(
      "POST",
      GET_STUDENT_ENROLLED,
      {
        opportunityId: opportunity._id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log({ response });

    if (!response.data.success) {
      toast.error("Something went wrong while applying to the opportunity");
      throw new Error(response.data.message || "Failed to apply");
    }
    toast.dismiss(toastId);
    toast.success("Applied successfully!");
    return true;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.message || "Failed to apply.");
    return false;
  }
}

export async function deleteOpportunity({ opportunity, token }) {
  const toastId = toast.loading("loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_OPPORTUNITY,
      {
        opportunityId: opportunity._id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log({ response });

    if (!response.data.success) {
      toast.error("Something went wrong while deleting the opportunity");
      throw new Error(response.data.message || "Failed to apply");
    }
    toast.dismiss(toastId);
    toast.success("Deleted successfully!");
    return true;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.message || "Failed to delete.");
    return false;
  }
}
