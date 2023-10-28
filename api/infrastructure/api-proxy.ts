import env from "./environment";

export async function getFromExternalApi<T>(url: string, data: T) {
  const options = {
    method: "POST", // Both external endpoints are POST requests so no need to make it configurable for now
    headers: {
      Authorization: "Basic " + Buffer.from(env.USERNAME + ":").toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${env.BASE_API_URL}${url}`, options);
  const allData = await response.json();
  const parsedData = JSON.parse(allData.response);

  return parsedData;
}
