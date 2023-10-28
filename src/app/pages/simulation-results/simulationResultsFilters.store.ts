import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { BrowserType, MetricType, PageType } from "@common/types";

type Actions = {
  setPage: (page: PageType) => void;
  setBrowserType: (browserType: BrowserType) => void;
  setMetricType: (metricType: MetricType) => void;
};

type Filters = {
  page: PageType | null;
  browserType: BrowserType | null;
  metricType: MetricType | null;
};

type State = {
  filters: Filters;
  actions: Actions;
};

export const useSimulationResultsFiltersStore = create(
  immer<State>((set) => ({
    filters: {
      page: null,
      browserType: null,
      metricType: null,
    },
    actions: {
      setPage: (page) => {
        set((state) => {
          state.filters.page = page;
        });
      },
      setBrowserType: (browserType) => {
        set((state) => {
          state.filters.browserType = browserType;
        });
      },
      setMetricType: (metricType) => {
        set((state) => {
          state.filters.metricType = metricType;
        });
      },
    },
  }))
);

export const useSimulationResultsFilters = () =>
  useSimulationResultsFiltersStore((state) => state.filters);

export const useSimulationResultsFiltersActions = () =>
  useSimulationResultsFiltersStore((state) => state.actions);

mountStoreDevtool(
  "SimulationResultsFilters Store",
  useSimulationResultsFiltersStore
);
