import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";

type FetchImpactScoresArgs = {
  tenant: string;
  application: string;
  dateRange: { startDate: string; endDate: string };
};

export type ImpactScoresResponseType = {
  [page: string]: {
    CUMULATIVE_LAYOUT_SHIFT: number;
    DOM_COMPLETE_TIME: number;
    FIRST_INPUT_DELAY: number;
    JAVASCRIPT_ERROR_COUNT: number;
    LARGEST_CONTENTFUL_PAINT: number;
    LOAD_EVENT_END: number;
    REQUEST_ERROR_COUNT: number;
    REQUEST_START: number;
    RESPONSE_END: number;
    SPEED_INDEX: number;
    VISUALLY_COMPLETE_TIME: number;
  }
};

const fetchImpactScores = async ({
  tenant,
  application,
  dateRange,
}: FetchImpactScoresArgs) => {
  try {
    const apiResponse = await functions.call("get-impact-scores", {
      data: {
        tenantId: tenant,
        appId: application,
        dates: `${dateRange.startDate}_${dateRange.endDate}`,
      },
    });

    const jsonResponse = await apiResponse.json();

    if (jsonResponse.error) {
      throw new Error(jsonResponse?.error);
    }

    return jsonResponse.data;
  } catch (e) {
    console.error("Error fetching tenants", e.message, e.stack);
    throw e;
  }
};

export const useFetchImpactScores = ({ tenant, application, dateRange }: FetchImpactScoresArgs) => {
  const queryFnWithArgs = async () => {
    const scores = await fetchImpactScores({ tenant, application, dateRange });
    return scores;
  };

  const { data, refetch, isLoading, error } = useQuery<ImpactScoresResponseType>({
    enabled: false,
    queryKey: ["impact-scores"],
    queryFn: queryFnWithArgs,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, request: refetch };
};
