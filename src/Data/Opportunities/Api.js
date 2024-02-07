// export async function opportunitiesData(opportunityType ) {
// 	const API_URL =opportunityType ? `http://localhost:3001/${opportunityType}` : `http://localhost:3001/Scholarships`;
//     const res = await fetch(API_URL);
//     if (!res.ok) {
// 		throw new Error(`ERROR:${res.status}`);
// 	}
//     const data = await res.json();
//     return data;
// }

export async function opportunitiesData(opportunityType) {
	let API_URL;
	if (opportunityType === "ToReview") {
		API_URL = `http:/localhost:3001/${opportunityType}`;
	} else {
		API_URL = opportunityType
			? `http://localhost:3001/${opportunityType}`
			: `http://localhost:3001/Scholarships`;
	}

	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error(`ERROR: ${res.status}`);
	}
	const data = await res.json();
	return data;
}
