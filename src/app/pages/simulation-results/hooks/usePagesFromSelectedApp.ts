import { useFilters } from "@common/store";
import { useFetchTenants } from "../../dashboard/requests";
import { useMemo } from "react";

export const usePagesFromSelectedApp = () => {
  const { tenant, application } = useFilters();
  const { data: tenants } = useFetchTenants();

  const pages = useMemo(() => {
    const selectedTenant = tenants?.find((t) => t.id === tenant);
    const selectedApp = selectedTenant?.applications.find(
      (a) => a.id === application
    );

    return selectedApp?.pages ?? [];
  }, [application, tenant, tenants]);

  return pages;
};
