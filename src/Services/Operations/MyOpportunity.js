import toast from "react-hot-toast";
import { offCampusEndpoints } from "../BackendApis";
import { apiConnector } from "../ApiConnector";

const { SAVE_BOOKMARK_OPPORTUNITY, REMOVE_BOOKMARKED_OPPORTUNITY } =
	offCampusEndpoints;

export const saveBookmarkedOpportunity = async (
	opportunity,
	opportunityName,
	token
) => {
	const bookmarkedData = {
		name: opportunity.name,
		endDate: opportunity.endDate,
		applicationUrl: opportunity.applicationUrl,
		description: opportunity.description,
		frontendId: opportunity.frontendId,
		opportunityType: opportunityName,
	};
	let result = null;
	const toastId = toast.loading("Loading...");
	try {
		console.log("BEFORE POST", bookmarkedData);
		const response = await apiConnector(
			"POST",
			SAVE_BOOKMARK_OPPORTUNITY,
			bookmarkedData,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("SAVE_BOOKMARRK_API_RESPONSE", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		result = response?.data?.success;
	} catch (error) {
		console.log("SAVE_BOOKMARK_OPPORTUNITY ERROR:", error);
		toast.error(error.response.data.message);
	}
	toast.dismiss(toastId);
	return result;
};

export const fetchBookmarkedOpportunities = async (
	token,
	setBookmarkedOpportunities
) => {
	const toastId = toast.loading("Loading...");
	try {
		const response = await apiConnector(
			"GET",
			offCampusEndpoints.GET_ALL_FRONTEND_BOOKMARK_OPPORTUNITY,
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("FETCH_ALL_FRONTEND_BOOKMARK_API RESPONSE:", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		// toast.success("YOUR BOOKMARKS AT YOUR PLACE !!");
		setBookmarkedOpportunities(response.data.data);
	} catch (error) {
		console.log("Could not fetch the bookmarked list.", error);
	}
	toast.dismiss(toastId);
};

export const removeBookmarkedOpportunity = async (frontendId, token) => {
	const toastId = toast.loading("Loading...");
	let result = null;
	try {
		console.log("DATA RECIEVED BEFORE UN-BOOKMARK", frontendId, token);
		const response = await apiConnector(
			"DELETE",
			REMOVE_BOOKMARKED_OPPORTUNITY,
			{ frontendId },
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("DELETE_BOOKMARK_OPPORTUNITY:", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		result = response.data.success;
	} catch (error) {
		console.log("Could not unbookmark opportunity", error);
	}
	toast.dismiss(toastId);
	return result;
};

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
export async function deleteOpportunity(params) {
	try {
		const response = await fetch(
			`${offCampusEndpoints.REMOVE_BOOKMARK_OPPORTUNITY}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${params.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					opportunityId: params.opportunityId,
				}),
			}
		);

		if (response.ok) {
			console.log("Opportunity deleted successfully");
		} else {
			console.error("Failed to delete the opportunity");
		}
	} catch (error) {
		console.error("Error deleting opportunity:", error);
	}
}
