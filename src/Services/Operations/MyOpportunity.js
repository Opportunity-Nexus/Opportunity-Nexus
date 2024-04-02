import { offCampusEndpoints } from "../BackendApis";

export async function getSavedOpportunities(params) {
  const { token } = params;

  if (token) {
    try {
      const response = await fetch(
        offCampusEndpoints.GET_ALL_BOOKMARK_OPPORTUNITY,
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
