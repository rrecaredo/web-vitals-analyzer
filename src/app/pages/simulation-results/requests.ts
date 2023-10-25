import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PAGES } from "../constants";
import { BrowserType, MetricType, PageType } from "src/app/types";

const fetchSimulationResults = async (
  tenant: string,
  app: string,
  range: { startDate: string; endDate: string },
  browserType: BrowserType | "",
  metricType: MetricType | "",
  pageName: PageType | ""
) => {
  try {
    const simulationResultResponse = await functions.call(
      "get-simulation-results",
      {
        data: {
          tenantId: tenant,
          appId: app,
          dates: `${range.startDate}_${range.endDate}`,
          pageName,
          metricType,
          browserType,
        },
      }
    );
    return await simulationResultResponse.json();
  } catch (e) {
    // @TODO: Proper error handling
    console.warn("Error fetching simulation results", e);
    return [];
  }
};

// Both useFetchSimulationResults and useFetchImpactScores are almost identical,
// @TODO: Abstract them into a single function
export const useFetchSimulationResults = () => {
  const [tenant, setTenant] = useState("");
  const [app, setApp] = useState("");
  const [range, setRange] = useState({ startDate: "", endDate: "" });
  const [pageName, setPageName] = useState<PageType | "">("");
  const [browserType, setBrowserType] = useState<BrowserType | "">("");
  const [metricType, setMetricType] = useState<MetricType | "">("");

  const queryFnWithArgs = async () => {
    const simulationResults = await fetchSimulationResults(
      tenant,
      app,
      range,
      browserType,
      metricType,
      pageName
    );
    return simulationResults;
  };

  // @TODO: Type the response from useQuery, useQuery<ResponseType>
  const { data, refetch, isLoading, error } = useQuery({
    enabled: false,
    queryKey: ["simulation-results"],
    queryFn: queryFnWithArgs,
    refetchOnWindowFocus: false,
  });

  const request = (
    tenant: string,
    app: string,
    range: { startDate: string; endDate: string },
    browserType: "mobile" | "desktop" | "all",
    metricType: MetricType,
    pageName: (typeof PAGES)[number]
  ) => {
    setTenant(tenant);
    setApp(app);
    setRange(range);
    setBrowserType(browserType);
    setMetricType(metricType);
    setPageName(pageName);

    refetch();
  };

  return { data, isLoading, error, request };
};
