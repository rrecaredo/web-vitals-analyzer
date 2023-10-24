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

const useFilters = create(
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
    },
  }))
);

export const useFiltersStore = () => useFilters((state) => state.filters);
export const useFiltersActions = () => useFilters((state) => state.actions);

mountStoreDevtool("Global Filters Store", useFilters);
