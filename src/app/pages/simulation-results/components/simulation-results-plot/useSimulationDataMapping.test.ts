import { renderHook } from '@testing-library/react'
import { useSimulationDataMapping } from "./useSimulationDataMapping";
import { Impact } from "../types";

describe("useSimulationDataMapping", () => {
  test("should return an empty array when no data is provided", () => {
    const { result } = renderHook(() => useSimulationDataMapping([]));
    expect(result.current).toEqual([]);
  });

  test("should map data correctly", () => {
    const data: Impact[] = [
      {
        median: 10,
        predicted: 12,
        predictedMax: 15,
        predictedMin: 9,
      },
      {
        median: 20,
        predicted: 22,
        predictedMax: 25,
        predictedMin: 18,
      },
    ];

    const { result } = renderHook(() => useSimulationDataMapping(data));

    const expectedResult = [
      {
        median: 10,
        predicted: 12,
        predictedRange: [9, 15],
      },
      {
        median: 20,
        predicted: 22,
        predictedRange: [18, 25],
      },
    ];

    expect(result.current).toEqual(expectedResult);
  });

  test("should memoize the result", () => {
    const data: Impact[] = [
      {
        median: 10,
        predicted: 12,
        predictedMax: 15,
        predictedMin: 9,
      },
    ];

    const { result, rerender } = renderHook(
      (props) => useSimulationDataMapping(props.data),
      {
        initialProps: { data },
      }
    );

    const initialResult = result.current;

    rerender({ data });

    expect(result.current).toBe(initialResult);
  });
});
