export async function opportunitiesData(opportunityType) {
	let API_URL =
		"https://sheetal-04.github.io/Opportunity-Nexus-Opportunity-Apis/OpportunitiesApi.json";
	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error(`ERROR: ${res.status}`);
	}
	const data = await res.json();
	// console.log("DATA IN API ..." + data[opportunityType]);
	return data[opportunityType];
}
