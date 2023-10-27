import type { InputMetric } from "../types";

export function getMetricsData(data: InputMetric[]) {
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
}
