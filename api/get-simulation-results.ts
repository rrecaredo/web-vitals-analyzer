import { BASE_API_URL, BROWSER_TYPES, USERNAME } from "./constants";
import { DataProcessor } from "./data-processor";
import type { BrowserType } from "./types";

type Payload = {
  tenantId: string;
  appId: string;
  dates: string;
  metricType: string;
  pageName: string;
  browserType: BrowserType;
};

export default async function (payload: Payload) {
  try {
    // @TODO: Validate payload
    const { tenantId, appId, dates, metricType, pageName, browserType } = payload;

    const options = {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(USERNAME + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tenant_id: tenantId, app_id: appId, dates }),
    };

    const response = await fetch(`${BASE_API_URL}get_simulation_scores/run`, options);
    const allData = await response.json();
    const parsedData = JSON.parse(allData.response);

    const browserTypeMap: Record<BrowserType, typeof BROWSER_TYPES[keyof typeof BROWSER_TYPES]> = {
      mobile: "Mobile Browser",
      desktop: "Desktop Browser",
      all: "All",
    };

    const processor = new DataProcessor(parsedData);
    const plotData = processor.getSimulationResults(metricType, pageName, browserTypeMap[browserType]);

    return plotData;
  } catch (e) {
    console.warn("Error fetching tenants", e);
    return [];
  }
}
