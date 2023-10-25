import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchImpactScores = async (tenant: string, app: string, range: { startDate: string, endDate: string }) => {
    try {
        const impactScoresResponse = await functions.call("get-impact-scores", {
          data: {
            tenantId: tenant,
            appId: app,
            dates: `${range.startDate}_${range.endDate}`,
          },
        });
        return await impactScoresResponse.json();
    }
    catch (e) {
        // @TODO: Proper error handling
        console.warn("Error impact scores", e);
        return [];
    }
};

export const useFetchImpactScores = () => {
  const [tenant, setTenant] = useState("");
  const [app, setApp] = useState("");
  const [range, setRange] = useState({ startDate: "", endDate: "" });

  const queryFnWithArgs = async () => {
    const scores = await fetchImpactScores(tenant, app, range);
    return scores;
  };

  // @TODO: Type the response from useQuery, useQuery<ResponseType>
  const { data, refetch, isLoading, error } = useQuery({
    enabled: false,
    queryKey: ["impact-scores"],
    queryFn: queryFnWithArgs,
    refetchOnWindowFocus: false,
  });

  const request = (tenant: string, app: string, range: { startDate: string, endDate: string }) => {
    setTenant(tenant);
    setApp(app);
    setRange(range);
    refetch();
  };

  return { data, isLoading, error, request };
};
