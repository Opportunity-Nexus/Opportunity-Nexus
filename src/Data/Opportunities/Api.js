export async function opportunitiesData(opportunityType) {
	let API_URL;
	if (opportunityType === "ToReview") {
		API_URL = `https://mocki.io/v1/a6e0a728-3ca0-443b-a9c2-582f8e02c`;
	} else if (opportunityType === "Scholarships") {
		API_URL = "https://mocki.io/v1/856ad632-5758-4a55-9082-0b75b0a79faa";
	} else if (opportunityType === "ITJobs") {
		API_URL = "https://mocki.io/v1/798a115a-8c83-4852-8c43-4b03669f77c3";
	} else if (opportunityType === "CodingContests") {
		API_URL = "https://mocki.io/v1/b19813e4-d548-4a1a-bb5b-0c81a515fdc9";
	} else if (opportunityType === "Others") {
		API_URL = "https://mocki.io/v1/ec8912fc-28bd-4324-88dc-2f2b1162f19e";
	}

	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error(`ERROR: ${res.status}`);
	}
	const data = await res.json();
	return data;
}
