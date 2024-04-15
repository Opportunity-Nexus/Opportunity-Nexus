import { SHA256 } from 'crypto-js';
export async function opportunitiesData(opportunityType) {
  let API_URL =
    "https://sheetal-04.github.io/Opportunity-Nexus-Opportunity-Apis/OpportunitiesApi.json";
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`ERROR: ${res.status}`);
  }
  const data = await res.json();
  console.log('DATA', data);

  // GENERATE UNIQUE IDENTITIES USING HASHING
  const dataWithUniqueId = data[opportunityType].map(item => ({
    ...item,
    frontendId: SHA256(`${item.id}${item.name}${item.startDate}`).toString()
  }));
  console.log("DATA HASH", dataWithUniqueId);
  return dataWithUniqueId;
}

