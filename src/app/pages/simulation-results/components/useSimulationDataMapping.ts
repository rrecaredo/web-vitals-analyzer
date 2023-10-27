import { useMemo } from "react";
import { Impact } from "./types";

export const useSimulationDataMapping = (data: Impact[] = []) => {
  return useMemo(
    () =>
      data.map(({ median, predicted, predictedMax, predictedMin }) => ({
        median,
        predicted,
        predictedRange: [predictedMin, predictedMax],
      })),
    [data]
  );
};
