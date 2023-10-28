import { Tenant } from "./models";

// fakeDatabase simulates a relational database containing tenants, applications and their relationships.
import * as fakeDatabase from "./data.json";

export interface AppRepository {
  getTenantsWithAggregatedData(): Promise<Tenant[]>;
}

export class FakeFileRepository implements AppRepository {
  async getTenantsWithAggregatedData(): Promise<Tenant[]> {
    if (fakeDatabase.tenants?.length === 0) return [];

    return fakeDatabase.tenants.map(
      ({ tenant_id, tenant_name, applications = [] }) => ({
        id: tenant_id,
        name: tenant_name,
        applications: (fakeDatabase.applications)
          .filter(({ application_id }) => applications.includes(application_id))
          .map(({ application_id, application_name, pages = [] }) => ({
            id: application_id,
            name: application_name,
            pages,
          })),
      })
    );
  }
}
