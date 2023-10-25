/*

It seems like 3rd party ES modules are nor supported in app functions
 > Error: Dynamic require of "url" is not supported

import Joi from 'joi';

const schema = Joi.object({
  tenantId: Joi.string().required().pattern(/^xxx\d{6}$/),
  appId: Joi.string().required().pattern(/^APPLICATION-[A-Z0-9]{16}$/),
  dates: Joi.string().required().regex(/^\d{4}-\d{2}-\d{2}_\d{4}-\d{2}-\d{2}$/),
});
*/

import { BASE_API_URL, USERNAME } from "./constants";
import { DataProcessor } from "./data-processor";

type Payload = {
  tenantId: string;
  appId: string;
  dates: string;
};

export default async function (payload: Payload) {
  try {
    // @TODO: Validate payload
    const { tenantId, appId, dates } = payload;

    const options = {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(USERNAME + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tenant_id: tenantId, app_id: appId, dates }),
    };

    const response = await fetch(`${BASE_API_URL}get_impact_scores/run`, options);
    const allData = await response.json();
    const parsedData = JSON.parse(allData.response);

    const metrics = DataProcessor.getMetricsData(parsedData);

    return metrics;
  } catch (e) {
    console.warn("Error fetching tenants", e);
    return [];
  }
}
