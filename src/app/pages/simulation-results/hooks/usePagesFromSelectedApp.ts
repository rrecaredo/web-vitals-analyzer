import { useFiltersStore } from "src/app/common/store";
import { useFetchTenants } from "../../dashboard/requests";

export const usePagesFromSelectedApp = () => {
    const { tenant, application } = useFiltersStore();
    const { data: tenants } = useFetchTenants();

    const selectedTenant = tenants?.find((t) => t.id === tenant);
    const selectedApp = selectedTenant?.applications.find((a) => a.id === application);

    return selectedApp?.pages ?? [];
}
