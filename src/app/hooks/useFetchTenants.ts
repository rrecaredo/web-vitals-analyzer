import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";
import { Tenant } from "api/infrastructure/models";

const fetchTenants = async (): Promise<Tenant[]> => {
    try {
        const apiResponse = await functions.call("get-tenants");
        return await apiResponse.json();
    }
    catch (e) {
        // @TODO: Proper error handling
        console.warn("Error fetching tenants", e);
        return [];
    }
};

export const useFetchTenants = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const tenants = await fetchTenants();
      return tenants;
    },
    refetchOnWindowFocus: false,
  });
};
