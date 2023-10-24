import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import {
  Flex,
  FilterBar,
  Select,
  SelectOption,
  TimeframeSelector,
  Timeframe,
  showToast,
} from "@dynatrace/strato-components-preview";
import { ProgressCircle } from "@dynatrace/strato-components-preview/core";

import { useFetchTenants } from "../hooks";
import { useFiltersActions, useFiltersStore } from "../store";
import { formatDate } from "../utils";

const LogoArea = styled.div`
  width: 200px;
`;

export const Filters = () => {
  const { data, error, isLoading } = useFetchTenants();
  const filters = useFiltersStore();
  const filterActions = useFiltersActions();

  const tenantOptions = useMemo(() => {
    if (data) {
      return data.map(({ id, name }) => ({
        key: id,
        label: name,
      }));
    }
    return [];
  }, [data]);

  const applicationOptions = useMemo(() => {
    if (data && filters.tenant) {
      const tenant = data.find((tenant) => tenant.id === filters.tenant);
      if (tenant) {
        return tenant.applications.map(({ id, name }) => ({
          key: id,
          label: name,
        }));
      }
    }
    return [];
  }, [data, filters?.tenant]);

  useEffect(() => {
    if (error)
      showToast({
        type: "critical",
        title: "Error",
        message: "Failed to load tenants",
      });
  }, [error]);

  const [dateRange, setDateRange] = useState<Timeframe | null>(null);

  const onTenantSelected = (ids: string[]) => {
    filterActions.setTenant(ids?.[0]);
  };

  const onApplicationSelected = (ids: string[]) => {
    filterActions.setApplication(ids?.[0]);
  };

  const onDateRangeChanged = (range: Timeframe | null) => {
    if (range?.details) {
      setDateRange(range);
      filterActions.setDateRange({
        startDate: formatDate(range.details.from.date),
        endDate: formatDate(range.details.to.date),
      });
    }
  };

  return (
    <Flex mb={8} mt={8}>
      <LogoArea></LogoArea>
      <FilterBar
        onFilterChange={() => {
          // I am handling changes granularly in the select components
        }}
      >
        <FilterBar.Item name='tenant' label='Tenant'>
          <Select
            placeholder='Select a Tenant'
            name='tenant-select'
            disabled={isLoading}
            selectedId={filters.tenant ? [filters.tenant] : null}
            onChange={onTenantSelected}
          >
            {tenantOptions.map(({ key, label }) => (
              <SelectOption key={key} id={key}>
                {label}
              </SelectOption>
            ))}
          </Select>
        </FilterBar.Item>
        <FilterBar.Item name='app' label='App'>
          <Select
            placeholder='Select an App'
            name='app-select'
            disabled={!filters.tenant || isLoading}
            selectedId={filters.application ? [filters.application] : null}
            onChange={onApplicationSelected}
          >
            {applicationOptions.map(({ key, label }) => (
              <SelectOption key={key} id={key}>
                {label}
              </SelectOption>
            ))}
          </Select>
        </FilterBar.Item>
        <FilterBar.Item name='date' label='Dates'>
          <TimeframeSelector
            value={dateRange}
            onChange={onDateRangeChanged}
            disabled={!filters.application || isLoading}
          />
        </FilterBar.Item>
      </FilterBar>
      {isLoading && <ProgressCircle />}
    </Flex>
  );
};
