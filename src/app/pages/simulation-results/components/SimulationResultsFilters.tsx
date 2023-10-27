import React from "react";

import {
  FilterBar,
  Select,
  SelectOption,
} from "@dynatrace/strato-components-preview";

import {
  useSimulationResultsFiltersActions,
  useSimulationResultsFiltersStore,
} from "../simulationResultsFilters.store";

import { BrowserType, MetricType, PageType } from "src/app/common/types";
import { usePagesFromSelectedApp } from "../hooks";
import { METRICS_PRESETS } from "src/app/common";
import { BROWSER_TYPES } from "api/constants";

export const SimulationResultsFilters = () => {
  const filters = useSimulationResultsFiltersStore();
  const filterActions = useSimulationResultsFiltersActions();
  const pages = usePagesFromSelectedApp();

  const onPageChanged = (ids: PageType[]) => {
    filterActions.setPage(ids?.[0]);
  };

  const onBrowserTypeChanged = (ids: BrowserType[]) => {
    filterActions.setBrowserType(ids?.[0]);
  };

  const onMetricTypeChanged = (ids: MetricType[]) => {
    filterActions.setMetricType(ids?.[0]);
  };

  return (
    <FilterBar
      onFilterChange={() => {
        // I am handling changes granularly in the select components
      }}
    >
      <FilterBar.Item name='page' label='Page'>
        <Select
          placeholder='Page'
          name='page-select'
          selectedId={filters.page ? [filters.page] : null}
          onChange={onPageChanged}
        >
          {pages.map((page) => (
            <SelectOption key={page} id={page}>
              {page}
            </SelectOption>
          ))}
        </Select>
      </FilterBar.Item>
      <FilterBar.Item name='metric' label='Metric'>
        <Select
          placeholder='Metrics'
          name='metric-select'
          disabled={!filters.page}
          selectedId={filters.metricType ? [filters.metricType] : null}
          onChange={onMetricTypeChanged}
        >
          {METRICS_PRESETS.map(({ name, accessor }) => (
            <SelectOption key={accessor} id={accessor}>
              {name}
            </SelectOption>
          ))}
        </Select>
      </FilterBar.Item>
      <FilterBar.Item name='browser' label='Browser'>
        <Select
          placeholder='Browsers'
          name='browser-select'
          disabled={!filters.metricType}
          selectedId={filters.browserType ? [filters.browserType] : null}
          onChange={onBrowserTypeChanged}
        >
          {Object.entries(BROWSER_TYPES).map(([key, label]) => (
            <SelectOption key={key} id={key}>
              {label}
            </SelectOption>
          ))}
        </Select>
      </FilterBar.Item>
    </FilterBar>
  );
};
