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

import { getMetricsData } from "./application";
import { evaluateAndReturn } from "./infrastructure";
import { getFromExternalApi } from "./infrastructure/api-proxy";

type Payload = {
  tenantId: string;
  appId: string;
  dates: string;
};

export default async function (payload: Payload) {
  return evaluateAndReturn(async () => {
    const parsedData = await getFromExternalApi(
      "get_impact_scores/run",
      {
        tenant_id: payload.tenantId,
        app_id: payload.appId,
        dates: payload.dates,
      },
    );

    const metrics = getMetricsData(parsedData);

    return metrics;
  }, "impact scores");
}
