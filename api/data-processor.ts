import type {
  InputMetric,
  PredictedOutputMetric,
  SimulationResult,
} from "./types";

// Add the moment this class has 2 responsabilities as it is handling
// data transformation for both the metrics and the simulation results
// Consider splitting this class into 2 classes or break it down into
// normal functions
export class DataProcessor {
  static getMetricsData(data: InputMetric[]) {
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

  private data: SimulationResult[];

  constructor(data: SimulationResult[]) {
    this.data = data;
  }

  getSimulationResults(
    metricType: string,
    pageName: string,
    browserType: string
  ) {
    const filteredData = this.data.filter(
      (d) =>
        d.page_name.endsWith(`loading of page ${pageName}`) &&
        d.analyzed_metric === metricType &&
        d.browser_type === browserType
    );

    const trends = this.getTrendData(filteredData);
    const referencePoints = this.getReferencePoints(filteredData);

    return {
      trends,
      ...referencePoints,
    };
  }

  private getTrendData(data: SimulationResult[]) {
    const dataPoints: PredictedOutputMetric[] = [];

    for (const spec of data) {
      if (spec.type_prediction === "simulation") {
        const {
          median,
          predicted_exit,
          predicted_exit_max,
          predicted_exit_min,
        } = spec;

        dataPoints.push({
          median,
          predicted: predicted_exit,
          predictedMax: predicted_exit_max,
          predictedMin: predicted_exit_min,
        });
      }
    }

    return dataPoints;
  }

  private getReferencePoints(data: SimulationResult[]) {
    const referenceMap: { [key: string]: number | undefined } = {
      current: undefined,
      target: undefined,
      benchmark: undefined,
    };

    for (const spec of data) {
      const typePrediction = spec.type_prediction as keyof typeof referenceMap;

      if (typePrediction in referenceMap) {
        referenceMap[typePrediction] = spec.median;
      }

      if (Object.values(referenceMap).every((value) => value !== undefined)) {
        break;
      }
    }

    return referenceMap;
  }
}

export default DataProcessor;
