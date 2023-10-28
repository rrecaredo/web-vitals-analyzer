import { SimulationResultsMapper } from "./simulation-results-mapper";

import * as SimulationResults from "../__fixtures__/simulation-results.json";

describe("SimulationResultsMapper", () => {
  const mapper = new SimulationResultsMapper(SimulationResults);

  describe("getSimulationResults method", () => {
    it("should return the expected result when filtering by metricType, pageName, and browserType", () => {
      const metricType = "REQUEST_START";
      const pageName = "/security-profile/update-password";
      const browserType = "Mobile Browser";

      const expectedResult = {
        trends: [
          {
            median: 1900,
            predicted: 0.1730628432,
            predictedMax: 0.1733780761,
            predictedMin: 0.1301984359,
          },
          {
            median: 1800,
            predicted: 0.1724323775,
            predictedMax: 0.1733780761,
            predictedMin: 0.1297241247,
          },
          {
            median: 1700,
            predicted: 0.1708562131,
            predictedMax: 0.1733780761,
            predictedMin: 0.1285383465,
          },
          {
            median: 1600,
            predicted: 0.1692800488,
            predictedMax: 0.1733780761,
            predictedMin: 0.1273525684,
          },
          {
            median: 1400,
            predicted: 0.1661277202,
            predictedMax: 0.1733780761,
            predictedMin: 0.1249810122,
          },
          {
            median: 1300,
            predicted: 0.1651820216,
            predictedMax: 0.1733780761,
            predictedMin: 0.1242695454,
          },
          {
            median: 1200,
            predicted: 0.1651820216,
            predictedMax: 0.1733780761,
            predictedMin: 0.1242695454,
          },
          {
            median: 1100,
            predicted: 0.164236323,
            predictedMax: 0.1733780761,
            predictedMin: 0.1235580785,
          },
          {
            median: 1000,
            predicted: 0.1629753915,
            predictedMax: 0.1733780761,
            predictedMin: 0.122609456,
          },
          {
            median: 900,
            predicted: 0.1610839943,
            predictedMax: 0.1733780761,
            predictedMin: 0.1211865223,
          },
          {
            median: 800,
            predicted: 0.1588773642,
            predictedMax: 0.1733780761,
            predictedMin: 0.119526433,
          },
          {
            median: 700,
            predicted: 0.1576164328,
            predictedMax: 0.1733780761,
            predictedMin: 0.1185778105,
          },
          {
            median: 600,
            predicted: 0.1560402685,
            predictedMax: 0.1733780761,
            predictedMin: 0.1173920324,
          },
          {
            median: 500,
            predicted: 0.1541488713,
            predictedMax: 0.1733780761,
            predictedMin: 0.1159690986,
          },
          {
            median: 400,
            predicted: 0.1538336384,
            predictedMax: 0.1733780761,
            predictedMin: 0.115731943,
          },
          {
            median: 300,
            predicted: 0.1525727069,
            predictedMax: 0.1733780761,
            predictedMin: 0.1147833205,
          },
          {
            median: 200,
            predicted: 0.1522574741,
            predictedMax: 0.1733780761,
            predictedMin: 0.1145461649,
          },
        ],
        target: 1500,
        benchmark: 100,
      };

      const result = mapper.getSimulationResults(
        metricType,
        pageName,
        browserType
      );
      expect(result).toEqual(expectedResult);
    });

    it("should return an empty array when no matching data is found", () => {
      const metricType = "NonExistentMetric";
      const pageName = "NonExistentPage";
      const browserType = "NonExistentBrowser";

      const result = mapper.getSimulationResults(
        metricType,
        pageName,
        browserType
      );
      expect(result.trends).toEqual([]);
      expect(result.current).toBeUndefined();
      expect(result.target).toBeUndefined();
      expect(result.benchmark).toBeUndefined();
    });
  });
});
