import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { oncampusEndpoints } from "../BackendApis";

const { CREATE_OPPORTUNITY } = oncampusEndpoints;

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
        console.log("FORMATTED DATA",formattedData);
		const response = await apiConnector("POST", CREATE_OPPORTUNITY, formattedData, {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		});
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
export const editOpportunity = async (data,token) => {
	
}


