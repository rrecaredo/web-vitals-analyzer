import { SimulationResultsMapper } from "./application";
import { BROWSER_TYPES } from "./constants";
import { evaluateAndReturn } from "./infrastructure";
import { getFromExternalApi } from "./infrastructure/api-proxy";

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
  return evaluateAndReturn(async () => {
    const parsedData = await getFromExternalApi(
      "get_simulation_scores/run",
      {
        tenant_id: payload.tenantId,
        app_id: payload.appId,
        dates: payload.dates,
      }
    );

    const processor = new SimulationResultsMapper(parsedData);

    const plotData = processor.getSimulationResults(
      payload.metricType,
      payload.pageName,
      BROWSER_TYPES[payload.browserType]
    );

    return plotData;
  }, "simulation results");
}
