import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mountStoreDevtool } from "simple-zustand-devtools";

type DateRange = {
  startDate: string;
  endDate: string;
};

type Actions = {
  setTenant: (tenant: string) => void;
  setApplication: (application: string) => void;
  setDateRange: (dateRange: DateRange) => void;
  clearFilters: () => void;
};

type Filters = {
  tenant: string;
  application: string;
  dateRange: DateRange;
};

type State = {
  filters: Filters;
  actions: Actions;
};

export const useFiltersStore = create(
  immer<State>((set) => ({
    filters: {
      tenant: "",
      application: "",
      dateRange: {
        startDate: "",
        endDate: "",
      },
    },
    actions: {
      setTenant: (tenant: string) =>
        set((state) => {
          state.filters.tenant = tenant;
        }),
      setApplication: (application: string) =>
        set((state) => {
          state.filters.application = application;
        }),
      setDateRange: (dateRange: DateRange) =>
        set((state) => {
          state.filters.dateRange = dateRange;
        }),
      clearFilters: () =>
        set((state) => {
          state.filters.tenant = "";
          state.filters.application = "";
          state.filters.dateRange = {
            startDate: "",
            endDate: "",
          };
        }),
    },
  }))
);

export const useFilters = () => useFiltersStore((state) => state.filters);
export const useFiltersActions = () => useFiltersStore((state) => state.actions);

mountStoreDevtool("Global Filters Store", useFiltersStore);
