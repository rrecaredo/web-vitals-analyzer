import { useMemo } from "react";
import { Impact } from "../types";

type SimulationDataAggregated = {
  median?: number;
  predicted?: number;
  predictedRange?: [number, number];
  fakeValue?: number;
};

export const useSimulationDataMapping = (data: Impact[] = []) => {
  return useMemo(
    () =>
      data.map(({ median, predicted, predictedMax, predictedMin }) => ({
        median,
        predicted,
        predictedRange: [predictedMin, predictedMax],
        fakeValue: undefined,
      } as SimulationDataAggregated)),
    [data]
  );
};
