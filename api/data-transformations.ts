import type { BrowserType, InputMetric, PredictedOutputMetric, SimulationResult } from "./types";

export const getMetricsData = (data: InputMetric[]) => {
  return data.reduce((acc, item) => {
    const { page_name, analyzed_metric, impact_score } = item;
    const parsedPageName = page_name.replace(/^.*loading of page /, "");

    return {
      ...acc,
      [parsedPageName]: {
        ...acc[parsedPageName],
        [analyzed_metric]: impact_score,
      },
    };
  }, {});
};

export const getSimulationResults = (
  data: SimulationResult[] = [],
  metricType: string,
  pageName: string,
  browswerType: string,
) => {
  const dataPoints: PredictedOutputMetric[] = [];

  console.log(1, { metricType, pageName, browswerType })

  // This is not a great solution. However it's a quick fix for now. Ideally,
  // the data endpoint should allow for filtering by page.
  const filteredData = data.filter(
    (d) =>
      d.page_name.endsWith(`loading of page ${pageName}`) &&
      d.analyzed_metric === metricType &&
      d.browser_type === browswerType
  );

  for (const spec of filteredData) {
    if (spec.type_prediction === "simulation") {
      const { median, predicted_exit, predicted_exit_max, predicted_exit_min } =
        spec;

      dataPoints.push({
        median,
        predicted: predicted_exit,
        predictedMax: predicted_exit_max,
        predictedMin: predicted_exit_min,
      });
    }
  }

  return dataPoints;
};
