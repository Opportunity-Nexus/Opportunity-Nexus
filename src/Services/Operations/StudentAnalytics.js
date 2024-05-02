// import toast from "react-hot-toast";
import { studentAnalyticsEndpoints } from "../BackendApis";
import { apiConnector } from "../ApiConnector";

const { OFFCAMPUS_BOOKMARK_API ,ONCAMPUS_AVAILABILITY_API,ONCAMPUS_BOOKMARK_API,ONCAMPUS_APPLIED_API } = studentAnalyticsEndpoints;

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
		setOffcampusData(response.data.data);
	} catch (error) {
		console.log("Could not fetch the analytics data", error);
	}
};

export const onCampusOpportunityAnalytics = async (
	token,setOnCampusOppData
) => {
	try {
		const response = await apiConnector(
			"GET",
			ONCAMPUS_AVAILABILITY_API,
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("FETCH_STUDENT_ONCAMPUS_ANALYTICS_API RESPONSE:", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		setOnCampusOppData(response.data.data);
	} catch (error) {
		console.log("Could not fetch the analytics data", error);
	}
};
export const onCampusBookmarkedAnalytics = async (
	token,setOnCampusOppData
) => {
	try {
		const response = await apiConnector(
			"GET",
			ONCAMPUS_BOOKMARK_API,
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("FETCH_STUDENT_ONCAMPUS_ANALYTICS_API RESPONSE:", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		setOnCampusOppData(response.data.data);
	} catch (error) {
		console.log("Could not fetch the analytics data", error);
	}
};
export const onCampusAppliedAnalytics = async (
	token,setOnCampusOppAppliedData
) => {
	try {
		const response = await apiConnector(
			"GET",
			ONCAMPUS_APPLIED_API,
			null,
			{
				Authorization: `Bearer ${token}`,
			}
		);
		console.log("FETCH_STUDENT_ONCAMPUS_ANALYTICS_API RESPONSE:", response);
		if (!response.data.success) {
			throw new Error(response.data.message);
		}
		setOnCampusOppAppliedData(response.data.data);
	} catch (error) {
		console.log("Could not fetch the analytics data", error);
	}
};