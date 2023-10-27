// @TODO: Idieally this should be in ENVIROMENT variable, or Vault secret.
// eslint-disable-next-line no-secrets/no-secrets
const USERNAME = "FL35VZJ447mATGHXTiBdX4m2rIQfvrNB";

const BASE_API_URL =
  "https://api-4b0379cd-b47bd823-dku.us-east-1.app.dataiku.io/public/api/v1/test-api/";

export async function getFromExternalApi<T>(url: string, data: T) {
  const options = {
    method: "POST", // Both external endpoints are POST requests so no need to make it configurable for now
    headers: {
      Authorization: "Basic " + Buffer.from(USERNAME + ":").toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${BASE_API_URL}${url}`, options);
  const allData = await response.json();
  const parsedData = JSON.parse(allData.response);

  return parsedData;
}
