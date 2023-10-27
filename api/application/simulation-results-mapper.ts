import type {
  PredictedOutputMetric,
  SimulationResult,
} from "../types";

export class SimulationResultsMapper {
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
