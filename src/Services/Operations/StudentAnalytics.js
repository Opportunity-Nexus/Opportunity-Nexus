import toast from "react-hot-toast";
import { studentAnalyticsEndpoints } from "../BackendApis";
import { apiConnector } from "../ApiConnector";

const { OFFCAMPUS_BOOKMARK_API } = studentAnalyticsEndpoints;

export const offcampusBookmarkAnalytics = async (
	token,
	setOffcampusData
) => {
	// const toastId = toast.loading("Loading...");
	try {
		const response = await apiConnector(
			"GET",
			OFFCAMPUS_BOOKMARK_API,
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("FETCH_STUDENT_BOOKMARK_ANALYTICS_API RESPONSE:", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		// toast.success("DATA FETCHED!!");
		setOffcampusData(response.data.data);
	} catch (error) {
		console.log("Could not fetch the analytics data", error);
	}
	// toast.dismiss(toastId);
};