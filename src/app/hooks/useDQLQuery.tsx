import {
  ErrorEnvelope,
  queryExecutionClient,
  QueryResult,
} from "@dynatrace-sdk/client-query";
import {
  QueryStateType,
  recommendVisualizations,
  VisualizationKind,
} from "@dynatrace/strato-components-preview";
import { useState } from "react";

/**
 * useDQLQuery hook to fetch data from Grail via @dynatrace-sdk/client-query
 * @example
 * const { loading, error, result } = useDQLQuery(initialQuery);
 */
export function useDQLQuery() {
  // useState hooks for handling state of the query, the result, the loading and error state.
  // more information on useState can be found here: https://reactjs.org/docs/hooks-state.html
  const [result, setResult] = useState<QueryResult>();
  const [queryState, setQueryState] = useState<QueryStateType>("idle");
  const [error, setError] = useState<ErrorEnvelope | null>(null);
  const [visualRecommendations, setVisualRecommendations] = useState<
    VisualizationKind[]
  >([]);
  //fetchQuery function can be used e.g. within onClick handler of a button
  const fetchQuery = async (query: string) => {
    setQueryState("loading");
    try {
      const response = await queryExecutionClient.queryExecute({
        body: { query, requestTimeoutMilliseconds: 30000 },
      });

      const recommendations = recommendVisualizations(
        response?.result?.records ?? [],
        response?.result?.types ?? []
      );
      setVisualRecommendations(recommendations);
      setQueryState("success");
      setResult(response?.result);
      setError(null);
    } catch (e) {
      const error = JSON.parse(e.message)?.error;
      setVisualRecommendations([]);
      setQueryState("error");
      setResult(undefined);
      setError(error);
    }
  };

  return {
    queryState,
    error,
    result,
    fetchQuery,
    visualRecommendations,
  };
}
