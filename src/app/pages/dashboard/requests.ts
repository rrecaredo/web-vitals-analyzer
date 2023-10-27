import { functions } from "@dynatrace-sdk/app-utils";
import { useQuery } from "@tanstack/react-query";
import { Tenant } from "api/infrastructure/models";

const fetchTenants = async (): Promise<Tenant[]> => {
    try {
        const apiResponse = await functions.call("get-tenants");
        const jsonResponse = await apiResponse.json();

        if (jsonResponse.error) {
            throw new Error(jsonResponse?.error);
        }

        return jsonResponse.data;
    }
    catch (e) {
        console.error("Error fetching tenants", e.message, e.stack);
        throw e;
    }
};

export const useFetchTenants = () => {
  return useQuery({
    queryKey: ["tenants"],
    queryFn: fetchTenants,
    refetchOnWindowFocus: false,
  });
};
